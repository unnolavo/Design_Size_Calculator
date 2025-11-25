
const unitSelect = document.getElementById("unitSelect");
const sideSelect = document.getElementById("sideSelect");
const labelA = document.getElementById("labelA");
const labelS = document.getElementById("labelS");
const labelE = document.getElementById("labelE");
const result = document.getElementById("result");
const form = document.getElementById("calcForm");
const instructionText = document.getElementById("instructionText");

const canvas = document.getElementById("diagramCanvas");
const ctx = canvas.getContext("2d");

function updateLabels() {
  const unit = unitSelect.value;
  const side = sideSelect.value;

  const unitText = unit === "cm" ? "cm" : "in";
  const sideCap = side === "width" ? "WIDTH" : "HEIGHT";

  labelA.innerText = `TRUE FULL ${sideCap} (${unitText})`;
  labelS.innerText = `On-screen FULL ${sideCap} (${unitText})`;
  labelE.innerText = `On-screen DESIGN ${sideCap} (${unitText})`;

  result.innerText = `ESTIMATED TRUE DESIGN ${sideCap}: –`;

  const inst = `1. Enter the actual measurement of the TRUE FULL PRODUCT ${sideCap} (${unitText}) – typically found on the product page or size chart.
2. Enter the onscreen measurement of the FULL ${sideCap} (${unitText}) using a physical ruler held up to your screen.
3. Enter the onscreen measurement of the DESIGN ELEMENT ${sideCap} (${unitText}) using the same ruler.
4. Click "Calculate" to get the ESTIMATED TRUE DESIGN ${sideCap}.`;
  instructionText.innerText = inst;
}

unitSelect.addEventListener("change", updateLabels);
sideSelect.addEventListener("change", updateLabels);

function toggleInstructions() {
  const content = document.getElementById("instructionText");
  content.style.display = content.style.display === "block" ? "none" : "block";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const A = parseFloat(document.getElementById("actual").value);
  const S = parseFloat(document.getElementById("screen").value);
  const E = parseFloat(document.getElementById("element").value);

  if (S === 0) {
    alert("On-screen full measurement cannot be zero.");
    return;
  }

  const side = sideSelect.value;
  const unit = unitSelect.value;
  const calc = (A * E) / S;
  let convertedValue;
  let displayText;

  if (unit === "cm") {
    convertedValue = (calc / 2.54).toFixed(2);
    displayText = `${calc.toFixed(2)} cm / ${convertedValue} in`;
  } else {
    convertedValue = (calc * 2.54).toFixed(2);
    displayText = `${calc.toFixed(2)} in / ${convertedValue} cm`;
  }

  result.innerText = `ESTIMATED TRUE DESIGN ${side === "width" ? "WIDTH" : "HEIGHT"}: ${displayText}`;

  // Clear and redraw diagram
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const margin = 50;
  const maxLength = canvas.width - margin * 2;
  const fullLength = maxLength;
  const designLength = (E / S) * fullLength;

  ctx.lineWidth = 4;

  if (side === "width") {
    ctx.strokeStyle = "gray";
    ctx.beginPath();
    ctx.moveTo(margin, canvas.height / 2);
    ctx.lineTo(margin + fullLength, canvas.height / 2);
    ctx.stroke();

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(margin, canvas.height / 2);
    ctx.lineTo(margin + designLength, canvas.height / 2);
    ctx.stroke();
  } else {
    const offset = canvas.width / 2;
    const maxHeight = canvas.height - margin * 2;
    const fullHeight = maxHeight;
    const designHeight = (E / S) * fullHeight;

    ctx.strokeStyle = "gray";
    ctx.beginPath();
    ctx.moveTo(offset, margin);
    ctx.lineTo(offset, margin + fullHeight);
    ctx.stroke();

    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(offset, margin);
    ctx.lineTo(offset, margin + designHeight);
    ctx.stroke();
  }
});

updateLabels();
