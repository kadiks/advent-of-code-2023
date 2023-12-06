import fs from "fs/promises";

const input = await fs.readFile("./day4/input.txt", "utf-8");
const lines = input.split("\n");

let total = 0;

lines.forEach((line) => {
  const [, nums] = line.split(": ");
  const [winningNumsStr, myNumsStr] = nums.split(" | ");
  const winningNums = winningNumsStr
    .trim()
    .split(" ")
    .map((n) => parseInt(n));
  const myNums = myNumsStr
    .trim()
    .split(" ")
    .map((n) => parseInt(n));

  // console.log(winningNums, myNums)

  const noDuplicatesMyNums = myNums.filter(
    (myNum, index) => myNums.indexOf(myNum) === index
  );

  let subTotal = 0;
  winningNums.forEach((winningNum) => {
    if (noDuplicatesMyNums.includes(winningNum)) {
      if (subTotal === 0) {
        subTotal = 1;
      } else {
        subTotal = subTotal * 2;
      }
    }
  });
  
  // console.log(subTotal);

  total += subTotal;
});

console.log(total);
