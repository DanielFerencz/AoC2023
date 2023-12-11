const { readFile } = require("fs/promises");

const steps = {
  "|": [
    [-1, 0],
    [1, 0],
  ],
  "-": [
    [0, -1],
    [0, 1],
  ],
  F: [
    [0, 1],
    [1, 0],
  ],
  J: [
    [-1, 0],
    [0, -1],
  ],
  L: [
    [-1, 0],
    [0, 1],
  ],
  7: [
    [0, -1],
    [1, 0],
  ],
};

const searchStart = (mapp, x, y) => {
  if ("|7F".includes(mapp[x - 1][y])) {
    if ("|JL".includes(mapp[x + 1][y])) {
      return "|";
    }

    if ("-LF".includes(mapp[x][y - 1])) {
      return "J";
    }

    if ("-J7".includes(mapp[x][y + 1])) {
      return "L";
    }
  }

  if ("|JL".includes(mapp[x + 1][y])) {
    if ("|7F".includes(mapp[x - 1][y])) {
      return "|";
    }

    if ("-LF".includes(mapp[x][y - 1])) {
      return "7";
    }

    if ("-J7".includes(mapp[x][y + 1])) {
      return "F";
    }
  }

  if ("-LF".includes(mapp[x][y - 1])) {
    if ("|7F".includes(mapp[x - 1][y])) {
      return "J";
    }

    if ("|JL".includes(mapp[x + 1][y])) {
      return "7";
    }

    if ("-J7".includes(mapp[x][y + 1])) {
      return "-";
    }
  }

  if ("-J7".includes(mapp[x][y + 1])) {
    if ("|7F".includes(mapp[x - 1][y])) {
      return "L";
    }

    if ("|JL".includes(mapp[x + 1][y])) {
      return "F";
    }

    if ("-LF".includes(mapp[x][y - 1])) {
      return "-";
    }
  }

  return ".";
};

const main = async () => {
  const text = await readFile("./input.txt", "utf8");

  // console.log(text);

  const mapp = text.split("\n");

  let startX, startY;

  let x1, x2;
  let y1, y2;

  let num = 0;

  for (let i = 0; i < mapp.length; i++) {
    const start = mapp[i].indexOf("S");

    if (start > -1) {
      startX = i;
      startY = start;
      i = mapp.length;
    }
  }

  for (let i = 0; i < mapp.length; i++) {
    mapp[i] = mapp[i].split("");
  }

  const charr = searchStart(mapp, startX, startY);

  let ok = true;

  let nextSteps = steps[charr];

  x1 = nextSteps[0][0] + startX;
  y1 = nextSteps[0][1] + startY;

  x2 = nextSteps[1][0] + startX;
  y2 = nextSteps[1][1] + startY;

  mapp[startX][startY] = ".";

  while (ok) {
    num += 1;
    // console.log(mapp);

    // console.log(x1, y1);

    ok = false;

    const next1 = steps[mapp[x1][y1]];
    const next2 = steps[mapp[x2][y2]];

    if (mapp[x1 + next1[0][0]][y1 + next1[0][1]] !== ".") {
      mapp[x1][y1] = ".";
      x1 = x1 + next1[0][0];
      y1 = y1 + next1[0][1];
      ok = true;
    } else {
      if (mapp[x1 + next1[1][0]][y1 + next1[1][1]] !== ".") {
        mapp[x1][y1] = ".";
        x1 = x1 + next1[1][0];
        y1 = y1 + next1[1][1];
        ok = true;
      }
    }
    if (mapp[x2 + next2[0][0]][y2 + next2[0][1]] !== ".") {
      mapp[x2][y2] = ".";
      x2 = x2 + next2[0][0];
      y2 = y2 + next2[0][1];
      ok = true;
    } else {
      if (mapp[x2 + next2[1][0]][y2 + next2[1][1]] !== ".") {
        mapp[x2][y2] = ".";
        x2 = x2 + next2[1][0];
        y2 = y2 + next2[1][1];
        ok = true;
      }
    }
  }

  console.log(num);
};

main();
