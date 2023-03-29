export const binomialDistribution = (numberOfTrials: number) => {
    // P(k) = [n! / (k! * (n-k)!)] * p^k * (1-p)^(n-k)
    // n is total number of trials
    // k is probability of k heads appearing in n trials
    // p = 0.5, probability for heads or tails
    
    const p = 0.5;

    // if number of trails are 3
    // find P(heads=0),P(heads=1) and P(heads=2), so itreate i=0 to i=3-1
    const distributionValues = new Map<number,number>();
    for (let k=0; k<=numberOfTrials; k++) {  
        // [n! / (k! * (n-k)!)]
        const calc1 = factorial(numberOfTrials) / (factorial(k) * factorial(numberOfTrials-k) );

        // p^k
        const calc2 = Math.pow(p,k);

        // (1-p)^(n-k)
        const calc3 = Math.pow(1-p,numberOfTrials-k);

        // Calculate P(i heads)
        const prob = (calc1 * calc2 * calc3);
        distributionValues.set(k,prob);
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