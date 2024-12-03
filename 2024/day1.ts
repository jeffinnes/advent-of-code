import fs from 'fs';

// Read in the file contents
const sideBySideLists: String = fs.readFileSync('./2024/inputs/day1-input.txt', 'utf8');

const leftList: Array<number> = [];
const rightList: Array<number> = [];
let runningTotalDistance: number = 0;

// Part 1

// Split the input string into an array of strings
// Loop over this array to split the values and push them into the correct left or right array list
const sideBySideListArray: Array<string> = sideBySideLists.split('\n');

const partOneStart: number = Date.now();

sideBySideListArray.forEach((inputRowString: String) => {
  const inputRow: Array<string> = inputRowString.split('   ');

  leftList.push(parseInt(inputRow[0], 10));
  rightList.push(parseInt(inputRow[1], 10));
});

// Sort the arrays
leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

// Calculate the total distance difference
// We use Math.abs to get the absolute value of the difference because we don't care about the sign, just the magnitude
for (let i = 0; i < sideBySideListArray.length; i++) {
  runningTotalDistance = runningTotalDistance + Math.abs(leftList[i] - rightList[i]);
}

const partOneEnd: number = Date.now();
const partOneDuration: number = partOneEnd - partOneStart;

console.log('Part 1 Execution Time: ', partOneDuration, 'ms');
console.log('\nTotal Distance Difference: ', runningTotalDistance);

// Part 2
const partTwoStart: number = Date.now();

// Initialise the similarity score
let similarityScore: number = 0;

// Loop over the left list
// For each value in the left list, find the first occurrence in the right list
// find the number of times this value occurs in the right list by looping untill the value in the right list no longer matches
// Multiply the value in the left list by the number of times it occured in the right list and add it to the similarity score
leftList.forEach((leftValue: number) => {
  let multiplier: number = 0;
  let rightIndex: number = rightList.indexOf(leftValue);

  if (rightIndex !== -1) {
    while (leftValue === rightList[rightIndex]) {
      multiplier += 1;
      rightIndex += 1;
    }
  }

  similarityScore += leftValue * multiplier;
});

const partTwoEnd: number = Date.now();
const partTwoDuration: number = partTwoEnd - partTwoStart;

console.log('\n\nPart 2 Execution Time: ', partTwoDuration, 'ms');
console.log('\nSimilarity Score: ', similarityScore);
