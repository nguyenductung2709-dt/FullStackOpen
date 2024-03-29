interface formatInput {
    value1: number;
    value2: number[];
}

interface exercisesReport {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseInputs = (args: string[]): formatInput => {
    const value1 = Number(args[2]);
    if (isNaN(value1)) {
        throw new Error('The first value must be a number');
    }

    const value2: number[] = [];
    for (let i = 3; i < args.length; i++) {
        const value = Number(args[i]);
        if (isNaN(value)) {
            throw new Error('All values after the first must be numbers');
        }
        value2.push(value);
    }

    return {
        value1,
        value2,
    };
};

export const exerciseCalculator = (target: number, days: number[]): exercisesReport => {
    const periodLength = days.length;
    const trainingDays = days.filter(d => d > 0).length;
    let totalHours = 0;

    for (let i = 0; i < days.length; i++) {
        totalHours += days[i];
    }

    const average = totalHours / periodLength;
    const success = average >= target;
    const rating = Math.floor((average / target) * 3);
    let ratingDescription;

    if (rating < 2) {
        ratingDescription = "You are too bad, try harder next time.";
    } else if (rating === 2) {
        ratingDescription = "It's a decent try, try harder next time.";
    } else {
        ratingDescription = "Good job! Keep improving next time.";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

const args = process.argv;
try {
    const inputs = parseInputs(args);
    const report = exerciseCalculator(inputs.value1, inputs.value2);
    console.log(report);
} catch (error) {
    console.error(error.message);
}
