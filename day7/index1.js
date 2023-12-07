const { readFile } = require("fs/promises");

cards = {
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5,
    7: 6,
    8: 7,
    9: 8,
    T: 9,
    J: 10,
    Q: 11,
    K: 12,
    A: 13,
};

const higherFirst = (a, b) => {
    for (let i = 0; i < 5; i++) {
        if (cards[a.at(i)] > cards[b.at(i)]) {
            return 1;
        } else {
            if (cards[a.at(i)] < cards[b.at(i)]) {
                return -1;
            }
        }
    }

    return 0;
};

const whatKind = (a) => {
    const cardss = {};

    for (let i = 0; i < 5; i++) {
        if (cardss[a.at(i)] === undefined) {
            cardss[a.at(i)] = 1;
        } else {
            cardss[a.at(i)] += 1;
        }
    }

    let strength = 0;

    for (let val of Object.values(cardss)) {
        if (val === 5) {
            return 10;
        }

        if (val === 4) {
            return 9;
        }

        if (val === 3) {
            strength += 3;
        }

        if (val === 2) {
            strength += 1;
        }
    }

    return strength;
};

const sorting = (a, b) => {
    const sA = whatKind(a.card);
    const sB = whatKind(b.card);

    if (sA > sB) return 1;
    if (sB > sA) return -1;

    return higherFirst(a.card, b.card);
};

const main = async () => {
    const text = await readFile("./input.txt", "utf8");

    // console.log(text);

    const games = text.split("\n");

    let num = 0;

    console.log(games);

    const plays = games.map((a) => {
        const play = a.split(" ");

        return {
            card: play[0],
            bid: parseInt(play[1], 10),
        };
    });

    plays.sort((a, b) => sorting(a, b));

    // console.log(plays);

    for (let i = 0; i < plays.length; i++) {
        num += (i + 1) * plays[i].bid;
    }

    console.log(num);
};

main();
