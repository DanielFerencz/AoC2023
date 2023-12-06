const { readFile } = require("fs/promises");

const main = async () => {
    const text = await readFile("./input.txt", "utf8");

    // console.log(text);

    const games = text.split("\r\n\r\n");

    // console.log(games);

    let newSeeds = games[0]
        .split(": ")[1]
        .split(" ")
        .map((val) => parseInt(val, 10));

    let num = Infinity;

    let mappings = [];

    for (let i = 1; i < games.length; i++) {
        const mapping = games[i].split("\n");

        const oneMap = [];

        for (let j = 1; j < mapping.length; j++) {
            oneMap.push(mapping[j].split(" ").map((val) => parseInt(val, 10)));
        }

        mappings.push(oneMap);
    }

    // let seeds = [];

    for (let i = 0; i < newSeeds.length; i += 2) {
        console.log(i);
        for (let l = 0; l < newSeeds[i + 1]; l++) {
            let seed = newSeeds[i] + l;

            for (let j = 0; j < mappings.length; j++) {
                let ok = false;

                for (let k = 0; k < mappings[j].length && !ok; k++) {
                    if (
                        seed >= mappings[j][k][1] &&
                        seed < mappings[j][k][1] + mappings[j][k][2]
                    ) {
                        ok = true;
                        seed += mappings[j][k][0] - mappings[j][k][1];
                    }
                }
            }

            if (seed < num) {
                num = seed;
            }
        }
    }

    // for (let i = 0; i < seeds.length; i++) {}

    // console.log(mappings, seeds);

    console.log(num);
};

main();
