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
