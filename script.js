const unitSelect = document.getElementById("unit");
const instructionText = document.getElementById("instructions");
const result = document.getElementById("result");
const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");

unitSelect.addEventListener("change", updateLabels);

function updateLabels() {
    const unit = unitSelect.value;
    const unitText = unit === "cm" ? "cm" : "in";

    instructionText.innerText =
        `1. Enter the Actual Length (` + unitText + `).
2. Enter the On-screen Full Length (` + unitText + `) using a ruler.
3. Enter the On-screen Design Length (` + unitText + `).
4. Click Calculate to get the Estimated Actual Design Length.`;
}

function toggleInstructions() {
    instructionText.style.display =
        instructionText.style.display === "none" ? "block" : "none";
}

function calculate() {
    const A = parseFloat(document.getElementById("actual").value);
    const S = parseFloat(document.getElementById("screen").value);
    const E = parseFloat(document.getElementById("element").value);
    const unit = unitSelect.value;

    if (!A || !S || !E || S === 0) {
        result.innerText = "Invalid input";
        return;
    }

    const calc = (A * E) / S;
    const converted = unit === "cm" ? (calc / 2.54) : (calc * 2.54);

    result.innerText = `Estimated Actual Design Length: ${calc.toFixed(2)} ${unit} (${converted.toFixed(2)} ${unit === "cm" ? "in" : "cm"})`;

    drawPreview(E, S);
}

function drawPreview(E, S) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const fullWidth = canvas.width - 40;
    const fullX = 20;

    ctx.fillStyle = "#ccc";
    ctx.fillRect(fullX, 30, fullWidth, 10);

    const designWidth = (E / S) * fullWidth;

    ctx.fillStyle = "red";
    ctx.fillRect(fullX, 30, designWidth, 10);
}

updateLabels();
