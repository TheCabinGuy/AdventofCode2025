const testInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

const inputFromTextFile = require("fs").readFileSync("input.txt", "utf8");

function decodeInput(input) {
    return input.split(",").map((line) => {
        return line.split("-").map(Number);
    });
}

function answer1(){
    const ranges = decodeInput(inputFromTextFile);

    let invalidIds = 0;
    for (const [start, end] of ranges) {
        for (let i = start; i <= end; i++) {
            let pattern = i.toString();
            if(pattern.slice(0, pattern.length / 2) === pattern.slice(pattern.length / 2)) {
                invalidIds += i;
            }
        }
    }
    return invalidIds;
}

console.log(answer1());

function answer2(){
    const ranges = decodeInput(inputFromTextFile);

    let invalidIds = 0;
    for (const [start, end] of ranges) {
        checkId: for (let i = start; i <= end; i++) {
            let id = i.toString();
            for (let j = 1; j <= Math.floor(id.length / 2); j++) {
                const groups = id.match(new RegExp('.{1,' + j + '}', 'g'));
                if(groups.every((val) => val === groups[0])) {
                    invalidIds += i;
                    continue checkId;
                }
            }
        }
    }
    return invalidIds;
}

console.log(answer2());
