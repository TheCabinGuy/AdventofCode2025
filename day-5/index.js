const testInput = `3-5
10-14
16-20
12-18
10-13
10-11

1
5
8
11
17
32`;

const inputFromTextFile = require("fs").readFileSync("input.txt", "utf8");

function decodeInput(input) {
    const [ranges, numbers] = input.split("\n\n").map((line) => line.split("\n"));
    return [
        ranges.map((range) => range.split("-").map(Number)),
        numbers.map(Number),
    ];
}

function answer1() {
    const [ranges, numbers] = decodeInput(inputFromTextFile);

    return numbers.filter((number) => {
        return ranges.some((range) => {
            return number >= range[0] && number <= range[1];
        });
    }).length;
}

console.log(answer1());

function answer2() {
    const [ranges] = decodeInput(inputFromTextFile);

    ranges.sort(([startA, endA], [startB, endB]) => startA === startB ? endA - endB : startA - startB);

    const optimizedRanges = ranges.reduce((optimisedRanges, [start, end]) => {
        if(optimisedRanges.length === 0) {
            return [[start, end]];
        }
        for (let i = 0; i < optimisedRanges.length; i++) {
            const [optStart, optEnd] = optimisedRanges[i];
            if(start >= optStart && start <= optEnd) {
                optimisedRanges[i] = [optStart, Math.max(end, optEnd)];
                return optimisedRanges;
            }

            if(start < optStart && end >= optEnd && end >= optStart) {
                optimisedRanges[i] = [start, optEnd];
                return optimisedRanges;
            }
        }
        optimisedRanges.push([start, end]);
        return optimisedRanges;
    }, [])

    return optimizedRanges.reduce((total, [start, end]) => total + end - start + 1, 0)
}

console.log(answer2());
