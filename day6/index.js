const { readFile } = require("fs/promises");

const main = async () => {
  const text = await readFile("./input.txt", "utf8");

  // console.log(text);

  const games = text.split("\n");

  let num = 1;

  // console.log(games);

  const times = games[0].split(": ")[1].split(" ");
  const distances = games[1].split(": ")[1].split(" ");

  for (let i = 0; i < times.length; i++) {
    let possible = 0;

    for (let t = 1; t <= times[i] - 1; t++) {
      let dist = t * (times[i] - t);

      if (dist > distances[i]) {
        possible += 1;
      }
    }

    console.log(possible);

    num *= possible;
  }

  console.log(num);
};

main();
