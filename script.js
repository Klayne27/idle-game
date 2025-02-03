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

let totalGoldGain = 0;

const player = {
  gold: 99999999999,
};

class Monster {
  constructor(
    name,
    price,
    baseGoldDrop,
    goldDrop,
    level,
    elementContainer,
    timerMultiplier
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
  }

  clickMonster() {
    if (this.level > 0) {
      if (this.isTimed) return;
      this.isTimed = true;
      this.startTimer();
    }
  }

  startTimer() {
    this.remainingTime = this.timerMultiplier;
    this.updateTimerDisplay();

    const timerStep = () => {
      this.remainingTime--;
      const goldDropElement = this.elementContainer.querySelector(".gold-drop");
      goldDropElement.classList.remove("filled");
      this.updateTimerDisplay();

      if (this.remainingTime < 0) {
        clearInterval(this.timerInterval);
        this.isTimed = false;
        player.gold += this.goldDrop;
        goldDisplay.textContent = `Gold: 💰${player.gold.toFixed(2)}`;
        const goldDropElement = this.elementContainer.querySelector(".gold-drop");
        goldDropElement.classList.add("filled");
        this.resetTimer();
      }
    };

    // Execute immediately and then every second
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

    // Update the gold-drop fill width
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
      totalGoldGain += this.baseGoldDrop;
      console.log(totalGoldGain);
      console.log(this.level);
      this.monsterScaling();
      this.updateUI();
    } else {
      console.log("Not enough gold!");
    }
  }

  monsterScaling() {
    const scalingFactors = {
      Slime: 1.07,
      Rat: 1.15,
      Sprout: 1.14,
      Imp: 1.13,
      Hawk: 1.12,
      Hound: 1.11,
      Bear: 1.1,
      Werewolf: 1.09,
      Golem: 1.08,
      Troll: 1.07,
    };
    this.price *= scalingFactors[this.name];
  }

  updateUI() {
    goldDisplay.textContent = `Gold: 💰${player.gold.toFixed(2)}`;

    const goldDropText = this.elementContainer.querySelector(".gold-drop");
    goldDropText.textContent = `Gold drop: 🪙${this.goldDrop.toFixed(2)}`;

    const btnLevelupText = this.elementContainer.querySelector(".btn-levelup");
    btnLevelupText.textContent = `Level up: 💰${this.price.toFixed(2)}`;

    const monsterLevel = this.elementContainer.querySelector(".mon-level");
    monsterLevel.textContent = `Level ${this.level}`;
  }
}

const monsters = [
  new Monster("Slime", 4, 1, 0, 0, monContainers[0], 1),
  new Monster("Rat", 60, 60, 0, 0, monContainers[1], 3),
  new Monster("Sprout", 720, 540, 0, 0, monContainers[2], 6),
  new Monster("Imp", 8640, 4320, 0, 0, monContainers[3], 12),
  new Monster("Hawk", 103680, 51840, 0, 0, monContainers[4], 24),
  new Monster("Hound", 1244160, 622080, 0, 0, monContainers[5], 96),
  new Monster("Bear", 14929920, 7464960, 0, 0, monContainers[6], 384),
  new Monster("Werewolf", 179159040, 89579520, 0, 0, monContainers[7], 1536),
  new Monster("Golem", 2149908480, 1074954240, 0, 0, monContainers[8], 6144),
  new Monster("Troll", 25798901760, 29668737024, 0, 0, monContainers[9], 36864),
];

function addEventListeners(monster) {
  monster.elementContainer
    .querySelector(".btn-levelup")
    .addEventListener("click", monster.buyLevel.bind(monster));
  monster.elementContainer
    .querySelector(".mon-name")
    .addEventListener("click", monster.clickMonster.bind(monster));
}

monsters.forEach((monster) => addEventListeners(monster));
