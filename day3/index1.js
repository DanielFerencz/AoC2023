const { readFile } = require("fs/promises");

const isNum = (char) => {
  return "1234567890".includes(char);
};

const isSymbol = (char) => {
  return !"1234567890.".includes(char);
};

const hasSymbolNextToIt = (lineIdx, startIdx, endIdx, lines) => {
  let ok = false;

  if (startIdx > 0) {
    if (isSymbol(lines[lineIdx].at(startIdx - 1))) {
      return true;
    }
  }

  if (endIdx < lines[lineIdx].length) {
    if (isSymbol(lines[lineIdx].at(endIdx))) {
      return true;
    }
  }

  if (lineIdx > 0) {
    for (let k = startIdx - 1; k <= endIdx; k++) {
      if (k >= 0 && k < lines[lineIdx - 1].length) {
        if (isSymbol(lines[lineIdx - 1].at(k))) {
          return true;
        }
      }
    }
  }

  if (lineIdx < lines.length - 1) {
    for (let k = startIdx - 1; k <= endIdx; k++) {
      if (k >= 0 && k < lines[lineIdx + 1].length) {
        if (isSymbol(lines[lineIdx + 1].at(k))) {
          return true;
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
        if (hasSymbolNextToIt(i, j, endIdx, lines)) {
          console.log(parseInt(lines[i].substring(j, endIdx)));
          num += parseInt(lines[i].substring(j, endIdx));
        }
        j = endIdx - 1;
      }
    }
  }

  console.log(num);
};

main();
