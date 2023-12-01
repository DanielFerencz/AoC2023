const { readFile } = require("fs/promises");

const nums = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
};

const main = async () => {
  const text = await readFile("./input.txt", "utf8");

  const texts = text.split("\n");

  let num = 0;

  for (let i = 0; i < texts.length; i++) {
    let firstIndex = texts[i].length;
    let firstNum = 0;
    let lastIndex = -1;
    let lastNum = 0;

    for (let key of Object.keys(nums)) {
      const fidx = texts[i].indexOf(key);
      const lidx = texts[i].lastIndexOf(key);

      if (fidx != -1 && fidx < firstIndex) {
        firstIndex = fidx;
        firstNum = nums[key];
      }

      if (lidx != -1 && lidx > lastIndex) {
        lastIndex = lidx;
        lastNum = nums[key];
      }
    }
    const n = firstNum * 10 + lastNum;
    num = num + n;
  }

  console.log(num);
};

main();
