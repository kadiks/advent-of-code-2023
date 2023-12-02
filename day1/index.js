import fs from "fs/promises";

const input = await fs.readFile("./day1/input.txt", "utf-8");
const lines = input.split("\n");

let total = 0;

const numbersAsLetters = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const numbersAsString = [...Array(9).keys()].map((_, index) => '' + (index + 1))

lines.forEach((line) => {
  let firstNumber;
  let lastNumber;
  for (let i = 0; i < line.length; i++) {
    const currentChar = line[i];
    if (!isNaN(Number(currentChar))) {
      if (!firstNumber) {
        firstNumber = Number(currentChar);
      } else {
        lastNumber = Number(currentChar);
      }
    }
  }
  const hasNumberAsLetters = numbersAsLetters.every()
  if (!lastNumber) {
    lastNumber = firstNumber;
  }
  const wholeNumber = Number(`${firstNumber}${lastNumber}`);

  total += wholeNumber;
});

console.log(total);
