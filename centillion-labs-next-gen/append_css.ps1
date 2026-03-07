$path = "e:\centilion-webpage\Dynamic-Webpage-Designing\centillion-labs-next-gen\src\pages\SecureAIPlayground.module.css"
$content = @"

/* ── Modal ── */
.modalOverlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modalContent {
  background: #0a0a0c;
  border: 1px solid var(--pg-border);
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
}

.modalIconBox {
  width: 56px;
  height: 56px;
  background: rgba(37, 99, 235, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pg-blue);
  margin: 0 auto 20px;
}

.modalTitle {
  font-family: var(--pg-font-head);
  font-size: 20px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
  color: #ffffff;
}

.modalText {
  font-size: 13px;
  line-height: 1.6;
  color: var(--pg-text-dim);
  margin-bottom: 24px;
}

.modalActions {
  display: flex;
  gap: 12px;
}
"@
Add-Content -Path $path -Value $content
