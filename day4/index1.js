const { readFile } = require("fs/promises");

const main = async () => {
  const text = await readFile("./input.txt", "utf8");

  const games = text.split("\n");

  let num = 0;

  for (let i = 0; i < games.length; i++) {
    const game = games[i].split(": ");

    const cards = game[1].split(" | ");

    const winning = cards[0].split(" ");
    const all = cards[1].split(" ");

    let points = 0;

    for (let win of winning) {
      if (all.includes(win)) {
        if (points === 0) {
          points = 1;
        } else {
          points *= 2;
        }
      }
    }
    num += points;
  }

  console.log(num);
};

main();
