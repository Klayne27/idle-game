const goldDisplay = document.querySelector(".total-gold-display");

const monContainer1 = document.querySelector(".mon-container1");
const monContainer2 = document.querySelector(".mon-container2");
const monContainer3 = document.querySelector(".mon-container3");
const monContainer4 = document.querySelector(".mon-container4");
const monContainer5 = document.querySelector(".mon-container5");
const monContainer6 = document.querySelector(".mon-container6");
const monContainer7 = document.querySelector(".mon-container7");
const monContainer8 = document.querySelector(".mon-container8");
const monContainer9 = document.querySelector(".mon-container9");
const monContainer10 = document.querySelector(".mon-container10");

let totalGoldGain = 0;

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
    timerMulitplier
  ) {
    (this.name = name),
      (this.price = price),
      (this.baseGoldDrop = baseGoldDrop),
      (this.goldDrop = goldDrop),
      (this.level = level),
      (this.elementContainer = elementContainer);
    this.timerMulitplier = timerMulitplier;
    this.isTimed = false;
  }

  clickMonster() {
    if (this.isTimed) return;
    this.isTimed = true;
    const killTime = 1000 * this.timerMulitplier;

    setTimeout(() => {
      player.gold += this.goldDrop;
      goldDisplay.textContent = `Gold: 💰${player.gold.toFixed(2)}`;
      this.isTimed = false;
    }, killTime);
  }

  buyLevel() {
    if (player.gold >= this.price) {
      player.gold -= this.price;
      this.level++;
      this.goldDrop += this.baseGoldDrop;
      totalGoldGain += this.baseGoldDrop;
      console.log(totalGoldGain);
      this.monsterScaling();
      this.updateUI();
    } else {
      console.log("Not enough gold!");
    }
  }

  monsterScaling() {
    if (this.name === "Slime") {
      this.price *= 1.07;
    } else if (this.name === "Rat") {
      this.price *= 1.15;
    } else if (this.name === "Sprout") {
      this.price *= 1.14;
    } else if (this.name === "Imp") {
      this.price *= 1.13;
    } else if (this.name === "Hawk") {
      this.price *= 1.12;
    } else if (this.name === "Hound") {
      this.price *= 1.11;
    } else if (this.name === "Bear") {
      this.price *= 1.1;
    } else if (this.name === "Werewolf") {
      this.price *= 1.09;
    } else if (this.name === "Golem") {
      this.price *= 1.08;
    } else if (this.name === "Troll") {
      this.price *= 1.07;
    }
  }

  updateUI() {
    goldDisplay.textContent = `Gold: 💰${player.gold.toFixed(2)}`;

    const goldDropText = this.elementContainer.querySelector(".gold-drop");
    goldDropText.textContent = `Gold drop: 🪙${this.goldDrop.toFixed(2)}`;

    const btnLevelupText = this.elementContainer.querySelector(".btn-levelup");
    btnLevelupText.textContent = `Level up: 💰${this.price.toFixed(2)}`;

    const monsterLevel = this.elementContainer.querySelector(".mon-level");
    monsterLevel.textContent = `level ${this.level}`;
  }
}

const slime = new Monster("Slime", 4, 1, 0, 0, monContainer1, 1);
const rat = new Monster("Rat", 60, 60, 0, 0, monContainer2, 3);
const sprout = new Monster("Sprout", 720, 540, 540, 0, monContainer3, 6);
const imp = new Monster("Imp", 8640, 4320, 4320, 0, monContainer4, 12);
const hawk = new Monster("Hawk", 103680, 51840, 51840, 0, monContainer5, 24);
const hound = new Monster(
  "Hound",
  1244160,
  622080,
  622080,
  0,
  monContainer6,
  96
);
const bear = new Monster(
  "Bear",
  14929920,
  7464960,
  7464960,
  0,
  monContainer7,
  384
);
const werewolf = new Monster(
  "Werewolf",
  179159040,
  89579520,
  89579520,
  0,
  monContainer8,
  1536
);
const golem = new Monster(
  "Golem",
  2149908480,
  1074954240,
  1074954240,
  0,
  monContainer9,
  6144
);
const troll = new Monster(
  "Troll",
  25798901760,
  29668737024,
  29668737024,
  0,
  monContainer10,
  36864
);

monContainer1
  .querySelector(".btn-levelup")
  .addEventListener("click", slime.buyLevel.bind(slime));
monContainer1
  .querySelector(".mon-name")
  .addEventListener("click", slime.clickMonster.bind(slime));
monContainer2
  .querySelector(".btn-levelup")
  .addEventListener("click", rat.buyLevel.bind(rat));
monContainer2
  .querySelector(".mon-name")
  .addEventListener("click", rat.clickMonster.bind(rat));
monContainer3
  .querySelector(".btn-levelup")
  .addEventListener("click", sprout.buyLevel.bind(sprout));
monContainer3
  .querySelector(".mon-name")
  .addEventListener("click", sprout.clickMonster.bind(sprout));
monContainer4
  .querySelector(".btn-levelup")
  .addEventListener("click", imp.buyLevel.bind(imp));
monContainer4
  .querySelector(".mon-name")
  .addEventListener("click", imp.clickMonster.bind(imp));
monContainer5
  .querySelector(".btn-levelup")
  .addEventListener("click", hawk.buyLevel.bind(hawk));
monContainer5
  .querySelector(".mon-name")
  .addEventListener("click", hawk.clickMonster.bind(hawk));
monContainer6
  .querySelector(".btn-levelup")
  .addEventListener("click", hound.buyLevel.bind(hound));
monContainer6
  .querySelector(".mon-name")
  .addEventListener("click", hound.clickMonster.bind(hound));
monContainer7
  .querySelector(".btn-levelup")
  .addEventListener("click", bear.buyLevel.bind(bear));
monContainer7
  .querySelector(".mon-name")
  .addEventListener("click", bear.clickMonster.bind(bear));
monContainer8
  .querySelector(".btn-levelup")
  .addEventListener("click", werewolf.buyLevel.bind(werewolf));
monContainer8
  .querySelector(".mon-name")
  .addEventListener("click", werewolf.clickMonster.bind(werewolf));
monContainer9
  .querySelector(".btn-levelup")
  .addEventListener("click", golem.buyLevel.bind(golem));
monContainer9
  .querySelector(".mon-name")
  .addEventListener("click", golem.clickMonster.bind(golem));
monContainer10
  .querySelector(".btn-levelup")
  .addEventListener("click", troll.buyLevel.bind(troll));
monContainer10
  .querySelector(".mon-name")
  .addEventListener("click", troll.clickMonster.bind(troll));
