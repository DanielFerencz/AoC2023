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
    let cubes = {
      red: 0,
      green: 0,
      blue: 0,
    };

    const game = games[i].split(": ");

    const rounds = game[1].split("; ");

    for (let round of rounds) {
      let bags = round.split(", ");

      for (let bag of bags) {
        let cube = bag.split(" ");
        if (cubes[cube[1]] < parseInt(cube[0])) {
          cubes[cube[1]] = parseInt(cube[0]);
        }
      }
    }

    num += cubes.red * cubes.green * cubes.blue;
  }

  console.log(num);
};

main();
