import subprocess
import os
import json
import logging
import platform

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("HadesAuditor")

class HadesAuditor:
    """
    Command Pattern: Manages sub-process execution for red-team audits and probes.
    
    Lord of the Underworld and Host of Dark Testing.
    """
    def __init__(self):
        self.python_path = self._get_python_path()

    def _get_python_path(self):
        # 1. Check env variable
        if os.environ.get("PYTHON_PATH"):
            return os.environ.get("PYTHON_PATH")
        
        # 2. Check for local venv
        venv_path = "venv/Scripts/python.exe" if platform.system() == "Windows" else "venv/bin/python"
        if os.path.exists(venv_path):
            return venv_path
            
        return "python"

    def run_script(self, script_relative_path, args=None, input_data=None, timeout=300, stream=False):
        abs_path = os.path.abspath(os.path.join(os.path.dirname(__file__), script_relative_path))
        if not os.path.exists(abs_path):
            return {"error": f"Script not found: {abs_path}"}

        logger.info(f"Running script: {abs_path} with args: {args}")
        
        env = os.environ.copy()
        env["PYTHONIOENCODING"] = "utf-8"
        # Ensure sub-processes point to our backend port
        env["BACKEND_URL"] = f"http://127.0.0.1:{os.environ.get('BACKEND_PORT', '8096')}/chat"

        cmd = [self.python_path, abs_path]
        if args:
            cmd.extend(args)

        try:
            if stream:
                # For streaming output (baseline run)
                process = subprocess.Popen(
                    cmd,
                    stdin=subprocess.PIPE,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    env=env,
                    cwd=os.path.dirname(abs_path),
                    text=True,
                    bufsize=1
                )
                
                if input_data:
                    process.stdin.write(json.dumps(input_data))
                    process.stdin.close()
                
                return process

            else:
                # For one-shot execution
                stdin_data = json.dumps(input_data) if input_data else None
                result = subprocess.run(
                    cmd,
                    input=stdin_data,
                    capture_output=True,
                    text=True,
                    env=env,
                    cwd=os.path.dirname(abs_path),
                    timeout=timeout
                )
                
                if result.returncode != 0:
                    logger.error(f"Script failed: {result.stderr}")
                    return {"error": result.stderr}
                
                try:
                    return json.loads(result.stdout)
                except json.JSONDecodeError:
                    return {"output": result.stdout}

        except subprocess.TimeoutExpired:
            logger.error(f"Script timed out: {abs_path}")
            return {"error": "Execution timed out"}
        except Exception as e:
            logger.error(f"Execution error: {e}")
            return {"error": str(e)}
