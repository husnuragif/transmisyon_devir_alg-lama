// Utility to format numbers to 2 decimals
function fmt(num) {
  return Number(num).toFixed(2);
}

const wheelGear = document.getElementById('wheelGear');
const nortonGear = document.getElementById('nortonGear');
const wheelRatio = document.getElementById('wheelRatio');
const gearRatio = document.getElementById('gearRatio');
const plate = document.getElementById('plate');
const seedSpacing = document.getElementById('seedSpacing');
const transRev = document.getElementById('transRev');
const datetime = document.getElementById('datetime');
const recordBtn = document.getElementById('recordBtn');
const resetBtn = document.getElementById('resetBtn');
const recordList = document.getElementById('recordList');

function updateWheelRatio() {
  const wg = parseFloat(wheelGear.value) || 0;
  const ng = parseFloat(nortonGear.value) || 1;
  const ratio = ng === 0 ? 0 : wg / ng;
  wheelRatio.value = fmt(ratio);
  return ratio;
}

function updateTransRev() {
  const wr = updateWheelRatio();
  const gr = parseFloat(gearRatio.value) || 1;
  const rev = wr * gr;
  transRev.value = fmt(rev);
  return rev;
}

function updateTime() {
  const now = new Date();
  datetime.textContent = now.toLocaleString();
}

function resetForm() {
  wheelGear.value = 1;
  nortonGear.value = 1;
  gearRatio.value = '1.0';
  plate.value = '';
  seedSpacing.value = 0;
  updateTransRev();
}

function recordEntry() {
  const entry = {
    wheelGear: wheelGear.value,
    nortonGear: nortonGear.value,
    wheelRatio: wheelRatio.value,
    gearRatio: gearRatio.value,
    plate: plate.value,
    seedSpacing: seedSpacing.value,
    transRev: transRev.value,
    time: datetime.textContent
  };
  const div = document.createElement('div');
  div.textContent = `WG: ${entry.wheelGear}, NG: ${entry.nortonGear}, WR: ${entry.wheelRatio}, GR: ${entry.gearRatio}, Plate: ${entry.plate}, Seed: ${entry.seedSpacing}, TR: ${entry.transRev}, Time: ${entry.time}`;
  recordList.prepend(div);
}

// Event listeners
wheelGear.addEventListener('input', updateTransRev);
nortonGear.addEventListener('input', updateTransRev);
gearRatio.addEventListener('change', updateTransRev);
recordBtn.addEventListener('click', recordEntry);
resetBtn.addEventListener('click', resetForm);

// Live time update
timer = setInterval(updateTime, 1000);

// Initial setup
updateTransRev();
updateTime(); 