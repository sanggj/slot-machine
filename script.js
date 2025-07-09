let balance = 1000;
let betAmount = 10;
let isSpinning = false;
const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '⭐', '💎', '🍉', '🍍', '🍎', '🍓', '🍑'];
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const balanceDisplay = document.getElementById('balance');
const messageDisplay = document.getElementById('message');
const warningDisplay = document.getElementById('warning');
const themeSelect = document.getElementById('themeSelect');
const betAmountInput = document.getElementById('betAmount');
const addCoinsInput = document.getElementById('addCoinsAmount');
const settingsModal = document.getElementById('settingsModal');
const spinButton = document.getElementById('spinButton');

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function showWarning(text) {
    warningDisplay.textContent = text;
}

function clearWarning() {
    warningDisplay.textContent = '';
}

function spin() {
    if (isSpinning) return;

    betAmount = parseInt(betAmountInput.value) || 10;
    if (betAmount > 9999) {
        betAmount = 9999;
        betAmountInput.value = 9999;
        showWarning('Bet amount capped at 9999 coins!');
    } else if (betAmount < 1) {
        betAmount = 1;
        betAmountInput.value = 1;
        showWarning('Bet amount set to minimum of 1 coin!');
    } else if (betAmount > balance) {
        showWarning('Not enough coins for this bet!');
        return;
    } else {
        clearWarning();
    }

    isSpinning = true;
    spinButton.disabled = true;
    balance -= betAmount;
    balanceDisplay.textContent = `Balance: ${balance} coins`;
    messageDisplay.textContent = '';

    // Simulate spinning
    let spins = 20;
    let interval = setInterval(() => {
        reel1.textContent = getRandomSymbol();
        reel2.textContent = getRandomSymbol();
        reel3.textContent = getRandomSymbol();
        spins--;
        if (spins <= 0) {
            clearInterval(interval);
            checkWin();
            isSpinning = false;
            spinButton.disabled = false;
        }
    }, 100);
}

function checkWin() {
    const result = [reel1.textContent, reel2.textContent, reel3.textContent];
    if (result[0] === result[1] && result[1] === result[2]) {
        let winMultiplier = 0;
        if (result[0] === '💎') winMultiplier = 50;
        else if (result[0] === '⭐') winMultiplier = 20;
        else if (result[0] === '🔔') winMultiplier = 10;
        else winMultiplier = 5;

        const winAmount = betAmount * winMultiplier;
        balance += winAmount;
        messageDisplay.textContent = `Jackpot! You win ${winAmount} coins!`;
        balanceDisplay.textContent = `Balance: ${balance} coins`;
    } else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
        const winAmount = betAmount * 2;
        balance += winAmount;
        messageDisplay.textContent = `Nice! You win ${winAmount} coins!`;
        balanceDisplay.textContent = `Balance: ${balance} coins`;
    } else {
        messageDisplay.textContent = 'Try again!';
    }
}

function addCoins() {
    let coinsToAdd = parseInt(addCoinsInput.value) || 500;
    if (coinsToAdd > 9999) {
        coinsToAdd = 9999;
        addCoinsInput.value = 9999;
        showWarning('Coin amount capped at 9999 coins!');
    } else if (coinsToAdd < 1) {
        coinsToAdd = 1;
        addCoinsInput.value = 1;
        showWarning('Coin amount set to minimum of 1 coin!');
    } else {
        clearWarning();
        messageDisplay.textContent = `Added ${coinsToAdd} coins!`;
    }
    balance += coinsToAdd;
    balanceDisplay.textContent = `Balance: ${balance} coins`;
}

function changeTheme() {
    document.body.className = themeSelect.value + '-theme';
}

function openSettings() {
    settingsModal.style.display = 'flex';
    document.querySelector('.slot-machine').classList.add('blur');
}

function closeSettings() {
    settingsModal.style.display = 'none';
    document.querySelector('.slot-machine').classList.remove('blur');
}

// Initialize theme
document.body.classList.add('default-theme');