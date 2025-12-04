const testInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

const inputFromTextFile = require("fs").readFileSync("input.txt", "utf8");

function decodeInput(input) {
    return input.split("\n").map((line) => line.split(""));
}

/*
0,0 0,1 0,2
1,0 1,1 1,2
2,0 2,1 2,2
 */

function buildCoordinateString(x, y) {
    return `${x},${y}`;
}

function getSurroundingRolls(coordinates) {
    const [x, y] = coordinates.split(",").map(Number);
    return [
        buildCoordinateString(x - 1, y - 1),
        buildCoordinateString(x, y - 1),
        buildCoordinateString(x + 1, y - 1),
        buildCoordinateString(x - 1, y),
        buildCoordinateString(x + 1, y),
        buildCoordinateString(x - 1, y + 1),
        buildCoordinateString(x, y + 1),
        buildCoordinateString(x + 1, y + 1),
    ];
}

function answer1() {
    let accessibleRolls = 0;
    const rollLocations = [];
    const grid = decodeInput(inputFromTextFile);
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if(grid[y][x] === "@") {
                rollLocations.push(buildCoordinateString(x, y));
            }
        }
    }

    for (const rollLocation of rollLocations) {
        const surroundingRolls = getSurroundingRolls(rollLocation);
        const temp = surroundingRolls.filter((roll) => rollLocations.includes(roll))
        if(temp.length < 4) {
            accessibleRolls++;
        }
    }

    return accessibleRolls;
}

console.log(answer1());

function removeRolls(rollLocations, totalRollsRemoved = 0) {
    const rollsToBeRemoved = []
    for (const rollLocation of rollLocations) {
        const surroundingRolls = getSurroundingRolls(rollLocation);
        const temp = surroundingRolls.filter((roll) => rollLocations.includes(roll))
        if(temp.length < 4) {
            rollsToBeRemoved.push(rollLocation);
        }
    }

    if(rollsToBeRemoved.length === 0) {
        return totalRollsRemoved;
    }
    return removeRolls(rollLocations.filter((roll) => !rollsToBeRemoved.includes(roll)), totalRollsRemoved + rollsToBeRemoved.length);
}

function answer2() {
    const grid = decodeInput(inputFromTextFile);
    const rollLocations = [];
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if(grid[y][x] === "@") {
                rollLocations.push(buildCoordinateString(x, y));
            }
        }
    }
    return removeRolls(rollLocations);
}

console.log(answer2());
