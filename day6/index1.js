const { readFile } = require("fs/promises");

const main = async () => {
    const text = await readFile("./input.txt", "utf8");

    // console.log(text);

    const games = text.split("\r\n\r\n");

    console.log(games);

    const seeds = games[0]
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

    for (let i = 0; i < seeds.length; i++) {
        for (let j = 0; j < mappings.length; j++) {
            let ok = false;

            for (let k = 0; k < mappings[j].length && !ok; k++) {
                if (
                    seeds[i] >= mappings[j][k][1] &&
                    seeds[i] < mappings[j][k][1] + mappings[j][k][2]
                ) {
                    ok = true;
                    seeds[i] += mappings[j][k][0] - mappings[j][k][1];
                }
            }
        }

        if (seeds[i] < num) {
            num = seeds[i];
        }
    }

    console.log(mappings, seeds);

    console.log(num);
};

main();
