function showTab(id) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function calculateExisting() {
  const actual = parseFloat(document.getElementById('actualWidth').value);
  const screen = parseFloat(document.getElementById('onscreenWidth').value);
  const designPx = parseFloat(document.getElementById('designWidthPx').value);

  if (!actual || !screen || !designPx) return;

  const ratio = actual / screen;
  const result = designPx * ratio;

  document.getElementById('existingResult').innerText =
    "Estimated Real‑Life Design Width: " + result.toFixed(2) + " cm";
}

function calculateRequired() {
  const actual = parseFloat(document.getElementById('actualWidthReq').value);
  const screen = parseFloat(document.getElementById('onscreenWidthReq').value);
  const requiredCm = parseFloat(document.getElementById('requiredDesignCm').value);

  if (!actual || !screen || !requiredCm) return;

  const ratio = screen / actual;
  const result = requiredCm * ratio;

  document.getElementById('requiredResult').innerText =
    "Required On‑Screen Design Size: " + result.toFixed(2) + " px";
}
