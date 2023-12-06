import fs from "fs/promises";

console.time("algo");

const input = await fs.readFile("./day4/input.txt", "utf-8");
const lines = input.split("\n");


let total = 0;

const cardTotal = (winningNums, myNums) => {
  let subTotal = 0;
  winningNums.forEach((winningNum) => {
    if (myNums.includes(winningNum)) {
      if (subTotal === 0) {
        subTotal = 1;
      } else {
        subTotal = subTotal * 2;
      }
    }
  });

  return subTotal;
};

const getTotalCardFromCard = (cardNum, lines) => {
  const line = lines[cardNum - 1];

  let { winningNums, myNums } = parseLine(line);

  myNums = myNums.filter((myNum, index) => myNums.indexOf(myNum) === index);

  let subTotal = 0;
  winningNums.forEach((winningNum) => {
    if (myNums.includes(winningNum)) {
      subTotal++;
    }
  });
  //   console.log({ subTotal, line });

  return Array.from(Array(subTotal).keys()).map(
    (_, index) => index + 1 + cardNum
  );
};

const hasMatch = (cardNum, lines, matchNum = 0) => {
  const line = lines[cardNum - 1];

  let { winningNums, myNums } = parseLine(line);

  let subTotal = 0;
  winningNums.forEach((winningNum) => {
    if (myNums.includes(winningNum)) {
      subTotal++;
    }
  });

  console.log({ subTotal });
  console.log(line);
  console.table({ winningNums, myNums });

  return subTotal > matchNum;
};

const parseLine = (line) => {
  const [cardStr, nums] = line.split(": ");
  const cardNum = parseInt(cardStr.replace("Card ", ""));
  const [winningNumsStr, myNumsStr] = nums.split(" | ");
  const winningNums = winningNumsStr
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((n) => parseInt(n))
    .sort((a, b) => a - b);
  const myNums = myNumsStr
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((n) => parseInt(n))
    .sort((a, b) => a - b);

  return {
    cardNum,
    myNums,
    winningNums,
    played: 0,
  };
};

// lines.forEach((line) => {
//   // const { cardNum, myNums, winningNums } = parseLine(line);
//   //   const subTotal = cardTotal(winningNums, myNums);
// });
let games = Array.from(Array(lines.length).keys()).map((_, index) => index + 1);
// console.log({ games: JSON.stringify(games) })

while (games.length > 0) {
  const cardNum = games.shift();
  // console.log(games.length);
  total++;
  games = games.concat(getTotalCardFromCard(cardNum, lines));
}

// console.log(hasMatch(1, lines, 0));

console.timeEnd("algo");

console.log(total);

// console.log(getTotalCardFromCard(1, lines));
