#!/usr/bin/env python3
"""
Secure AI Playground — Backend Launcher
========================================
Starts BOTH required servers with a single command:

  [1] Local Inference Server  (port 8083)  — loads TinyLlama / any HF model
  [2] Zeus Orchestrator       (port 8096)  — Flask API consumed by the frontend

Usage:
    python run_backend.py
    python run_backend.py --port 8096 --inference-port 8083

The Centillion Labs frontend (npm run dev) proxies /api/* → port 8096
automatically.
"""

import os
import sys
import time
import signal
import argparse
import subprocess
import threading


def stream_output(proc: subprocess.Popen, prefix: str) -> None:
    """Forward a subprocess's stdout/stderr to our console with a label prefix."""
    assert proc.stdout is not None
    for raw_line in proc.stdout:
        try:
            line = raw_line.decode("utf-8", errors="replace").rstrip()
        except Exception:
            line = repr(raw_line)
        print(f"[{prefix}] {line}", flush=True)


def wait_for_port(host: str, port: int, timeout: float = 120.0) -> bool:
    """Block until the TCP port is accepting connections or timeout expires."""
    import socket
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            with socket.create_connection((host, port), timeout=1):
                return True
        except OSError:
            time.sleep(1)
    return False


def main() -> None:
    parser = argparse.ArgumentParser(description="Secure AI Playground – Backend")
    parser.add_argument("--port",            type=int, default=8096,
                        help="Zeus Orchestrator port (default: 8096)")
    parser.add_argument("--inference-port",  type=int, default=8083,
                        help="Local Inference Server port (default: 8083)")
    args = parser.parse_args()

    here        = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(here, "backend")

    if not os.path.isdir(backend_dir):
        print(f"[ERROR] backend/ directory not found: {backend_dir}", file=sys.stderr)
        sys.exit(1)

    python = sys.executable  # same interpreter / venv that launched this script

    # ── 1. Start the Local Inference Server ───────────────────────────────────
    inf_env = os.environ.copy()
    inf_env["INFERENCE_PORT"] = str(args.inference_port)

    print(f"[Launcher] Starting Local Inference Server on port {args.inference_port}…")
    print(f"[Launcher] (Model loading may take 1-2 minutes on first run)\n")

    inf_proc = subprocess.Popen(
        [python, "local_inference_server.py"],
        cwd=backend_dir,
        env=inf_env,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )
    threading.Thread(target=stream_output, args=(inf_proc, "INFERENCE"),
                     daemon=True).start()

    print(f"[Launcher] Waiting for inference server to become ready…")
    if wait_for_port("127.0.0.1", args.inference_port, timeout=180):
        print(f"[Launcher] Inference server ready on port {args.inference_port}.\n")
    else:
        print(f"[Launcher] WARNING: Inference server did not respond within 3 min.",
              file=sys.stderr)
        print(f"[Launcher] Continuing anyway — Zeus will start but /chat may fail.\n",
              file=sys.stderr)

    # ── 2. Start Zeus Orchestrator ────────────────────────────────────────────
    zeus_env = os.environ.copy()
    zeus_env["BACKEND_PORT"] = str(args.port)

    print(f"[Launcher] Starting Zeus Orchestrator on port {args.port}…")

    zeus_proc = subprocess.Popen(
        [python, "zeus_server.py"],
        cwd=backend_dir,
        env=zeus_env,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )
    threading.Thread(target=stream_output, args=(zeus_proc, "ZEUS"),
                     daemon=True).start()

    print(f"[Launcher] Both servers running.  Press Ctrl+C to stop all.\n")

    # ── 3. Wait and handle shutdown gracefully ────────────────────────────────
    def _shutdown(signum, frame):  # noqa: ANN001
        print("\n[Launcher] Shutting down…")
        for p in (zeus_proc, inf_proc):
            if p.poll() is None:
                p.terminate()
        sys.exit(0)

    signal.signal(signal.SIGINT,  _shutdown)
    signal.signal(signal.SIGTERM, _shutdown)

    # Block main thread until one of the subprocesses exits unexpectedly
    while True:
        for proc, name in ((inf_proc, "Inference"), (zeus_proc, "Zeus")):
            if proc.poll() is not None:
                print(f"[Launcher] {name} server exited with code {proc.returncode}.",
                      file=sys.stderr)
                _shutdown(None, None)
        time.sleep(2)


if __name__ == "__main__":
    main()
