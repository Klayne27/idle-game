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

  goldGain() {
    setInterval(() => {
      this.gold += totalGoldGain;
      goldDisplay.textContent = `Gold: 💰${this.gold.toFixed(2)}`; 
    }, 1000)
  }
};

player.goldGain()

class Monster {
  constructor(name, price, baseGoldDrop, goldDrop, level, elementContainer) {
    (this.name = name),
      (this.price = price),
      (this.baseGoldDrop = baseGoldDrop),
      (this.goldDrop = goldDrop),
      (this.level = level),
      (this.elementContainer = elementContainer);
  }

  buyLevel() {
    if (player.gold >= this.price) {
      player.gold -= this.price;
      this.level++;
      this.goldDrop += this.baseGoldDrop;
        totalGoldGain += this.baseGoldDrop
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
    monsterLevel.textContent = `${this.name} level ${this.level}`;
  }
}

const slime = new Monster("Slime", 4, 1, 0, 0, monContainer1);
const rat = new Monster("Rat", 60, 60, 0, 0, monContainer2);
const sprout = new Monster("Sprout", 720, 540, 540, 0, monContainer3);
const imp = new Monster("Imp", 8640, 4320, 4320, 0, monContainer4);
const hawk = new Monster("Hawk", 103680, 51840, 51840, 0, monContainer5);
const hound = new Monster("Hound", 1244160, 622080, 622080, 0, monContainer6);
const bear = new Monster("Bear", 14929920, 7464960, 7464960, 0, monContainer7);
const werewolf = new Monster(
  "Werewolf",
  179159040,
  89579520,
  89579520,
  0,
  monContainer8
);
const golem = new Monster(
  "Golem",
  2149908480,
  1074954240,
  1074954240,
  0,
  monContainer9
);
const troll = new Monster(
  "Troll",
  25798901760,
  29668737024,
  29668737024,
  0,
  monContainer10
);

monContainer1
  .querySelector(".btn-levelup")
  .addEventListener("click", slime.buyLevel.bind(slime));
monContainer2
  .querySelector(".btn-levelup")
  .addEventListener("click", rat.buyLevel.bind(rat));
monContainer3
  .querySelector(".btn-levelup")
  .addEventListener("click", sprout.buyLevel.bind(sprout));
monContainer4
  .querySelector(".btn-levelup")
  .addEventListener("click", imp.buyLevel.bind(imp));
monContainer5
  .querySelector(".btn-levelup")
  .addEventListener("click", hawk.buyLevel.bind(hawk));
monContainer6
  .querySelector(".btn-levelup")
  .addEventListener("click", hound.buyLevel.bind(hound));
monContainer7
  .querySelector(".btn-levelup")
  .addEventListener("click", bear.buyLevel.bind(bear));
monContainer8
  .querySelector(".btn-levelup")
  .addEventListener("click", werewolf.buyLevel.bind(werewolf));
monContainer9
  .querySelector(".btn-levelup")
  .addEventListener("click", golem.buyLevel.bind(golem));
monContainer10
  .querySelector(".btn-levelup")
  .addEventListener("click", troll.buyLevel.bind(troll));
