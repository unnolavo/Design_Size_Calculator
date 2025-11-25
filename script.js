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

  // Known Pair labels
  labelA.innerText = `Known Real-Life Length (${unitText})`;
  labelS.innerText = `Corresponding On-Screen Length (${unitText})`;

  // Unknown Pair label (UPDATED)
  labelE.innerTex
