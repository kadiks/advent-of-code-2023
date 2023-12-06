import fs from "fs/promises";

const input = await fs.readFile("./day5/input.txt", "utf-8");

const matchTitleGroup = /[\w -]+map:/gi;
const matchGroupRegex = /[\w -]+map:\s([\d \s]+)/gi;

const matches = input.match(matchGroupRegex);

const groups = matches.map((match) => {
  const mapDataStr = match.replace(matchTitleGroup, "").trim().split("\n");
  const mapData = mapDataStr.map((d) =>
    d
      .replace(/\s+/g, " ")
      .split(" ")
      .map((n) => parseInt(n))
  );

  return mapData;
});

const seeds = input
  .split("\n")[0]
  .replace("seeds: ", "")
  .replace(/\s+/g, " ")
  .split(" ")
  .flatMap((n, index, arr) => {
    if (index % 2 === 0) {
      const range = parseInt(arr[index + 1]);
      const a = Array.from(Array(range).keys(range)).map(
        (_, index) => index + parseInt(n)
      );
      return a;
    } else {
      return [];
    }
  })
  .reduce((acc, el) => ({ ...acc, [el]: el }), {});
// const seeds = { 14: 14 };

// console.log({ groups, seeds });

// process.exit();

const getMap = (ranges, seeds) => {
  // console.log({ seeds });
  const map = {};
  ranges.forEach(([destStart, sourceStart, rangeLength]) => {
    // const arr = Array.from(Array(rangeLength).keys()).map(
    //   (_, index) => index + rangeLength
    // );

    Object.values(seeds).forEach((seed) => {
      const minRange = sourceStart;
      const maxRange = sourceStart + rangeLength - 1;

      if (seed >= minRange && seed <= maxRange) {
        map[seed] = destStart + seed - minRange;
      }
    });
    // console.log({ map });

    Object.values(seeds)
      .filter(
        (seed) =>
          !Object.keys(map)
            .map((n) => parseInt(n))
            .includes(seed)
      )
      .forEach((seed) => {
        map[seed] = seed;
      });
  });
  //   console.log({ map });
  return map;
};

let currentSeed = seeds;
for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
  const currentGroup = groups[groupIndex];
  currentSeed = getMap(currentGroup, currentSeed);
  console.log(currentSeed);
}

console.log(Object.values(currentSeed).sort((a, b) => a - b)[0]);
