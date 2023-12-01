const { readFile } = require("fs/promises");

const main = async () => {
  const text = await readFile("./input.txt", "utf8");

  const texts = text.split("\n");

  let num = 0;

  for (let i = 0; i < texts.length; i++) {
    texts[i] = texts[i].replace(/[^0-9]/g, "");
    // console.log(parseInt(`${texts[i].at(0)}${texts[i].at(-1)}`, 10));
    num = num + parseInt(`${texts[i].at(0)}${texts[i].at(-1)}`, 10);
  }

  console.log(num);
};

main();
