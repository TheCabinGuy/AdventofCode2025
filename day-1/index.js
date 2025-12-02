const testInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

const startingPosition = 50;

const inputFromTextFile = require("fs").readFileSync("input.txt", "utf8");

/**
 *
 * @param {string} input
 * @returns {{increase: boolean, distance: number}[]}
 */
function decodeInput(input) {
  return input.split("\n").map((line) => {
      const [direction, distance] = line.split(/(?<=\D)(?=\d)/);
    return Number(distance) * (direction === "R" ? 1 : -1);
  });
}


function overflowCorrection(input) {
    if (input < 0) {
        return overflowCorrection(100 + input);
    } else if (input > 99) {
        return overflowCorrection(input - 100);
    }
    return input;
}

function answer1() {
    const instructions = decodeInput(inputFromTextFile);

    let position = startingPosition;

    let zeroCounter = 0;

    for (const  distance  of instructions) {
        let previousPosition = position;
        position += distance;

        if(position > 99) {
            zeroCounter += Math.floor(position / 100);
        } else if(position < 0) {
            zeroCounter += Math.floor(Math.abs(position) / 100) + Math.min(previousPosition, 1);
        } else if(position === 0) {
            zeroCounter++;
        }

        position = overflowCorrection(position);
    }

    return zeroCounter;
}

console.log(answer1());
