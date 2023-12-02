import fs from "fs/promises";

const input = await fs.readFile("./day2/input.txt", "utf-8");
const lines = input.split("\n");

let total = 0;

lines.forEach((line) => {
  const [, ballGame] = line.split(":");

  const ballsMin = {};

  const ballParties = ballGame.split(";");

  ballParties.forEach((ballParty) => {
    const ballSets = ballParty.split(",");
    ballSets.forEach((ballSet) => {
      const ballColors = ["red", "green", "blue"];
      ballColors.forEach((color) => {
        if (ballSet.match(color)) {
          const num = Number(ballSet.replace(color, "").trim());
          if (!ballsMin[color]) {
            ballsMin[color] = num;
          }
          if (num > ballsMin[color]) {
            ballsMin[color] = num;
          }
        }
      });
    });
  });

  const gamePower = Object.entries(ballsMin).reduce((acc, [color, min]) => {
    return acc * min;
  }, 1);

//   console.log({ ballGame, ballsMin, gamePower });

  total += gamePower;
});

console.log(total);
