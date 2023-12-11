import fs from "fs/promises";

const input = await fs.readFile("./day7/input.txt", "utf-8");

const lines = input.split("\n");
console.time("algo");

const cardStrength = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

const getHandStrength = (hand) => {
  let strength = 0;
  const set = {};
  for (let cardIndex = 0; cardIndex < hand.length; cardIndex++) {
    const card = hand[cardIndex];
    if (!set[card]) {
      set[card] = 0;
    }
    set[card]++;
  }
  const values = Object.values(set);
  if (Math.max(...values) === 5) {
    strength = 7;
  } else if (Math.max(...values) === 4) {
    strength = 6;
  } else if (Math.max(...values) === 3 && Math.min(...values) === 2) {
    strength = 5;
  } else if (Math.max(...values) === 3 && Math.min(...values) === 1) {
    strength = 4;
  } else if (values.filter((v) => v === 2).length === 2) {
    strength = 3;
  } else if (values.filter((v) => v === 2).length === 1) {
    strength = 2;
  } else {
    strength = 1;
  }

  //   if (strength === 0 || strength === 1) {
  //     console.error(`Strength error for hand - ${strength}: ${hand}`);
  //   }

  return strength;
};
const compareTwoHands = (hand1, hand2) => {
  const strength1 = getHandStrength(hand1.hand);
  const strength2 = getHandStrength(hand2.hand);

  if (strength1 === strength2) {
    for (let cardIndex = 0; cardIndex < hand1.hand.length; cardIndex++) {
      const card1 = hand1.hand[cardIndex];
      const card2 = hand2.hand[cardIndex];
      if (card1 !== card2) {
        return cardStrength.indexOf(card2) - cardStrength.indexOf(card1);
      }
    }
  } else {
    return strength2 - strength1;
  }
};

const hands = lines.map((line) => {
  const [hand, bidStr] = line.split(" ");
  return {
    hand,
    bid: parseInt(bidStr),
  };
});

const sortedHands = hands.toSorted(compareTwoHands).reverse();
// const sortedHands = [].toSorted(compareTwoHands).reverse();

const total = sortedHands.reduce((acc, el, index) => {
  return acc + el.bid * (index + 1);
}, 0);

// console.log({ hands, sortedHands });

console.timeEnd("algo");
console.log(total);

console.log([{ hand: "A358J" }, { hand: "A2JK7" }].toSorted(compareTwoHands));
