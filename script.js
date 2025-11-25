const unitSelect = document.getElementById("unitSelect");
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
  const unitText = unit === "cm" ? "cm" : "in";

  labelA.innerText = `TRUE FULL LENGTH (${unitText})`;
  labelS.innerText = `On-screen FULL LENGTH (${unitText})`;
  labelE.innerText = `On-screen DESIGN LENGTH (${unitText})`;

  result.innerText = `ESTIMATED TRUE DESIGN LENGTH: –`;

  const inst = `1. Enter the actual measurement of the TRUE FULL LENGTH (${unitText}) – typically found on the product page or size chart.
2. Measure and enter the on-screen FULL LENGTH (${unitText}) using a physical ruler held up to your screen.
3. Measure and enter the on-screen DESIGN ELEMENT LENGTH (${unitText}) using the same ruler.
4. Click "Calculate" to see the ESTIMATED TRUE DESIGN LENGTH.`;
  instructionText.innerText = inst;
}

unitSelect.addEventListener("change", updateLabels);

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

  result.innerText = `ESTIMATED TRUE DESIGN LENGTH: ${displayText}`;

  // Clear and redraw diagram
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const margin = 50;
  const maxLength = canvas.width - margin * 2;
  const fullLength = maxLength;
  const designLength = (E / S) * fullLength;

  ctx.lineWidth = 4;

  // Full length (gray)
  ctx.strokeStyle = "gray";
  ctx.beginPath();
  ctx.moveTo(margin, canvas.height / 2);
  ctx.lineTo(margin + fullLength, canvas.height / 2);
  ctx.stroke();

  // Design length (red)
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(margin, canvas.height / 2);
  ctx.lineTo(margin + designLength, canvas.height / 2);
  ctx.stroke();
});

updateLabels();
