// Utility to format numbers to 2 decimals
function fmt(num) {
  return Number(num).toFixed(2);
}

// Get DOM elements
const wheelGearTeeth = document.getElementById('wheelGearTeeth');
const nortonGearTeeth = document.getElementById('nortonGearTeeth');
const tireDiameter = document.getElementById('tireDiameter');
const drivenPulleyDiameter = document.getElementById('drivenPulleyDiameter');
const wheelDiameter = document.getElementById('wheelDiameter');
const kValue = document.getElementById('kValue');
const plateNumber = document.getElementById('plateNumber');
const seedSpacing = document.getElementById('seedSpacing');
const gearRatioSelect = document.getElementById('gearRatioSelect');
const wheelRatio = document.getElementById('wheelRatio');
const gearRatio = document.getElementById('gearRatio');
const transmissionRatio = document.getElementById('transmissionRatio');
const zValue = document.getElementById('zValue');
const recordBtn = document.getElementById('recordBtn');
const resetBtn = document.getElementById('resetBtn');
const recordList = document.getElementById('recordList');
const datetime = document.getElementById('datetime');
const nTeker = document.getElementById('nTeker');

// Predefined gear ratios
const gearRatios = {
  "23/17": 23/17,
  "23/18": 23/18,
  "23/19": 23/19,
  "23/20": 23/20,
  "23/21": 23/21,
  "23/22": 23/22,
  "23/23": 23/23,
  "16/17": 16/17,
  "16/18": 16/18,
  "16/19": 16/19,
  "16/20": 16/20,
  "16/21": 16/21,
  "16/22": 16/22,
  "16/23": 16/23
};

// Update datetime display
function updateDateTime() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('tr-TR');
  const timeStr = now.toLocaleTimeString('tr-TR');
  datetime.textContent = `${dateStr} ${timeStr}`;
}

// Calculate wheel ratio (A/B)
function calculateWheelRatio() {
  const a = parseFloat(wheelGearTeeth.value) || 0;
  const b = parseFloat(nortonGearTeeth.value) || 0;
  return b > 0 ? a / b : 0;
}

// Calculate gear ratio (D/C)
function calculateGearRatio() {
  const d = parseFloat(drivenPulleyDiameter.value) || 0;
  const c = parseFloat(tireDiameter.value) || 0;
  return c > 0 ? d / c : 0;
}

// Calculate transmission ratio (D/C) × (A/B)
function calculateTransmissionRatio() {
  const wheelRatioValue = calculateWheelRatio();
  const gearRatioValue = calculateGearRatio();
  return wheelRatioValue * gearRatioValue;
}

// Calculate Z value: (π × D) / (i × k)
function calculateZValue() {
  const pi = Math.PI;
  const d = parseFloat(wheelDiameter.value) || 0;
  const nplaka = parseFloat(plateNumber.value) || 0;
  const nteker = parseFloat(nTeker.value) || 1; // inputtan al
  const k = parseFloat(kValue.value) || 0;
  
  if (k === 0 || nteker === 0) return 0;
  
  const i = nplaka / nteker;
  const z = (pi * d) / (i * k);
  return z;
}

// Update all calculations and display
function updateCalculations() {
  const wheelRatioValue = calculateWheelRatio();
  const gearRatioValue = calculateGearRatio();
  const transmissionRatioValue = calculateTransmissionRatio();
  const zValueValue = calculateZValue();

  wheelRatio.value = fmt(wheelRatioValue);
  gearRatio.value = fmt(gearRatioValue);
  transmissionRatio.value = fmt(transmissionRatioValue);
  zValue.value = fmt(zValueValue);
}

// Handle gear ratio selection
function handleGearRatioSelection() {
  const selectedValue = gearRatioSelect.value;
  if (selectedValue && selectedValue !== "") {
    // Parse the selected ratio (e.g., "23-17")
    const [a, b] = selectedValue.split('-').map(Number);
    if (!isNaN(a) && !isNaN(b) && b > 0) {
      wheelGearTeeth.value = a;
      nortonGearTeeth.value = b;
    }
  }
  updateCalculations();
}

