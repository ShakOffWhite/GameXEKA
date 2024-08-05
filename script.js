let coinCount = 0;
let coinsPerClick = 1;
let levelName = "Новичок";
let lastClickTimes = [];

const levels = [
    { name: "Новичок", threshold: 0 },
    { name: "Машина", threshold: 100 },
    { name: "Дегенерат", threshold: 500 },
    { name: "Всемогущий", threshold: 1000 }
];

function earnCoin() {
    if (canClick()) {
        coinCount += coinsPerClick;
        updateUI();
    }
}

function canClick() {
    const now = Date.now();
    lastClickTimes.push(now);

    // убираем автокликер от сереги
    lastClickTimes = lastClickTimes.filter(time => now - time < 1000);

    
    if (lastClickTimes.length > 10) {
        return false;
    }

    return true;
}

function updateUI() {
    document.getElementById("coinCount").innerText = coinCount;
    updateLevel();
    updateShop();
}

function updateLevel() {
    let nextLevelIndex = levels.findIndex(level => coinCount < level.threshold);
    if (nextLevelIndex === -1) {
        levelName = levels[levels.length - 1].name;
        document.getElementById("nextLevel").innerText = "Достигнут максимальный уровень";
    } else {
        levelName = levels[nextLevelIndex - 1].name;
        document.getElementById("nextLevel").innerText = levels[nextLevelIndex].threshold - coinCount;
    }
    document.getElementById("levelName").innerText = levelName;
}

function updateShop() {
    document.getElementById("bonus").innerText = coinsPerClick;
    const button = document.querySelector('.shop-container button');
    if (coinCount >= 100) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

function buyUpgrade() {
    if (coinCount >= 100) {
        coinCount -= 100;
        coinsPerClick += 1;
        updateUI();
    }
}

// Инициализация интерфейса при загрузке
document.addEventListener('DOMContentLoaded', updateUI);
