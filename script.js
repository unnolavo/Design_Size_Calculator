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

  labelA.innerText = `Known Real-Life Length (${unitText})`;
  labelS.innerText = `Corresponding On-Screen Length (${unitText})`;
  labelE.innerText = `On-screen Length in Question (${unitText})`;

  // EMPTY result box on every unit change
  result.innerText = "";

  const inst = `
1. Enter the Known Real-Life Length (${unitText}) — taken from the product page or size chart.
2. Measure the Corresponding On-Screen Length (${unitText}) using a ruler.
3. Measure the On-screen Length in Question (${unitText}).
4. Click "Calculate" to find the Corresponding Real-Life Length in Question.
  `;

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

  if (isNaN(A) || isNaN(S) || isNaN(E) || A <= 0 || S <= 0 || E <= 0) {
    result.innerText = "Please enter valid positive numbers for all fields.";
    return;
  }

  const calc = (E * A) / S;
  const unit = unitSelect.value;

  let displayText;
  let convertedValue;

  if (unit === "cm") {
    convertedValue = (calc / 2.54).toFixed(2);
    displayText = `${calc.toFixed(2)} cm   |   ${convertedValue} in`;
  } else {
    convertedValue = (calc * 2.54).toFixed(2);
    displayText = `${calc.toFixed(2)} in   |   ${convertedValue} cm`;
  }

  result.innerText = displayText;

  // Draw diagram
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const margin = 50;
  const fullLength = canvas.width - margin * 2;
  const designLength = (E / S) * fullLength;

  ctx.beginPath();
  ctx.moveTo(margin, canvas.height / 2);
  ctx.lineTo(margin + fullLength, canvas.height / 2);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(margin, canvas.height / 2 + 40);
  ctx.lineTo(margin + designLength, canvas.height / 2 + 40);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.font = "14px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Full Product Side", margin, canvas.height / 2 - 10);

  const diagramLabel =
    unit === "cm"
      ? `Estimated Design: ${calc.toFixed(2)} cm`
      : `Estimated Design: ${calc.toFixed(2)} in`;

  ctx.fillText(diagramLabel, margin, canvas.height / 2 + 70);
});

// Initialize
updateLabels();
toggleInstructions();
toggleInstructions();
