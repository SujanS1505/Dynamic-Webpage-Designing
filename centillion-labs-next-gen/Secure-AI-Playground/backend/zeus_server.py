import os
import logging
from flask import Flask, request, Response, jsonify, stream_with_context
from flask_cors import CORS
from athena_factory import AthenaFactory
from apollo_client import ApolloClient
from hades_auditor import HadesAuditor
from demeter_social import DemeterSocialAnalyzer
from themis_watermarker import ThemisWatermarker
import json

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ZeusOrchestrator")

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

class ZeusOrchestrator:
    def __init__(self):
        self.factory = AthenaFactory()
        self.client = ApolloClient()
        self.auditor = HadesAuditor()
        self.social = DemeterSocialAnalyzer()
        self.themis = ThemisWatermarker()
        self.port = int(os.environ.get("BACKEND_PORT", 8096))

    def start(self):
        logger.info(f"Zeus Orchestrator ascending to throne on port {self.port}...")
        app.run(host="0.0.0.0", port=self.port, threaded=True)

orchestrator = ZeusOrchestrator()

# --- Routes ---

@app.route("/chat", methods=["POST"])
def handle_chat():
    data = request.json
    doc_id = data.get("doc_id", "")
    context_text = data.get("context", "")
    question = data.get("question", "")
    safe_mode = data.get("safe_mode", False)
    prompt_id = data.get("system_prompt_id", 50)
    system_prompt = data.get("system_prompt", "")
    model = data.get("model", "")
    version = data.get("version", "")
    max_tokens = data.get("max_tokens", 512)

    # 1. Get context
    content = context_text
    if not content and doc_id:
        doc_path = os.path.join("backend", "docs", doc_id) # Adjusted for playground structure
        if not os.path.exists(doc_path):
            doc_path = os.path.join("docs", doc_id)
            
        if os.path.exists(doc_path):
            try:
                with open(doc_path, 'r', encoding='utf-8') as f:
                    content = f.read()
            except Exception as e:
                return jsonify({"error": f"failed to read doc: {e}"}), 500

    # 2. Resolve system prompt if needed
    if not system_prompt and model:
        system_prompt = orchestrator.factory.load_prompt_content(model, version)

    # 3. Build prompt
    prompt, injected_prompt, attack_category = orchestrator.factory.build(
        content, question, safe_mode, prompt_id, system_prompt
    )

    # 4. Stream response
    def generate():
        # Send metadata chunk
        metadata = {
            "attack_category": attack_category,
            "injected_prompt": injected_prompt
        }
        yield json.dumps(metadata) + "\n"
        
        # Proxy stream from Apollo (Inference Server)
        for chunk in orchestrator.client.generate_stream(prompt, max_tokens):
            yield chunk

    return Response(stream_with_context(generate()), mimetype="application/x-ndjson")

# --- Social Analyzer Routes (Demeter) ---

@app.route("/api/social/analyze", methods=["POST"])
def handle_social_analyze():
    data = request.json
    url = data.get("url")
    if not url: return jsonify({"error": "URL required"}), 400
    scraped = orchestrator.social.scrape_linkedin(url)
    analysis = orchestrator.social.analyze_with_groq(scraped)
    return jsonify({"scraped_data": scraped, "analysis": analysis})

@app.route("/api/social/analyze-combined", methods=["POST"])
def handle_social_combined():
    data = request.json
    url = data.get("url")
    post = data.get("post_content")
    scraped = orchestrator.social.scrape_linkedin(url)
    analysis = orchestrator.social.analyze_with_groq(scraped, post)
    return jsonify({"scraped_data": scraped, "analysis": analysis})

# --- Watermarking Routes (Themis) ---

@app.route("/api/v1/watermark/detect", methods=["POST"])
def handle_watermark_detect():
    data = request.json
    result = orchestrator.themis.detect_watermark(data.get("text"), data.get("approach", "KGW"))
    return jsonify(result)

@app.route("/api/v1/security/fingerprint", methods=["GET"])
def handle_security_fingerprint():
    return jsonify(orchestrator.themis.security_fingerprint())

