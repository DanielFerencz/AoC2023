const { readFile } = require("fs/promises");

const isNullArray = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== null) {
      return false;
    }
  }

  return true;
};

const getNextNum = (array) => {
  if (array.length === 1) return array[0];

  if (isNullArray(array)) return 0;

  let subs = [];

  for (let i = 0; i < array.length - 1; i++) {
    subs.push(array[i + 1] - array[i]);
  }

  const next = getNextNum(subs);

  return array[array.length - 1] + next;
};

const main = async () => {
  const text = await readFile("./input.txt", "utf8");

  // console.log(text);

  const sequences = text.split("\n");

  let num = 0;

  for (let i = 0; i < sequences.length; i++) {
    const array = sequences[i].split(" ").map((val) => parseInt(val, 10));

    num += getNextNum(array);
  }

  console.log(num);
};

main();
