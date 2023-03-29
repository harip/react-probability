export const getProbabilityInfo = (numberOfDice: number, sum: number) => {
    const minSumOfDice = numberOfDice * 1;
    const totalNumberOfPossibleOutcomes = Math.pow(6,numberOfDice);

    // The event we are looking to occur is the sum
    const combinations = findDiceCombinations(numberOfDice, sum);
    const probability = sum < minSumOfDice 
        ? 0
        : (combinations[0].length / totalNumberOfPossibleOutcomes).toFixed(3);

    return {
        probability,
        numberOfWaysEventCanOccur: combinations[0].reverse(),
        totalPossibleOutcomes: combinations[1].reverse()
    }
}

function findDiceCombinations(numDice: number, targetSum: number) {
    console.log('------------------function called----------------------')
    const dice = [1, 2, 3, 4, 5, 6];
    const combinations = [];
    const numberOfWaysEventCanOccur = [];
    const stack = [Array(numDice).fill(-1)];

    while (stack.length > 0) {
        const current = stack.pop()!;
        const index = current.indexOf(-1);
        if (index === -1) {
            combinations.push([...current]);
            const sum = [...current].reduce((a, c) => a + c, 0)
            if (sum === targetSum) {
                numberOfWaysEventCanOccur.push([...current])
            }
            continue;
        }
        for (let i = 0; i < dice.length; i++) {
            current[index] = dice[i];
            stack.push([...current]);
        }
    }

    return [numberOfWaysEventCanOccur, combinations];
}