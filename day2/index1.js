const { readFile } = require("fs/promises");

const cubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const main = async () => {
  const text = await readFile("./input.txt", "utf8");

  const games = text.split("\n");

  let num = 0;

  for (let i = 0; i < games.length; i++) {
    let ok = true;
    const game = games[i].split(": ");

    const rounds = game[1].split("; ");

    for (let round of rounds) {
      let bags = round.split(", ");

      for (let bag of bags) {
        let cube = bag.split(" ");
        if (cubes[cube[1]] < parseInt(cube[0])) {
          ok = false;
        }
      }
    }

    if (ok) {
      console.log(i + 1);
      num += i + 1;
    }
  }

  console.log(num);
};

main();
