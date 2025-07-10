const calculators = {
  "in-width": {
    labels: ["FULL WIDTH (inches)", "ON-SCREEN FULL WIDTH (inches)", "ON-SCREEN DESIGN WIDTH (inches)"],
    unit: "in",
    direction: "width",
    instruction: `1. Enter the actual measurement of the FULL WIDTH - typically found on product page in the Description or Size drop-down menu. (e.g., 40 inches). 
2. Enter the onscreen measurement of that FULL PRODUCT WIDTH - taken with a ruler (e.g., 7 inches). 
3. Enter the onscreen measurement of the DESIGN ELEMENT'S WIDTH - taken with a ruler (e.g., 2 inches). 
4. Click "Calculate" to get the estimated measure of the ACTUAL DESIGN ELEMENT WIDTH.`
  },
  "in-height": {
    labels: ["FULL HEIGHT (inches)", "ON-SCREEN FULL HEIGHT (inches)", "ON-SCREEN DESIGN HEIGHT (inches)"],
    unit: "in",
    direction: "height",
    instruction: `1. Enter the actual measurement of the FULL HEIGHT - typically found on product page in the Description or Size drop-down menu. (e.g., 40 inches). 
2. Enter the onscreen measurement of that FULL PRODUCT HEIGHT - taken with a ruler (e.g., 7 inches). 
3. Enter the onscreen measurement of the DESIGN ELEMENT'S HEIGHT - taken with a ruler (e.g., 2 inches). 
4. Click "Calculate" to get the estimated measure of the ACTUAL DESIGN ELEMENT HEIGHT.`
  },
  "cm-width": {
    labels: ["FULL WIDTH (cm)", "ON-SCREEN FULL WIDTH (cm)", "ON-SCREEN DESIGN WIDTH (cm)"],
    unit: "cm",
    direction: "width",
    instruction: `1. Enter the actual measurement of the FULL WIDTH - typically found on product page in the Description or Size drop-down menu. (e.g., 40cm). 
2. Enter the onscreen measurement of that FULL PRODUCT WIDTH - taken with a ruler (e.g., 7cm). 
3. Enter the onscreen measurement of the DESIGN ELEMENT'S WIDTH - taken with a ruler (e.g., 2cm). 
4. Click "Calculate" to get the estimated measure of the ACTUAL DESIGN ELEMENT WIDTH.`
  },
  "cm-height": {
    labels: ["FULL HEIGHT (cm)", "ON-SCREEN FULL HEIGHT (cm)", "ON-SCREEN DESIGN HEIGHT (cm)"],
    unit: "cm",
    direction: "height",
    instruction: `1. Enter the actual measurement of the FULL HEIGHT - typically found on product page in the Description or Size drop-down menu. (e.g., 40cm). 
2. Enter the onscreen measurement of that FULL PRODUCT HEIGHT - taken with a ruler (e.g., 7cm). 
3. Enter the onscreen measurement of the DESIGN ELEMENT'S HEIGHT - taken with a ruler (e.g., 2cm). 
4. Click "Calculate" to get the estimated measure of the ACTUAL DESIGN ELEMENT HEIGHT.`
  }
};

const container = document.getElementById("calculators-container");
for (let key in calculators) {
  const calc = calculators[key];
  const div = document.createElement("div");
  div.className = "calculator";
  div.id = key;
  div.innerHTML = `
    <div class="instructions-toggle">Instructions (click to minimize)</div>
    <div class="instructions-text">${calc.instruction.replace(/\n/g, "<br>")}</div>
    <input type="number" step="any" placeholder="${calc.labels[0]}" class="a" />
    <input type="number" step="any" placeholder="${calc.labels[1]}" class="s" />
    <input type="number" step="any" placeholder="${calc.labels[2]}" class="e" />
    <button>Calculate</button>
    <div class="result"></div>
    <div class="visual-aid">
      <div class="${calc.direction === 'width' ? 'visual-line' : 'visual-vertical'}"></div>
    </div>
  `;
  container.appendChild(div);

  const btn = div.querySelector("button");
  const result = div.querySelector(".result");
  btn.addEventListener("click", () => {
    const A = parseFloat(div.querySelector(".a").value);
    const S = parseFloat(div.querySelector(".s").value);
    const E = parseFloat(div.querySelector(".e").value);
    if (!A || !S || !E || S === 0) {
      result.textContent = "Please enter valid values (S cannot be 0).";
      return;
    }
    const ratio = E / S;
    const actual = A * ratio;
    result.textContent = `${actual.toFixed(2)} ${calc.unit}`;
  });

  const toggle = div.querySelector(".instructions-toggle");
  const text = div.querySelector(".instructions-text");
  toggle.addEventListener("click", () => {
    text.style.display = text.style.display === "none" ? "block" : "none";
  });
}

document.getElementById("unit").addEventListener("change", updateVisibility);
document.getElementById("side").addEventListener("change", updateVisibility);

function updateVisibility() {
  const unit = document.getElementById("unit").value;
  const side = document.getElementById("side").value;
  for (let key in calculators) {
    document.getElementById(key).classList.remove("visible");
  }
  if (unit && side) {
    document.getElementById(`${unit}-${side}`).classList.add("visible");
  }
}