const { readFile } = require("fs/promises");

const main = async () => {
  const text = await readFile("./input.txt", "utf8");

  // console.log(text);

  const mapp = text.split("\n");

  let num = 0;

  for (let i = 0; i < mapp.length; i++) {}

  console.log(num);
};

main();
