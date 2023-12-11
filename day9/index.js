import fs from "fs/promises";

const input = await fs.readFile("./day9/input.txt", "utf-8");

const lines = input.split("\n");
console.time("algo");

let total = 0;

lines.forEach((line) => {
  const nums = line
    .replace(/\s+/, " ")
    .trim()
    .split(" ")
    .map((n) => parseInt(n));
  let sumSequenceIsZero = false;
  const sequences = [[...nums]];
  while (!sumSequenceIsZero) {
    const latestSequence = sequences[sequences.length - 1];
    const nextSequence = latestSequence.reduce((acc, el, index, arr) => {
      if (index === 0) return [];
      return [...acc, el - arr[index - 1]];
    }, []);
    sequences.push(nextSequence);
    sumSequenceIsZero = nextSequence.every((n) => n === 0);
  }
  const rSequences = sequences.reverse();
  for (
    let sequenceIndex = 1;
    sequenceIndex < rSequences.length;
    sequenceIndex++
  ) {
    const prevSequence = rSequences[sequenceIndex - 1];
    const currSequence = rSequences[sequenceIndex];
    const lastItemPrevSequence = prevSequence[prevSequence.length - 1];
    currSequence.push(
      currSequence[currSequence.length - 1] + lastItemPrevSequence
    );
  }
  const lastNum = rSequences.reverse()[0].reverse()[0];

  total += lastNum;
});

console.timeEnd("algo");

console.log({ total });
