import fs from "fs/promises";

const input = await fs.readFile("./day6/input.txt", "utf-8");

const lines = input.split("\n");

const timeDistances = [];

lines.forEach((line, index) => {
  const [_title, numsStr] = line.split(":");

  const nums = numsStr
    .trim()
    .replace(/\s+/g, "")
    .split(" ")
    .map((n) => parseInt(n));

  const key = index === 0 ? "time" : "distance";

  nums.forEach((n, index) => {
    if (!timeDistances[index]) {
      timeDistances[index] = {};
    }
    timeDistances[index][key] = n;
  });
});

console.log({ timeDistances });

const recordNums = timeDistances.map(({ time, distance }) => {
  let recordBeaterNum = 0;

  const holdingTimes = Array.from(Array(time - 1).keys()).map(
    (_, index) => index + 1
  );

  holdingTimes.forEach((holdingTime) => {
    const remainingTime = time - holdingTime;
    const currentDistance = remainingTime * holdingTime;
    // console.log({ currentDistance, holdingTime });
    if (currentDistance > distance) {
      recordBeaterNum++;
    }
  });
  return recordBeaterNum;
});

const total = recordNums.reduce((acc, record) => acc * record, 1);

console.log({ total });
