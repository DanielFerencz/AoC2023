const { readFile } = require("fs/promises");

const calculateDistances = (mapp) => {
    const stars = [];
    let num = 0;

    for (let i = 0; i < mapp.length; i++) {
        for (let j = 0; j < mapp[i].length; j++) {
            if (mapp[i][j] === "#") {
                stars.push({ x: i, y: j });
            }
        }
    }

    for (let i = 0; i < stars.length - 1; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            num +=
                Math.abs(stars[i].x - stars[j].x) +
                Math.abs(stars[i].y - stars[j].y);
        }
    }

    return num;
};

const main = async () => {
    const text = await readFile("./input.txt", "utf8");

    // console.log(text);

    let mapp = text.split("\n").map((line) => line.split(""));

    // let num = 0;

    // console.log(mapp);

    for (let i = 0; i < mapp.length; i++) {
        let empty = true;

        for (let j = 0; j < mapp[i].length && empty; j++) {
            if (mapp[i][j] !== ".") {
                empty = false;
            }
        }

        if (empty) {
            mapp.splice(i, 0, Array.from(".".repeat(mapp[i].length)));
            i++;
        }
    }

    console.log(mapp.map((val) => val.join("")));

    for (let j = 0; j < mapp[0].length; j++) {
        let empty = true;

        for (let i = 0; i < mapp.length && empty; i++) {
            if (mapp[i][j] !== ".") {
                empty = false;
            }
        }

        if (empty) {
            for (let i = 0; i < mapp.length; i++) {
                mapp[i].splice(j, 0, ".");
            }
            j++;
        }
    }

    console.log(mapp.map((val) => val.join("")));

    console.log(calculateDistances(mapp));
};

main();
