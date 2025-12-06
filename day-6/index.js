const testInput =
    `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

const inputFromTextFile = require("fs").readFileSync("input.txt", "utf8");

function decodeInput(input) {
    return input.split("\n")
        .map((line) => line.split(" ").filter((line) => line.length))
        .reduce((total, line) => {
            for (let i = 0; i < line.length; i++) {
                if (total[i]) {
                    if (isNaN(Number(line[i]))) {
                        total[i].operation = line[i];
                    } else {
                        total[i].numbers.push(Number(line[i]));
                    }
                } else {
                    total[i] = {
                        numbers: [Number(line[i])]
                    }
                }
            }
            return total;
        }, []);
}

function answer1() {
    return decodeInput(inputFromTextFile).reduce((total, {numbers, operation}) => {
        switch (operation) {
            case "*":
                return total + numbers.reduce((subTotal, num) => subTotal * num, 1);
            case "+":
            default:
                return total + numbers.reduce((subTotal, num) => subTotal + num, 0);
        }
    }, 0)
}

console.log(answer1());

function decodeInputForAnswer2(input) {
    const splitInput = input.split("\n").map(line => line).filter(Boolean);
    const operations = splitInput[splitInput.length - 1].split(" ").filter(Boolean);
    return splitInput.slice(0, -1).reduce((total, line) => {
        for (let i = 0; i < line.length; i++) {
            if (total[i] !== undefined) {
                total[i] = total[i].concat(line[i]);
                continue;
            }
            total[i] = line[i];
        }
        return total;
    }, []).join("-").split(/- +-/).map((line, index) => ({
        numbers: line.split("-").map(Number),
        operation: operations[index]
    }));
}

function answer2() {
    return decodeInputForAnswer2(inputFromTextFile).reduce((total, {numbers, operation}) => {
        switch (operation) {
            case "*":
                return total + numbers.reduce((subTotal, num) => subTotal * num, 1);
            case "+":
            default:
                return total + numbers.reduce((subTotal, num) => subTotal + num, 0);
        }
    }, 0);
}

console.log(answer2());
