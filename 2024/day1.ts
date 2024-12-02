import fs from 'fs';

// Read in the file contents
const sideBySideLists: String = fs.readFileSync('./2024/inputs/day1-input.txt', 'utf8');

const leftList: Array<number> = [];
const rightList: Array<number> = [];
let runningTotalDistance: number = 0;

// Split the input string into an array of strings
// Loop over this array to split the values and push them into the correct left or right array list
const sideBySideListArray: Array<string> = sideBySideLists.split('\n');

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

console.log('\n\nTotal Distance Difference: ', runningTotalDistance);
