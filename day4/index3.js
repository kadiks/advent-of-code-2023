import fs from "fs/promises";

const input = await fs.readFile("./day4/input.txt", "utf-8");
const lines = input.split("\n");

console.time('algo')

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
    played: 1,
  };
};

// lines.forEach((line) => {
//   // const { cardNum, myNums, winningNums } = parseLine(line);
//   //   const subTotal = cardTotal(winningNums, myNums);
// });
let games = Array.from(Array(lines.length).keys()).map((_, index) => index + 1);
// console.log({ games: JSON.stringify(games) })

const playedGames = games.map((cardNum, index) => parseLine(lines[index]));
playedGames.forEach((game, index) => {
  const cardNum = index + 1;

  const cards = Array.from(Array(game.played).keys()).flatMap(
    () => getTotalCardFromCard(cardNum, lines)
  );
  cards.map((cardNum) => {
    playedGames[cardNum - 1].played++;
  });
});
// console.table(playedGames);
console.timeEnd('algo')
console.log(
  "total",
  playedGames.reduce((acc, g) => acc + g.played, 0)
);

// while (games.length > 0) {
//   const cardNum = games.shift();
//   // console.log(games.length);
//   total++;
//   games = games.concat(getTotalCardFromCard(cardNum, lines));
// }

// games.forEach((cardNum) => {
//   const line = lines[cardNum - 1];
//   const { winningNums, myNums } = parseLine(line);
//   const isEveryNum1 = winningNums.some((n) => n <= 0 || n >= 100);
//   const isEveryNum2 = myNums.some((n) => n <= 0 || n >= 100);
//   if (isEveryNum1 || isEveryNum2) {
//     console.log("some over 100", { line, winningNums, myNums });
//   }
// });

// console.log(hasMatch(1, lines, 0));

// console.log(total);

// console.log(getTotalCardFromCard(1, lines));
