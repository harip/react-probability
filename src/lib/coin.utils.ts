export const binomialDistribution = (numberOfTrials: number) => {
    // P(k) = [n! / (k! * (n-k)!)] * p^k * (1-p)^(n-k)
    // n is total number of trials
    // k is probability of k heads appearing in n trials
    // p = 0.5, probability for heads or tails

    const p = 0.5;

    // if number of trails are 3
    // find P(heads=0),P(heads=1) and P(heads=2), so itreate i=0 to i=3-1
    const distributionValues = new Map<number, string>();
    for (let k = 0; k <= numberOfTrials; k++) {
        // [n! / (k! * (n-k)!)]
        const calc1 = factorial(numberOfTrials) / (factorial(k) * factorial(numberOfTrials - k));

        // p^k
        const calc2 = Math.pow(p, k);

        // (1-p)^(n-k)
        const calc3 = Math.pow(1 - p, numberOfTrials - k);

        // Calculate P(i heads)
        const prob = (calc1 * calc2 * calc3).toFixed(3);
        distributionValues.set(k, prob);
    }

    return distributionValues;
}

function factorial(n: number): number {
    if (n <= 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

export const getCoinFlipCombinations = (numberOfFlips: number) => {
    // All possible outcomes when a coin is flipped
    // It can he either heads or tails
    const possibleFlips = ["H","T"]

    // Create a stack that keeps tracks of what is flipped
    // When 1 coin is flipped, it can be either H or T
    const stack = ["T","H"]; 
    const combinations = []; 
    while (stack.length > 0) {
        // Pop first element from stack
        // For example, in first iter, it will be H
        const currentFlip = stack.pop();

        // Now we are flipping the coin again
        for (let i=0;i<possibleFlips.length ;i++) {

            // Combine with the current flip
            const flip = currentFlip + possibleFlips[i]
    
            if (flip.length === numberOfFlips) {
                // if number of flips is 2 and combined is say HT
                // Then we need to add this to our combinations array
                combinations.push(flip)
            } else {
                stack.push(flip)
            } 
        }
    }
    return combinations;
}

export const getExperimentationProbabilty = (totalCombinations: Array<string>, numberOfHeads: number) => {
    const successHeads = totalCombinations.filter(c=> c.split('H').length-1 === numberOfHeads).length;
    const probability = (successHeads/totalCombinations.length).toFixed(3);
    return probability;
}