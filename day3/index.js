import fs from "fs/promises";

const input = await fs.readFile("./day3/input3.txt", "utf-8");
const lines = input.split("\n");

let total = 0;

const numPositions = [];
const symPositions = [];

const squareAround = [
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: 0 },
  { x: -1, y: -1 },
];

const engineAsArray = [];

const addToNumPosition = (curNum) => {};

lines.forEach((line, y) => {
  // transform whole input into array of [4, 6, 7, undefined, undefined, 1, 1, 4, undefined, undefined]
  engineAsArray.push([]);
  let curNum = "";
  for (let charIndex = 0; charIndex < line.length; charIndex++) {
    const curChar = line[charIndex];
    const nextChar = line[charIndex + 1];
    const nextCharNotANumber = !isNaN(nextChar);
    engineAsArray[y].push(
      !isNaN(curChar) ? Number(curChar) : curChar !== "." ? curChar : undefined
    );
    if (!isNaN(curChar)) {
      curNum += curChar;
      if (!nextCharNotANumber) {
        const actualNum = Number(curNum);
        // console.log({ curNum, actualNum });
        if (actualNum !== 0) {
          numPositions.push({
            position: { x: charIndex - curNum.length + 1, y },
            value: actualNum,
            length: curNum.length,
          });
        }
        curNum = "";
      }
    } else {
      // recreate full number
      // and add to beginning position of that full number in array
      // . . 4 6 7 ==> {value: 467, position: {x: 2, y: 0}, length: 3}
      if (curChar !== ".") {
        symPositions.push({
          value: curChar,
          position: { x: charIndex, y },
        });
      }
    }
  }
});

// find numbers around symbol
const numSelectedWithPositions = [];
symPositions.forEach(({ position }) => {
  squareAround.forEach(({ x, y }) => {
    const searchPosition = { x: position.x + x, y: position.y + y };
    // if number found, walk back until first number index (to match the numPositions x value)
    if (
      engineAsArray[searchPosition.y] &&
      !isNaN(engineAsArray[searchPosition.y][searchPosition.x])
    ) {
      let curX = searchPosition.x;
    //   console.log("ffound positin", {
    //     searchPosition,
    //     num: engineAsArray[searchPosition.y][searchPosition.x],
    //   });
      while (!isNaN(engineAsArray[searchPosition.y][curX])) {
        curX--;
      }
      curX++;
      const foundPosition = numPositions.find(
        (n) => n.position.x === curX && n.position.y === searchPosition.y
      );
      if (foundPosition) {
        const indexInSelected = numSelectedWithPositions.findIndex(
          (numSelectedWithPosition) => {
            // console.log({ numSelectedWithPosition });
            const { position } = numSelectedWithPosition;
            return (
              position.x === foundPosition.position.x &&
              position.y === foundPosition.position.y
            );
          }
        );
        // console.log({ curX, foundPosition, indexInSelected });
        if (indexInSelected === -1) {
          numSelectedWithPositions.push(foundPosition);
        }
      }
    }
  });
});

console.table(engineAsArray);
// console.log({
//   symPositions,
//   numPositions,
//   numSelectedWithPositions,
//   ok: numPositions[0],
// });
total += numSelectedWithPositions.reduce((acc, { value }) => acc + value, 0);

console.log(total);
