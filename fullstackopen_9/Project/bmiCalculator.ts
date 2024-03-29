interface MultiplyValues {
    value1: number;
    value2: number;
  }

const parseArguments = (args: string[]): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

export const calculateBmi = (height: number, weight: number): String => {
    const BMI = weight / ((height/100)*(height/100));
    let Condition;
    if (BMI < 18.5) {
        Condition = "Underweight";
    } 
    else if (18.5 <= BMI && BMI <= 25) {
        Condition = "Normal";
    }
    else if (25 <= BMI && BMI <= 30) {
        Condition = "Overweight";
    }
    else if (30 <= BMI && BMI <= 35) {
        Condition = "Obesity 1 degree";
    }
    else {
        Condition = "Obesity 2 degree";
    }
    return `${Condition} (${BMI})`;
}



try {
    const { value1, value2 } = parseArguments(process.argv);
    calculateBmi(value1, value2);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }

