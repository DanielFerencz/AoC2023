const { readFile } = require("fs/promises");

const isEmptyRow = (row) => {
    for (let i = 0; i < row.length; i++) {
        if (row[i] !== "*") return false;
    }
    return true;
};

const calculateDistances = (mapp) => {
    const stars = [];
    let num = 0;

    let howManyX = 0;

    for (let i = 0; i < mapp.length; i++) {
        let howManyY = 0;

        if (isEmptyRow(mapp[i])) {
            howManyX += 1;
        } else {
            for (let j = 0; j < mapp[i].length; j++) {
                if (mapp[i][j] === "*") {
                    howManyY += 1;
                }

                if (mapp[i][j] === "#") {
                    stars.push({
                        x: i + howManyX * 999999,
                        y: j + howManyY * 999999,
                    });
                }
            }
        }
    }

    // console.log(stars);

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
            mapp.splice(i, 1, Array.from("*".repeat(mapp[i].length)));
        }
    }

    for (let j = 0; j < mapp[0].length; j++) {
        let empty = true;

        for (let i = 0; i < mapp.length && empty; i++) {
            if (mapp[i][j] === "#") {
                empty = false;
            }
        }

        if (empty) {
            for (let i = 0; i < mapp.length; i++) {
                mapp[i][j] = "*";
            }
        }
    }

    // process.stdout.write(JSON.stringify(mapp.map((val) => val.length)) + "\n");

    console.log(calculateDistances(mapp));
};

main();
