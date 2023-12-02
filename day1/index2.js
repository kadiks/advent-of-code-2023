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
const numbersAsString = [...Array(9).keys()].map(
  (_, index) => "" + (index + 1)
);

const getIndexAndNumberString = (line, searchNumber, actualNumber) => {
  let index = -1;
  let lastIndex = 0;
  const result = [];
  while (line.indexOf(searchNumber, lastIndex) !== -1) {
    result.push({
      position: line.indexOf(searchNumber, lastIndex),
      value: actualNumber,
    });
    index = lastIndex;
    lastIndex = index + 1;
  }
  return result;
};

const getWholeNumberFromLine = (line) => {
  let firstNumber;
  let lastNumber;

  const letters = numbersAsLetters.flatMap((letters, index) =>
    getIndexAndNumberString(line, letters, index + 1)
  );
  const numberStrings = numbersAsString.flatMap((numberString, index) =>
    getIndexAndNumberString(line, numberString, index + 1)
  );

  const result = letters
    .concat(numberStrings)
    .filter(({ position }) => position !== -1)
    .toSorted((a, b) => a.position - b.position);

  firstNumber = result[0].value;

  if (result.length > 1) {
    lastNumber = result[result.length - 1].value;
  }

  if (!lastNumber) {
    lastNumber = firstNumber;
  }
  const wholeNumber = Number(`${firstNumber}${lastNumber}`);

  // console.log({ line, wholeNumber });
  return wholeNumber;
};

lines.forEach((line) => {
  const wholeNumber = getWholeNumberFromLine(line);

  total += wholeNumber;
});

// Just to test specific lines that were buggy
console.log(getWholeNumberFromLine("skdpdfqtglzvlpqxp3twonelcr") === 31);
console.log(getWholeNumberFromLine("m5hxxkgoneqfgmhndbdslvrjrnk5five") === 55);
console.log(getWholeNumberFromLine("4fourztnthreeone8mqmdfour") === 44);

console.log(total);