@app.route("/models", methods=["GET"])
def handle_list_models():
    prompt_dir = os.path.join("..", "System-Prompt")
    if not os.path.exists(prompt_dir):
        return jsonify([])
    
    models = []
    for f in os.listdir(prompt_dir):
        if f.endswith((".mkd", ".txt")):
            models.append(os.path.splitext(f)[0])
    return jsonify(models)

@app.route("/versions", methods=["GET"])
def handle_list_versions():
    model_name = request.args.get("model")
    if not model_name:
        return jsonify({"error": "model parameter required"}), 400
    
    prompt_dir = os.path.join("..", "System-Prompt")
    target_file = None
    for ext in [".mkd", ".txt"]:
        path = os.path.join(prompt_dir, model_name + ext)
        if os.path.exists(path):
            target_file = path
            break
            
    if not target_file:
        return jsonify([])

    versions = []
    try:
        with open(target_file, 'r', encoding='utf-8') as f:
            for line in f:
                trimmed = line.strip()
                if trimmed.startswith("# ") or trimmed.startswith("## "):
                    v = trimmed.lstrip("# ").strip()
                    if v:
                        versions.append(v)
    except:
        pass
    return jsonify(versions)

@app.route("/prompts/content", methods=["GET"])
def handle_get_prompt_content():
    name = request.args.get("name")
    version = request.args.get("version", "")
    if not name:
        return jsonify({"error": "name parameter required"}), 400
    
    content = orchestrator.factory.load_prompt_content(name, version)
    return Response(content, mimetype="text/plain")

# --- Audit Routes via Hades ---

@app.route("/audit/list", methods=["GET"])
def handle_audit_list():
    result = orchestrator.auditor.run_script("../python-redteam/deepteam_advanced_audit.py", args=["list"])
    return jsonify(result)

@app.route("/audit/run", methods=["POST"])
def handle_audit_run():
    result = orchestrator.auditor.run_script("../python-redteam/deepteam_advanced_audit.py", args=["run"], input_data=request.json)
    return jsonify(result)

@app.route("/audit/baseline/attacks", methods=["GET"])
def handle_baseline_attacks():
    result = orchestrator.auditor.run_script("../python-redteam/deepteam_baseline_audit.py", args=["list"])
    return jsonify(result)

@app.route("/audit/baseline/run", methods=["POST"])
def handle_baseline_run():
    # Streaming SSE implementation
    process = orchestrator.auditor.run_script("../python-redteam/deepteam_baseline_audit.py", input_data=request.json, stream=True)
    
    if isinstance(process, dict) and "error" in process:
        return jsonify(process), 500

    def event_stream():
        for line in iter(process.stdout.readline, ''):
            if line.strip():
                yield f"data: {line.strip()}\n\n"
        
        # Check for errors in stderr
        stderr = process.stderr.read()
        if stderr:
            logger.error(f"Audit stderr: {stderr}")
            
        yield "data: {\"type\":\"stream_end\"}\n\n"

    return Response(event_stream(), mimetype="text/event-stream")

@app.route("/probe", methods=["POST"])
def handle_probe():
    result = orchestrator.auditor.run_script("../python-redteam/deepteam_probe.py", input_data=request.json, timeout=1200)
    return jsonify(result)

@app.route("/logs", methods=["GET"])
def handle_logs():
    log_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "attacks.log"))
    if os.path.exists(log_path):
        with open(log_path, 'r') as f:
            return Response(f.read(), mimetype="text/plain")
    return jsonify([])

# --- Stub routes for other audits ---
@app.route("/audit/domain/strategies", methods=["GET"])
def handle_domain_strategies():
    result = orchestrator.auditor.run_script("../python-redteam/deepteam_domain_audit.py", args=["list"])
    return jsonify(result)

@app.route("/audit/domain/run", methods=["POST"])
def handle_domain_run():
    result = orchestrator.auditor.run_script("../python-redteam/deepteam_domain_run.py", input_data=request.json)
    return jsonify(result)

# ... and so on for other domain audits ...

if __name__ == "__main__":
    orchestrator.start()
