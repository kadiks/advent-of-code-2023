import fs from "fs/promises";

const input = await fs.readFile("./day2/input.txt", "utf-8");
const lines = input.split("\n");

let total = 0;

const maxBalls = {
  red: 12,
  green: 13,
  blue: 14,
};

lines.forEach((line) => {
  const [gameName, ballGame] = line.split(":");
  const gameID = Number(gameName.replace("Game ", ""));

  let isValidGame = true;

  const ballParties = ballGame.split(";");

  ballParties.forEach((ballParty) => {
    const ballSets = ballParty.split(",");
    ballSets.forEach((ballSet) => {
      const ballColors = Object.keys(maxBalls);
      ballColors.forEach((color) => {
        if (ballSet.match(color)) {
          const num = Number(ballSet.replace(color, "").trim());
          if (num > maxBalls[color]) {
            isValidGame = false;
          }
        }
      });
    });
  });

  if (isValidGame) {
    // total = total + gameID;
    total += gameID
  }
});

console.log(total);
