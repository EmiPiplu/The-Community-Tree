//Lets try make an actual functioning tree here. i know its called a clusterfuck but i want it to at least be a functional clusterfuck.
// if you break something then either fix it or delete whatever causes the issue. like i said i want this to be able to function

addLayer("c", {
  name: "creativity", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      thing: new Decimal(0)
    };
  },
  color: "#42f5d4",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "creativity", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    if (hasUpgrade("c", 17)) {
      mult = mult.mul(2);
    }
    return mult;
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  thingMult() {
    var mult = new Decimal(1);
  },
  row: 0, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    {
      key: "c",
      description: "Reset for creativity",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      }
    }
  ],
  layerShown() {
    return true;
  },
  upgrades: {
    rows: 9,
    cols: 9,
    11: {
      title: "Actually Earn Stuff",
      description: "Gain 1 points per second.",
      unlocked() {
        return player[this.layer].unlocked;
      },
      cost: new Decimal(1)
    },
    12: {
      title: "Is this B A L A N C E D ?",
      description: "Gain 0.1 points per second for every creativity.",
      unlocked() {
        return hasUpgrade(this.layer, 11);
      },
      cost: new Decimal(2)
    },
    13: {
      title: "Is this also B A L A N C E D ?", // No i dont think so.
      description: "Gain 0.05 extra points per second for every creativity.",
      unlocked() {
        return hasUpgrade(this.layer, 12);
      },
      cost: new Decimal(3)
    },
    14: {
      title: "Not too B A L A N C E D", // No i dont think so.
      description: "Double point gain.",
      unlocked() {
        return hasUpgrade(this.layer, 13);
      },
      cost: new Decimal(5)
    },
    15: {
      title: "Enough balance, let's make stuff.",
      description: "Double point gain. Again.",
      unlocked() {
        return hasUpgrade(this.layer, 14);
      },
      cost: new Decimal(25)
    },
    16: {
      title: "Who needs balance?",
      description: "Triple point gain this time.",
      unlocked() {
        return hasUpgrade(this.layer, 15);
      },
      cost: new Decimal(75)
    },
    17: {
      title: "We Aren't broken yet?",
      description: "Double Creativity Gain",
      unlocked() {
        return hasUpgrade(this.layer, 16);
      },
      cost: new Decimal(150)
    },
    18: {
      title: "[PLACEHOLDER] This game was always broken.",
      description: "Double Creativity gain. Again.",
      unlocked() { return (hasUpgrade(this.layer, 17))},
      cost: new Decimal("10^^10"), //NOT actual cost
    },
    19: {
      title: "Break this world.",
      description: "Unlock a new prestige layer.",
      unlocked() { return (hasUpgrade(this.layer, 18))},
      cost: new Decimal("10^^10"), //NOT actual cost
    },
  },
  update(diff) {
    if (hasUpgrade("c", 21))
      player.c.thing.add(
        new Decimal(diff).times(layers[this.layer].thingMult())
      );
  }
});

addLayer("wf", {
  name: "world fragments", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "WF", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
      thing: new Decimal(0)
    };
  },
  color: "#00ffff",
  requires: new Decimal("10^^10"), // Can be a function that takes requirement increases into account
  resource: "world fragments", // Name of prestige currency
  baseResource: "creativity", // Name of resource prestige is based on
  baseAmount() {
    return player.c.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    return mult;
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  thingMult() {
    var mult = new Decimal(1);
  },
  row: 1, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    {
      key: "c",
      description: "Reset for creativity",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      }
    }
  ],
  layerShown() {
    return true;
  },
  upgrades: {
    rows: 9,
    cols: 9,
    11: {
      title: "haha lightbulb go ding",
      description: "Gain x4 creativity per second. (Currently does nothing.)",
      unlocked() {
        return player[this.layer].unlocked;
      },
      cost: new Decimal(1) //Actual cost.
    },
    12: {
      title: "haha lightbulb go ding again",
      description: "Unlock a new row of creativity upgrades. (9 new upgrades!) (Currently does nothing.)",
      unlocked() {
        return player[this.layer].unlocked;
      },
      cost: new Decimal(3) //Actual cost.
    },
  },
  update(diff) {
        new Decimal(diff).times(layers[this.layer].thingMult())
  }
});
