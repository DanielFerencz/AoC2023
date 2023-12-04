const { readFile } = require("fs/promises");

const isNum = (char) => {
  return "1234567890".includes(char);
};

const isStar = (char) => {
  return "*" === char;
};

let stars = {};

const addNumToStar = (starI, starJ, n, num) => {
  if (stars[starI * n + starJ] === undefined) {
    stars[starI * n + starJ] = [num];
  } else {
    stars[starI * n + starJ].push(num);
  }
};

const toNum = (lineIdx, startIdx, endIdx, lines) => {
  return parseInt(lines[lineIdx].substring(startIdx, endIdx));
};

const hasSymbolNextToIt = (lineIdx, startIdx, endIdx, lines) => {
  let ok = false;

  if (startIdx > 0) {
    if (isStar(lines[lineIdx].at(startIdx - 1))) {
      addNumToStar(
        lineIdx,
        startIdx - 1,
        lines[lineIdx].length,
        toNum(lineIdx, startIdx, endIdx, lines)
      );
    }
  }

  if (endIdx < lines[lineIdx].length) {
    if (isStar(lines[lineIdx].at(endIdx))) {
      addNumToStar(
        lineIdx,
        endIdx,
        lines[lineIdx].length,
        toNum(lineIdx, startIdx, endIdx, lines)
      );
    }
  }

  if (lineIdx > 0) {
    for (let k = startIdx - 1; k <= endIdx; k++) {
      if (k >= 0 && k < lines[lineIdx - 1].length) {
        if (isStar(lines[lineIdx - 1].at(k))) {
          addNumToStar(
            lineIdx - 1,
            k,
            lines[lineIdx - 1].length,
            toNum(lineIdx, startIdx, endIdx, lines)
          );
        }
      }
    }
  }

  if (lineIdx < lines.length - 1) {
    for (let k = startIdx - 1; k <= endIdx; k++) {
      if (k >= 0 && k < lines[lineIdx + 1].length) {
        if (isStar(lines[lineIdx + 1].at(k))) {
          addNumToStar(
            lineIdx + 1,
            k,
            lines[lineIdx + 1].length,
            toNum(lineIdx, startIdx, endIdx, lines)
          );
        }
      }
    }
  }
};

const searchNum = (lineIdx, startIdx, lines) => {
  let ok = true;
  let endIdx = startIdx + 1;

  while (ok && endIdx < lines[lineIdx].length) {
    if (isNum(lines[lineIdx].at(endIdx))) {
      endIdx += 1;
    } else {
      ok = false;
    }
  }

  return endIdx;
};

const main = async () => {
  const text = await readFile("./input.txt", "utf8");

  const lines = text.split("\n");

  let num = 0;

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (isNum(lines[i].at(j))) {
        const endIdx = searchNum(i, j, lines);
        hasSymbolNextToIt(i, j, endIdx, lines);
        j = endIdx - 1;
      }
    }
  }

  console.log(stars);

  for (let val of Object.values(stars)) {
    if (val.length === 2) {
      num += val[0] * val[1];
    }
  }

  console.log(num);
};

main();
