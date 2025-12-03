const testInput = `987654321111111
811111111111119
234234234234278
818181911112111`;

const inputFromTextFile = require("fs").readFileSync("input.txt", "utf8");

function decodeInput(input) {
    return input.split("\n").map((bank) => bank.split(""));
}

function answer1() {
    return decodeInput(inputFromTextFile).reduce((totalJoltage, batteryBank) => {
        if(batteryBank.length === 0) {
            return totalJoltage;
        }
        const sortedBank = batteryBank.slice(0, -1).sort((a, b) => b - a);
        const highestJoltage = sortedBank[0];
        const secondBattery = batteryBank.slice(batteryBank.findIndex(battery => battery === highestJoltage) + 1).sort((a, b) => b - a)[0];
        return totalJoltage + Number(highestJoltage + secondBattery);
    }, 0)
}

function findNextBattery(totalJoltage, batteryBank, currentIndex) {
    const remainingBatteryBank = batteryBank.slice(currentIndex);
    if(totalJoltage.length + remainingBatteryBank.length === 12) {
        return totalJoltage + remainingBatteryBank.join("");
    }

    const remainingBatteryOptions = remainingBatteryBank.slice(0, -11 + totalJoltage.length || undefined);
    const nextBatteryIndex = remainingBatteryOptions.indexOf(Math.max(...remainingBatteryOptions).toString());
    const newTotalJoltage = totalJoltage + remainingBatteryOptions[nextBatteryIndex];
    if(newTotalJoltage.length === 12) {
        return newTotalJoltage;
    }
    return findNextBattery(newTotalJoltage, remainingBatteryBank, nextBatteryIndex + 1);

}

function answer2() {
    return decodeInput(inputFromTextFile).reduce((totalJoltage, batteryBank) => {
        if(batteryBank.length === 0) {
            return totalJoltage;
        }
        return totalJoltage + Number(findNextBattery("", batteryBank, 0));
    }, 0)
}

console.log(answer1());
console.log(answer2());
