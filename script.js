const goldDisplay = document.querySelector(".total-gold-display");

const monContainers = [
  document.querySelector(".mon-container1"),
  document.querySelector(".mon-container2"),
  document.querySelector(".mon-container3"),
  document.querySelector(".mon-container4"),
  document.querySelector(".mon-container5"),
  document.querySelector(".mon-container6"),
  document.querySelector(".mon-container7"),
  document.querySelector(".mon-container8"),
  document.querySelector(".mon-container9"),
  document.querySelector(".mon-container10"),
];

const player = {
  gold: 4,
};


class Monster {
  constructor(
    name,
    price,
    baseGoldDrop,
    goldDrop,
    level,
    elementContainer,
    timerMultiplier,
    unlockPrice
  ) {
    this.name = name;
    this.price = price;
    this.baseGoldDrop = baseGoldDrop;
    this.goldDrop = goldDrop;
    this.level = level;
    this.elementContainer = elementContainer;
    this.timerMultiplier = timerMultiplier;
    this.isTimed = false;
    this.timerInterval = null;
    this.remainingTime = timerMultiplier;
    this.unlockPrice = unlockPrice;
  }

  clickMonster() {
    if (this.level > 0) {
      if (this.isTimed) return;
      this.isTimed = true;
      this.startTimer();
    }
  }

  startTimer() {
    if (this.remainingTime < 0) {
      this.remainingTime = this.timerMultiplier;
      this.updateTimerDisplay();
      updateAllUnlockButtons();
    }

    const timerStep = () => {
      this.remainingTime--;
      const goldDropElement = this.elementContainer.querySelector(".gold-drop");
      goldDropElement.classList.remove("filled");
      this.updateTimerDisplay();

      if (this.remainingTime < 0) {
        clearInterval(this.timerInterval);
        this.isTimed = false;
        player.gold += this.goldDrop;
        goldDisplay.textContent = `💰${formatNumber(player.gold)}`;
        const goldDropElement = this.elementContainer.querySelector(".gold-drop");
        goldDropElement.classList.add("filled");
        this.resetTimer();
        updateAllUnlockButtons();
      }
    };

    timerStep();
    this.timerInterval = setInterval(timerStep, 1000);
  }

  resetTimer() {
    this.remainingTime = this.timerMultiplier;
    this.updateTimerDisplay();
  }

  updateTimerDisplay() {
    const timerElement = this.elementContainer.querySelector(".timer");
    const hours = Math.floor(this.remainingTime / 3600);
    const minutes = Math.floor((this.remainingTime % 3600) / 60);
    const seconds = this.remainingTime % 60;
    timerElement.textContent = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    const goldDropElement = this.elementContainer.querySelector(".gold-drop");
    const fillPercentage =
      ((this.timerMultiplier - this.remainingTime) / this.timerMultiplier) * 100;
    goldDropElement.style.setProperty("--fill-width", `${fillPercentage}%`);
  }

  buyLevel() {
    if (player.gold >= this.price) {
      player.gold -= this.price;
      this.level++;
      this.goldDrop += this.baseGoldDrop;
      console.log(this.level);
      this.monsterScaling();
      this.updateUI();
    }
    updateAllUnlockButtons();
  }

  monsterScaling() {
    const scalingFactors = {
      Slime: 1.07,
      Rat: 1.15,
      Hound: 1.14,
      Hawk: 1.13,
      Bear: 1.12,
      Zombie: 1.11,
      Goblin: 1.1,
      Werewolf: 1.09,
      Troll: 1.08,
      Golem: 1.07,
    };
    this.price *= scalingFactors[this.name];
  }

  updateUI() {
    goldDisplay.textContent = `💰${formatNumber(player.gold)}`;

    const goldDropText = this.elementContainer.querySelector(".gold-drop");
    goldDropText.textContent = `🪙${formatNumber(this.goldDrop)}`;

    const btnLevelupText = this.elementContainer.querySelector(".btn-levelup");
    btnLevelupText.textContent = `💰${formatNumber(this.price)}`;

    const monsterLevel = this.elementContainer.querySelector(".mon-level");
    monsterLevel.textContent = `Level ${this.level}`;
  }

  unlockMonster() {
    if (player.gold >= this.unlockPrice) {
      player.gold -= this.unlockPrice;
      this.goldDrop += this.baseGoldDrop;
      this.elementContainer.classList.remove("locked");
      this.elementContainer.querySelector(".unlock-button").style.display = "none";
      this.level++;
      this.monsterScaling();
      this.updateUI();
      updateAllUnlockButtons();
    }
  }

  updateUnlockButton() {
    const levelUpButton = this.elementContainer.querySelector(".btn-levelup");
    const unlockButton = this.elementContainer.querySelector(".unlock-button");
    if (!unlockButton) return;
    if (!levelUpButton) return;

    levelUpButton.classList.toggle("cannot-afford", player.gold < this.price);
    unlockButton.classList.toggle("cannot-afford", player.gold < this.unlockPrice);
  }
}

const monsters = [
  new Monster("Slime", 4, 1, 0, 0, monContainers[0], 1, 4),
  new Monster("Rat", 60, 60, 0, 0, monContainers[1], 3, 60),
  new Monster("Hound", 720, 540, 0, 0, monContainers[2], 6, 720),
  new Monster("Hawk", 8640, 4320, 0, 0, monContainers[3], 12, 8640),
  new Monster("Bear", 103680, 51840, 0, 0, monContainers[4], 24, 103680),
  new Monster("Zombie", 1244160, 622080, 0, 0, monContainers[5], 96, 1244160),
  new Monster("Goblin", 14929920, 7464960, 0, 0, monContainers[6], 384, 14929920),
  new Monster("Werewolf", 179159040, 89579520, 0, 0, monContainers[7], 1536, 179159040),
  new Monster("Troll", 2149908480, 1074954240, 0, 0, monContainers[8], 6144, 2149908480),
  new Monster(
    "Golem",
    25798901760,
    29668737024,
    0,
    0,
    monContainers[9],
    36864,
    25798901760
  ),
];

function formatNumber(value) {
  if (value < 1e6) {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const suffixes = ["million", "million", "billion", 'trillion', 'quadrillion', 'quintillion'];
  let suffixIndex = -1;
  let formattedValue = value;

  while (formattedValue >= 1e3 && suffixIndex < suffixes.length - 1) {
    formattedValue /= 1e3;
    suffixIndex++;
  }

  return `${formattedValue.toFixed(suffixIndex === 2 ? 3 : 2)}${suffixes[suffixIndex]}`;
}

function updateAllUnlockButtons() {
  monsters.forEach((monster) => monster.updateUnlockButton());
  monsters.forEach((monster) => monster.updateTimerDisplay());
}

monsters.forEach((monster) => addEventListeners(monster));
updateAllUnlockButtons();

function addEventListeners(monster) {
  monster.elementContainer
    .querySelector(".btn-levelup")
    .addEventListener("click", monster.buyLevel.bind(monster));
  monster.elementContainer
    .querySelector(".mon-name")
    .addEventListener("click", monster.clickMonster.bind(monster));
  monster.elementContainer
    .querySelector(".unlock-button")
    .addEventListener("click", monster.unlockMonster.bind(monster));
}
