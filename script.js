// Utility to format numbers to 2 decimals
function fmt(num) {
  return Number(num).toFixed(2);
}

// Get DOM elements
const wheelDiameter = document.getElementById('wheelDiameter');
const kValue = document.getElementById('kValue');
const plateNumber = document.getElementById('plateNumber');
const transmissionRatio = document.getElementById('transmissionRatio');
const zValue = document.getElementById('zValue');
const recordBtn = document.getElementById('recordBtn');
const resetBtn = document.getElementById('resetBtn');
const recordList = document.getElementById('recordList');
const datetime = document.getElementById('datetime');
const speedValue = document.getElementById('speedValue');
const calculatedN2 = document.getElementById('calculatedN2');

// --- Formül Zinciri Hesaplama ---
const chain_n1 = document.getElementById('chain_n1');
const chain_z1 = document.getElementById('chain_z1');
const chain_z2 = document.getElementById('chain_z2');
const chain_z3 = document.getElementById('chain_z3');
const chain_z4 = document.getElementById('chain_z4');
const chain_z6 = document.getElementById('chain_z6');
const chain_z7 = document.getElementById('chain_z7');
const chain_n2 = document.getElementById('chain_n2');
const chain_n4 = document.getElementById('chain_n4');
const chain_n7 = document.getElementById('chain_n7');

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

// Calculate i value: n1(plaka) / n2(teker)
function calculateTransmissionRatio() {
  const nplaka = parseFloat(plateNumber.value) || 0;
  const nteker = calculateN2FromSpeed(); // hesaplanan n2 değerini kullan
  
  if (nteker === 0) return 0;
  
  const i = nplaka / nteker;
  return i;
}

// Calculate Z value: (π × D) / (i × k)
function calculateZValue() {
  const pi = Math.PI;
  const d = parseFloat(wheelDiameter.value) || 0;        // D - Tekerlek Çapı (metre)
  const nplaka = parseFloat(plateNumber.value) || 0;     // n1(plaka)
  const nteker = calculateN2FromSpeed();                 // n2(teker) - hesaplanan (devir/dakika)
  const k = parseFloat(kValue.value) || 0;               // k Değeri (plaka delik sayısı)
  
  if (k === 0 || nteker === 0) return 0;
  
  const i = nplaka / nteker;                             // i = n1/n2
  const z = (pi * d) / (i * k);                         // Z = (π × D) / (i × k)
  
  // Debug: Z değeri metre cinsinden çıkıyor, cm'ye çevirelim
  // Z = (π × D) / (i × k) = (π × m) / (i × k) = metre
  // Eğer Z cm cinsinden isteniyorsa: z * 100
  return z * 100; // cm cinsinden sonuç
}

// Calculate n2(teker) from speed: n2 = (V × 60) / (π × D)
function calculateN2FromSpeed() {
  const v = parseFloat(speedValue.value) || 0; // hız m/s
  const d = parseFloat(wheelDiameter.value) || 0; // tekerlek çapı (metre)
  const pi = Math.PI;
  
  if (d === 0) return 0;
  
  // Formül: n2 = (V × 60) / (π × D)
  // V m/s cinsinden, D metre cinsinden
  // n2 = (V × 60) / (π × D) = (m/s × 60) / (π × m) = devir/dakika
  const n2 = (v * 60) / (pi * d);
  return n2;
}

// Update all calculations and display
function updateCalculations() {
  const transmissionRatioValue = calculateTransmissionRatio();
  const zValueValue = calculateZValue();
  const calculatedN2Value = calculateN2FromSpeed();

  transmissionRatio.value = fmt(transmissionRatioValue);
  zValue.value = fmt(zValueValue);
  calculatedN2.value = fmt(calculatedN2Value);
}

// Reset form to default values
function resetForm() {
  wheelDiameter.value = 0;
  kValue.value = 0;
  plateNumber.value = 0;
  speedValue.value = 0;
  updateCalculations();
}

// Record current entry
function recordEntry() {
  const entry = {
    datetime: new Date().toLocaleString('tr-TR'),
    wheelDiameter: wheelDiameter.value || '0',
    kValue: kValue.value || '0',
    plateNumber: plateNumber.value || '0',
    speedValue: speedValue.value || '0',
    calculatedN2: calculatedN2.value || '0.00',
    transmissionRatio: transmissionRatio.value || '0.00',
    zValue: zValue.value || '0.00'
  };

  const div = document.createElement('div');
  div.innerHTML = `
    <strong>${entry.datetime}</strong><br>
    Tekerlek Çapı: ${entry.wheelDiameter}, k: ${entry.kValue}, nplaka: ${entry.plateNumber}<br>
    Hız: ${entry.speedValue} m/s, Hesaplanan n2: ${entry.calculatedN2}<br>
    <strong>i: ${entry.transmissionRatio}</strong><br>
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
  validateInput(wheelDiameter);
  validateInput(kValue);
  validateInput(plateNumber);
  validateInput(speedValue);
}

// Update formula chain calculations
function updateFormulaChain() {
  const n1 = parseFloat(chain_n1.value) || 0;
  const z1 = parseFloat(chain_z1.value) || 0;
  const z2 = parseFloat(chain_z2.value) || 0;
  const z3 = parseFloat(chain_z3.value) || 0;
  const z4 = parseFloat(chain_z4.value) || 0;
  const z6 = parseFloat(chain_z6.value) || 0;
  const z7 = parseFloat(chain_z7.value) || 0;

  // n2 = (n1 * z1) / z2
  let n2 = (z2 !== 0) ? (n1 * z1) / z2 : 0;
  // n4 = (n2 * z3) / z4
  let n4 = (z4 !== 0) ? (n2 * z3) / z4 : 0;
  // n7 = (n4 * z6) / z7
  let n7 = (z7 !== 0) ? (n4 * z6) / z7 : 0;

  chain_n2.value = fmt(n2);
  chain_n4.value = fmt(n4);
  chain_n7.value = fmt(n7);
}

// Event listeners
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
speedValue.addEventListener('input', () => {
  validateInput(speedValue);
  updateCalculations();
});
recordBtn.addEventListener('click', recordEntry);
resetBtn.addEventListener('click', resetForm);

// Event listeners for formula chain inputs
[chain_n1, chain_z1, chain_z2, chain_z3, chain_z4, chain_z6, chain_z7].forEach(input => {
  input.addEventListener('input', updateFormulaChain);
});

// Initialize
updateDateTime();
validateAllInputs();
updateCalculations();

// Update datetime every second
setInterval(updateDateTime, 1000); 