const { readFile } = require("fs/promises");

const isEnd = (where) => {
  for (let i = 0; i < where.length; i++) {
    if (where[i].at(2) !== "Z") {
      return false;
    }
  }
  return true;
};

function gcd(a, b) {
  if (b == 0) return a;
  return gcd(b, a % b);
}

// Returns LCM of array elements
function findlcm(arr, n) {
  // Initialize result
  let ans = arr[0];

  // ans contains LCM of arr[0], ..arr[i]
  // after i'th iteration,
  for (let i = 1; i < n; i++) ans = (arr[i] * ans) / gcd(arr[i], ans);

  return ans;
}

// Driver Code

// let arr = [ 2, 7, 3, 9, 4 ];
// let n = arr.length;
// document.write(findlcm(arr, n));

const main = async () => {
  const text = await readFile("./input.txt", "utf8");

  // console.log(text);

  const games = text.split("\n");

  const instructions = games[0];

  const elements = {};

  let where = [];

  for (let i = 2; i < games.length; i++) {
    const elem = games[i].split(" = ");

    if (elem[0].at(2) === "A") {
      where.push(elem[0]);
    }

    const LR = elem[1].split(", ");

    elements[elem[0]] = {
      L: LR[0].replace("(", ""),
      R: LR[1].replace(")", ""),
    };
  }

  let arr = [];

  for (let i = 0; i < where.length; i++) {
    num = 0;
    while (where[i].at(2) !== "Z") {
      where[i] = elements[where[i]][instructions[num % instructions.length]];
      num += 1;
    }
    arr.push(num);
  }

  console.log(findlcm(arr, arr.length));

  //   console.log(num);
};

main();
