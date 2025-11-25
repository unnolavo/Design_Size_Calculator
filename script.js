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

  // Known Measure labels
  labelA.innerText = `Known Real-Life Length (${unitText})`;
  labelS.innerText = `Corresponding On-Screen Length (${unitText})`;

  // Unknown Measure label
  labelE.innerText = `On-Screen Length in Question (${unitText})`;

  // Empty the result box on unit change
  result.innerText = "";

  // Instructions
  const inst = `1. Enter the Known Real-Life Length (${unitText}) — taken from the product specs.
2. Measure the Corresponding On-Screen Length (${unitText}) using a physical ruler.
3. Measure the On-Screen Length in Question (${unitText}) using the same ruler.
4. Click "Calculate" to see the Estimated Real-Life Length.`;
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

  // Now only show the values — label already exists above
  result.innerText = displayText;

  // Diagram
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
