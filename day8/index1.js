const { readFile } = require("fs/promises");

const main = async () => {
  const text = await readFile("./input.txt", "utf8");

  // console.log(text);

  const games = text.split("\n");

  const instructions = games[0];

  const elements = {};

  for (let i = 2; i < games.length; i++) {
    const elem = games[i].split(" = ");

    const LR = elem[1].split(", ");

    elements[elem[0]] = {
      L: LR[0].replace("(", ""),
      R: LR[1].replace(")", ""),
    };
  }

  let num = 0;
  let where = "AAA";

  while (where !== "ZZZ") {
    where = elements[where][instructions[num % instructions.length]];
    num += 1;
  }

  console.log(num);
};

main();
