# Secure AI Playground

A standalone, independent red-team playground for interactively attacking LLMs.

## Features
- **Target Config** — select model, version, and edit the system prompt (vulnerable surface)
- **Inference Stream** — real-time chat with fire/scan actions
- **Attack Controls** — threat vector detection, quick payload library, deep scan

## Stack
- React 18 + Vite
- Pure CSS Modules (violet/dark theme — fully independent from Secure-AI UI)
- Lucide icons

## Run

```bash
cd Secure-AI-Playground/frontend
npm install
npm run dev        # starts on http://localhost:5174
```

## Backend
Proxies `/api` to `http://localhost:8080` (same Go backend as the main Secure-AI app).