// Reset form to default values
function resetForm() {
  wheelGearTeeth.value = 20;
  nortonGearTeeth.value = 17;
  tireDiameter.value = 20;
  drivenPulleyDiameter.value = 16;
  wheelDiameter.value = 0;
  kValue.value = 0;
  plateNumber.value = 0;
  nTeker.value = 29.39;
  seedSpacing.value = 0;
  gearRatioSelect.value = '';
  updateCalculations();
}

// Record current entry
function recordEntry() {
  const entry = {
    datetime: new Date().toLocaleString('tr-TR'),
    wheelGearTeeth: wheelGearTeeth.value || '0',
    nortonGearTeeth: nortonGearTeeth.value || '0',
    tireDiameter: tireDiameter.value || '0',
    drivenPulleyDiameter: drivenPulleyDiameter.value || '0',
    wheelDiameter: wheelDiameter.value || '0',
    kValue: kValue.value || '0',
    plateNumber: plateNumber.value || '0',
    seedSpacing: seedSpacing.value || '0',
    wheelRatio: wheelRatio.value || '0.00',
    gearRatio: gearRatio.value || '0.00',
    transmissionRatio: transmissionRatio.value || '0.00',
    zValue: zValue.value || '0.00'
  };

  const div = document.createElement('div');
  div.innerHTML = `
    <strong>${entry.datetime}</strong><br>
    A: ${entry.wheelGearTeeth}, B: ${entry.nortonGearTeeth}, C: ${entry.tireDiameter}, D: ${entry.drivenPulleyDiameter}<br>
    Tekerlek Çapı: ${entry.wheelDiameter}, k: ${entry.kValue}, nplaka: ${entry.plateNumber}, Tohum: ${entry.seedSpacing}cm<br>
    Tekerlek Oranı: ${entry.wheelRatio}, Dişli Oranı: ${entry.gearRatio}<br>
    <strong>Transmisyon Devri: ${entry.transmissionRatio}</strong><br>
    <strong>Z Değeri: ${entry.zValue}</strong>
  `;
  
  recordList.appendChild(div);
  
  // Keep only last 10 records
  const records = recordList.querySelectorAll('div');
  if (records.length > 11) { // 11 because first div is header
    recordList.removeChild(records[1]); // Remove second div (first record)
  }
}

// Input validation - ensure positive numbers
function validateInput(input) {
  const value = parseFloat(input.value);
  if (value < 0 || isNaN(value)) {
    input.value = 0;
  }
}

// Validate all numeric inputs
function validateAllInputs() {
  validateInput(wheelGearTeeth);
  validateInput(nortonGearTeeth);
  validateInput(tireDiameter);
  validateInput(drivenPulleyDiameter);
  validateInput(wheelDiameter);
  validateInput(kValue);
  validateInput(plateNumber);
  validateInput(seedSpacing);
  validateInput(nTeker);
}

// Event listeners
wheelGearTeeth.addEventListener('input', () => {
  validateInput(wheelGearTeeth);
  updateCalculations();
});
nortonGearTeeth.addEventListener('input', () => {
  validateInput(nortonGearTeeth);
  updateCalculations();
});
tireDiameter.addEventListener('input', () => {
  validateInput(tireDiameter);
  updateCalculations();
});
drivenPulleyDiameter.addEventListener('input', () => {
  validateInput(drivenPulleyDiameter);
  updateCalculations();
});
wheelDiameter.addEventListener('input', () => {
  validateInput(wheelDiameter);
  updateCalculations();
});
kValue.addEventListener('input', () => {
  validateInput(kValue);
  updateCalculations();
});
plateNumber.addEventListener('input', () => {
  validateInput(plateNumber);
  updateCalculations();
});
seedSpacing.addEventListener('input', () => {
  validateInput(seedSpacing);
});
nTeker.addEventListener('input', () => {
  validateInput(nTeker);
  updateCalculations();
});
gearRatioSelect.addEventListener('change', handleGearRatioSelection);
recordBtn.addEventListener('click', recordEntry);
resetBtn.addEventListener('click', resetForm);

// Initialize
updateDateTime();
validateAllInputs();
updateCalculations();

// Update datetime every second
setInterval(updateDateTime, 1000); 