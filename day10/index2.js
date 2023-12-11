const { readFile } = require("fs/promises");

const steps = {
    "|": [
        [-1, 0],
        [1, 0],
    ],
    "-": [
        [0, -1],
        [0, 1],
    ],
    F: [
        [0, 1],
        [1, 0],
    ],
    J: [
        [-1, 0],
        [0, -1],
    ],
    L: [
        [-1, 0],
        [0, 1],
    ],
    7: [
        [0, -1],
        [1, 0],
    ],
};

const searchStart = (mapp, x, y) => {
    if (x > 0 && "|7F".includes(mapp[x - 1][y])) {
        if ("|JL".includes(mapp[x + 1][y])) {
            return "|";
        }

        if (y > 0 && "-LF".includes(mapp[x][y - 1])) {
            return "J";
        }

        if ("-J7".includes(mapp[x][y + 1])) {
            return "L";
        }
    }

    if ("|JL".includes(mapp[x + 1][y])) {
        if (x > 0 && "|7F".includes(mapp[x - 1][y])) {
            return "|";
        }

        if (y > 0 && "-LF".includes(mapp[x][y - 1])) {
            return "7";
        }

        if ("-J7".includes(mapp[x][y + 1])) {
            return "F";
        }
    }

    if (y > 0 && "-LF".includes(mapp[x][y - 1])) {
        if (x > 0 && "|7F".includes(mapp[x - 1][y])) {
            return "J";
        }

        if ("|JL".includes(mapp[x + 1][y])) {
            return "7";
        }

        if ("-J7".includes(mapp[x][y + 1])) {
            return "-";
        }
    }

    if ("-J7".includes(mapp[x][y + 1])) {
        if (x > 0 && "|7F".includes(mapp[x - 1][y])) {
            return "L";
        }

        if ("|JL".includes(mapp[x + 1][y])) {
            return "F";
        }

        if (y > 0 && "-LF".includes(mapp[x][y - 1])) {
            return "-";
        }
    }

    return ".";
};

const nextt = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
];

const dfs = (mapp, i, j) => {
    if (i < 0 || i >= mapp.length) return "Y";
    if (j < 0 || j >= mapp[0].length) return "Y";

    switch (mapp[i][j]) {
        case "V":
            return "V";
        case "X":
            return "V";
        case "Y":
            return "Y";
        default: {
            mapp[i][j] = "V";
            for (let step of nextt) {
                const type = dfs(mapp, i + step[0], j + step[1]);

                if (type === "Y") {
                    mapp[i][j] = "Y";
                    return "Y";
                }
            }

            return "V";
        }
    }
};

const searchSurroundedFields = (mapp) => {
    for (let i = 0; i < mapp.length; i++) {
        for (let j = 0; j < mapp[i].length; j++) {
            if (!"XY".includes(mapp[i][j])) {
                dfs(mapp, i, j);
            }
        }
    }
};

const main = async () => {
    const text = await readFile("./input1.txt", "utf8");

    // console.log(text);

    const mapp = text.split("\n");

    let startX, startY;

    let x1, x2;
    let y1, y2;

    for (let i = 0; i < mapp.length; i++) {
        const start = mapp[i].indexOf("S");

        if (start > -1) {
            startX = i;
            startY = start;
            i = mapp.length;
        }
    }

    for (let i = 0; i < mapp.length; i++) {
        mapp[i] = mapp[i].split("");
    }

    const charr = searchStart(mapp, startX, startY);

    let ok = true;

    let nextSteps = steps[charr];

    x1 = nextSteps[0][0] + startX;
    y1 = nextSteps[0][1] + startY;

    x2 = nextSteps[1][0] + startX;
    y2 = nextSteps[1][1] + startY;

    mapp[startX][startY] = "X";

    while (ok) {
        // console.log(mapp);

        // console.log(x1, y1);

        ok = false;

        const next1 = steps[mapp[x1][y1]];
        const next2 = steps[mapp[x2][y2]];

        if (!".X".includes(mapp[x1 + next1[0][0]][y1 + next1[0][1]])) {
            mapp[x1][y1] = "X";
            x1 = x1 + next1[0][0];
            y1 = y1 + next1[0][1];
            ok = true;
        } else {
            if (!".X".includes(mapp[x1 + next1[1][0]][y1 + next1[1][1]])) {
                mapp[x1][y1] = "X";
                x1 = x1 + next1[1][0];
                y1 = y1 + next1[1][1];
                ok = true;
            }
        }
        if (!".X".includes(mapp[x2 + next2[0][0]][y2 + next2[0][1]])) {
            mapp[x2][y2] = "X";
            x2 = x2 + next2[0][0];
            y2 = y2 + next2[0][1];
            ok = true;
        } else {
            if (!".X".includes(mapp[x2 + next2[1][0]][y2 + next2[1][1]])) {
                mapp[x2][y2] = "X";
                x2 = x2 + next2[1][0];
                y2 = y2 + next2[1][1];
                ok = true;
            }
        }
    }

    mapp[x1][y1] = "X";
    mapp[x2][y2] = "X";

    console.log(mapp);

    for (let i = 0; i < mapp.length; i++) {
        mapp.splice(i, 0, Array.from("l".repeat(mapp[i].length)));
        i += 2;
        mapp.splice(i, 0, Array.from("l".repeat(mapp[i - 2].length)));

        for (let j = 0; j < mapp[i].length; j++) {
            mapp[i - 2].splice(j, 0, "l");
            mapp[i - 1].splice(j, 0, "l");
            mapp[i].splice(j, 0, "l");

            j += 2;

            mapp[i - 2].splice(j, 0, "l");
            mapp[i - 1].splice(j, 0, "l");
            mapp[i].splice(j, 0, "l");
        }
    }

    // for (let j = 0; j < mapp[0].length; j++) {
    //     for (let i = 0; i < mapp.length; i++) {
    //         mapp[i].splice(j, 0, Array.from("l".repeat(mapp[i].length)));
    //         i += 2;
    //         mapp[i].splice(j, 0, Array.from("l".repeat(mapp[i].length)));
    //     }
    // }

    searchSurroundedFields(mapp);

    let num = 0;

    for (let i = 1; i < mapp.length; i += 3) {
        for (let j = 1; j < mapp[i].length; j += 3) {
            if (mapp[i][j] === "V") {
                num += 1;
            }
        }
    }

    console.log(mapp.map((val) => val.join("")));
    console.log(num);
};

main();
