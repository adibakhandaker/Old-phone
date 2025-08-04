const loadingScreen = document.getElementById('loadingScreen');
const okBtn = document.getElementById('okBtn');
const phone = document.querySelector('.phone');

phone.style.display = 'none'; // Hide phone initially

okBtn.addEventListener('click', () => {
  loadingScreen.style.display = 'none';  // Hide loading screen
  phone.style.display = 'flex';           // Show phone
});

const t9Map = {
  '2': ['A', 'B', 'C'],
  '3': ['D', 'E', 'F'],
  '4': ['G', 'H', 'I'],
  '5': ['J', 'K', 'L'],
  '6': ['M', 'N', 'O'],
  '7': ['P', 'Q', 'R', 'S'],
  '8': ['T', 'U', 'V'],
  '9': ['W', 'X', 'Y', 'Z'],
};

const displayText = document.getElementById('displayText');
const menu = document.getElementById('menu');

let currentInput = '';
let lastKey = null;
let lastKeyTime = 0;
let letterIndex = 0;

let inMenu = false;

function resetInput() {
  lastKey = null;
  letterIndex = 0;
}

function addChar(char) {
  currentInput += char;
  updateDisplay();
}

function removeChar() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function updateDisplay() {
  if (inMenu) {
    displayText.textContent = '';
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
    displayText.textContent = currentInput;
  }
}

function handleKeyPress(key) {
  const now = Date.now();

  if (inMenu) {
    // Selecting menu options
    if (key >= '1' && key <= '4') {
      alert(`You selected menu option ${key}. (Feature coming soon!)`);
      // For example, toggle menu off after select
      inMenu = false;
      updateDisplay();
    }
    return;
  }

  if (t9Map[key]) {
    // If pressing the same key within 1.2 seconds, cycle letters
    if (key === lastKey && now - lastKeyTime < 1200) {
      letterIndex = (letterIndex + 1) % t9Map[key].length;
      // Remove last char and add new letter
      removeChar();
      addChar(t9Map[key][letterIndex]);
    } else {
      // New key or timeout
      resetInput();
      letterIndex = 0;
      addChar(t9Map[key][letterIndex]);
    }
    lastKey = key;
    lastKeyTime = now;
  } else if (key === '0') {
    addChar(' ');
    resetInput();
  } else if (key === '1') {
    addChar('1');
    resetInput();
  } else if (key === '*') {
    addChar('*');
    resetInput();
  } else if (key === '#') {
    addChar('#');
    resetInput();
  }
}

document.querySelectorAll('.keypad button').forEach(btn => {
  btn.addEventListener('click', () => {
    handleKeyPress(btn.dataset.key);
  });
});

document.getElementById('backBtn').addEventListener('click', () => {
  // Remove last character
  removeChar();
});

document.getElementById('clearBtn').addEventListener('click', () => {
  // Clear all input
  currentInput = '';
  updateDisplay();
  resetInput();
});


// Initialize display
updateDisplay();
