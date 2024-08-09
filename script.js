let coinCount = parseInt(localStorage.getItem('coinCount')) || 0;
let coinsPerClick = parseInt(localStorage.getItem('coinsPerClick')) || 1;
let levelName = localStorage.getItem('levelName') || "Новичок";
let upgradeCost = parseInt(localStorage.getItem('upgradeCost')) || 100;
let currentLevel = parseInt(localStorage.getItem('currentLevel')) || 0;
let lastClickTimes = [];

const levels = [
    { name: "Начал тапать", threshold: 0, image: "hamster1.png" },
    { name: "Стал Дедом Морозом", threshold: 100, image: "hamster2.jpg" },
    { name: "Поехал на рыбалку", threshold: 500, image: "hamster3.jpg" },
    { name: "Заработал в школе", threshold: 1000, image: "hamster4.jpg" },
    { name: "Купил больницу", threshold: 2000, image: "hamster5.jpg" },
    { name: "Миллиардер", threshold: 4000, image: "hamster6.jpg" },
    { name: "Скупался", threshold: 8000, image: "hamster7.jpg" },
    { name: "Стал казахом", threshold: 10000, image: "hamster8.png" },
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

    // Убираем автокликер от сереги
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
        if (nextLevelIndex - 1 > currentLevel) {
            currentLevel = nextLevelIndex - 1;
            document.getElementById("hamster").src = levels[currentLevel].image;
        }
    }
    document.getElementById("levelName").innerText = levelName;
}

function updateShop() {
    document.getElementById("bonus").innerText = coinsPerClick;
    const button = document.querySelector('.shop-container button');
    button.innerText = `Купить улучшение: ${upgradeCost} монет`;
    if (coinCount >= upgradeCost) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

function buyUpgrade() {
    if (coinCount >= upgradeCost) {
        coinCount -= upgradeCost;
        coinsPerClick += 1;
        upgradeCost *= 2;
        updateUI();
    }
}

function saveProgress() {
    localStorage.setItem('coinCount', coinCount);
    localStorage.setItem('coinsPerClick', coinsPerClick);
    localStorage.setItem('levelName', levelName);
    localStorage.setItem('upgradeCost', upgradeCost);
    localStorage.setItem('currentLevel', currentLevel);
}

// Инициализация интерфейса при загрузке
document.addEventListener('DOMContentLoaded', updateUI);
