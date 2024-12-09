import fs from 'fs';

// Read in the file contents
const computerMemory: String = fs.readFileSync('./2024/inputs/day3-input.txt', 'utf8');

// Part 1

// Define regex to match real, valid mul() instructions
const mulRegex: RegExp = /mul\(\d{1,3},\d{1,3}\)/g;
const factorRegex: RegExp = /\d{1,3}/g;

/**
 * Function to loop over the valid mul() instructions.
 * For each one multiply the first number by the second number
 * Add the result to the running total
 */
function part1Multiplication(mulArray: string[]): number {
  let runningTotal: number = 0;

  mulArray.forEach((mulString: string) => {
    const factors: string[] | null = mulString.match(factorRegex);

    if (factors?.length === 2) {
      runningTotal += parseInt(factors[0], 10) * parseInt(factors[1], 10);
    } else {
      console.log(`Error: The factors of ${mulString} did not match for exactly 2 factors.`);
    }
  });

  return runningTotal;
}

console.log('Part 1');

// Build an array of the mul() instructions
const mulInstructions: string[] | null = computerMemory.match(mulRegex);

if (mulInstructions) {
  console.log(part1Multiplication(mulInstructions));
} else {
  console.log(`Did not find any mulInstruction matches.`);
}

// Part 2

/**
 * Because the instructions start enabled but the input might not start with a do()
 * We cannot simply regex a do()[anything]don't()
 * Instead we will split the memory string into an array on 'do'
 * This will create an array of strings that we can itterate through.
 * Any that start with n't() will be instruction sets that would have started with don't()
 */

function part2Multiplication(memArray: string[]): number {
  let runningTotal = 0;

  // filter the memArray to return any elements that do not start with "n't()"
  const filteredArray: string[] = memArray.filter((element) => {
    return element.substring(0, 5) !== "n't()";
  });

  // Step through the filtered array and perform add up the mul instructions
  filteredArray.forEach((memoryString) => {
    const mulInstructions: string[] | null = memoryString.match(mulRegex);

    mulInstructions?.forEach((mulString: string) => {
      const factors: string[] | null = mulString.match(factorRegex);

      if (factors?.length === 2) {
        runningTotal += parseInt(factors[0], 10) * parseInt(factors[1], 10);
      } else {
        console.log(`Error: The factors of ${mulString} did not match for exactly 2 factors.`);
      }
    });
  });

  return runningTotal;
}

const memoryArray: string[] = computerMemory.split('do');

console.log('Part 2');

console.log(part2Multiplication(memoryArray));

// ToDo: One day come back to clean this up and refactor out repetative code into reusable functions.
// but for now we can just be happy we solved it!
