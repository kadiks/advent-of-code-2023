import fs from "fs/promises";

const input = await fs.readFile("./day10/input2.txt", "utf-8");

const lines = input.split("\n");
console.time("algo");

let total = 0;
let sPos = {};

const table = [];
const numTable = [];

lines.forEach((line, rowIndex) => {
  const row = [];

  line.split("").forEach((char, colIndex) => {
    switch (char) {
      case ".":
        row.push(null);
        break;
      case "L":
        row.push({ char, prevDir: { "y+1": "x+1", "x-1": "y-1" } });
        break;
      case "-":
        row.push({ char, prevDir: { "x+1": "x+1", "x-1": "x-1" } });
        break;
      case "|":
        row.push({ char, prevDir: { "y-1": "y+1", "y+1": "y-1" } });
        break;
      case "7":
        row.push({ char, prevDir: { "x+1": "y+1", "y-1": "x-1" } });
        break;
      case "J":
        row.push({ char, prevDir: { "y+1": "x-1", "x+1": "y-1" } });
        break;
      case "F":
        row.push({ char, prevDir: { "x-1": "y+1", "y-1": "x+1" } });
        break;
      default:
        row.push({ char, prevDir: { "x+1": "x+1", "y+1": "y+1" } });
        break;
    }
    if (char === "S") {
      sPos = {
        x: colIndex,
        y: rowIndex,
      };
    }
  });

  table.push([...row]);
  numTable.push([...row]);
});

numTable[sPos.y][sPos.x] = 0;

let pointerBranches = [{ ...sPos }, { ...sPos }];

let prevElsAtPointer = pointerBranches.map(
  (pointer) => table[pointer.y][pointer.x]
);

console.table(numTable);
console.table(table);
console.log(prevElsAtPointer);

// console.log(prevElsAtPointer);
// input2
pointerBranches[0].y++;
pointerBranches[1].x++;
let prevDirs = ["y+1", "x+1"];
let counterBranches = [0, 0];
// // input3
// prevElsAtPointer[0].y++;
// prevElsAtPointer[1].x++;
// // input
// prevElsAtPointer[0].y++;
// prevElsAtPointer[1].x--;

while (
  pointerBranches[0].x !== sPos.x &&
  pointerBranches[0].y !== sPos.y &&
  pointerBranches[1].x !== sPos.x &&
  pointerBranches[1].y !== sPos.y
) {
  pointerBranches.forEach((pointer, pointerIndex) => {
    const elAtPointer = table[pointer.y][pointer.x];
    const prevNextDir = elAtPointer.prevDir[prevDir];
    if (prevNextDir) {
      const [dir, sign] = prevNextDir.split("");
      pointer[dir] = pointer[dir] + eval(sign) + 1;
      prevDirs[pointerIndex] = prevNextDir;
      counterBranches[pointerIndex]++;
      numTable[pointer.y][pointer.x] = counterBranches[pointerIndex];
    } else {
      console.log({
        msg: "ERROR",
        pointer,
        prevDir,
        prevElAtPointer,
        elAtPointer,
      });
      process.exit(1);
    }
  });
}

console.table(table);
console.table(numTable);

console.timeEnd("algo");
console.log({ total, pointerBranches });
