let coinCount = 0;
let coinsPerClick = 1;
let levelName = "Новичок";

const levels = [
    { name: "Новичок", threshold: 0 },
    { name: "Машина", threshold: 100 },
    { name: "Дегенерат", threshold: 500 },
    { name: "Всемогущий", threshold: 1000 }
];

function earnCoin() {
    coinCount += coinsPerClick;
    updateUI();
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

updateUI(); // Инициализация
