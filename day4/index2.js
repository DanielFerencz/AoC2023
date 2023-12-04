const { readFile } = require("fs/promises");

const main = async () => {
  const text = await readFile("./input.txt", "utf8");

  const games = text.split("\n");

  let gameNr = [];

  for (let i = 0; i < games.length; i++) {
    gameNr.push(1);
  }

  let num = 0;

  for (let i = 0; i < games.length; i++) {
    const game = games[i].split(": ");

    const cards = game[1].split(" | ");

    const winning = cards[0].split(" ");
    const all = cards[1].split(" ");

    let points = 0;

    for (let win of winning) {
      if (all.includes(win)) {
        points += 1;
      }
    }

    for (let j = 1; j <= points; j++) {
      if (j + i < games.length) {
        gameNr[i + j] += gameNr[i];
      }
    }

    num += gameNr[i];
  }

  console.log(num);
};

main();
