import fs from 'fs';

// Read in the file contents
const inputString: String = fs.readFileSync('./2024/inputs/day4-input.txt', 'utf8');
/* const inputString: string = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`; */

/* const inputString: string = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM`; */

// Part 1
// Turn the input string into an array that represents the grid
const wordSearchGrid: string[] = inputString.split('\n');

const wordToFind: string = 'XMAS';
let numberOfWordsFound: number = 0;
// The grid is assumed to have uniform row lengths because the puzzle instructions did not say otherwise
const gridDimensions = [wordSearchGrid[0].length, wordSearchGrid.length];

// Define grid movements as an object.
// Each key is a direction and each value is an array of the change as [x,y]
// Note: because the grid is represented as an array of strings Y is inverted (the top row is index 0 in the array)
const gridMovements: object = {
  up: [0, -1],
  upLeft: [-1, -1],
  upRight: [1, -1],
  down: [0, 1],
  downLeft: [-1, 1],
  downRight: [1, 1],
  left: [-1, 0],
  right: [1, 0],
};

function checkForWord(
  direction: string,
  currentCoordinates: number[],
  wordSoFar: string,
  depth: number
) {
  // movementDirection and invokedCoordinates are assumed [x,y]
  // Check to see if this movement will go beyond any of the grid edges
  if (
    currentCoordinates[0] + gridMovements[direction][0] < 0 ||
    currentCoordinates[1] + gridMovements[direction][1] < 0 ||
    currentCoordinates[0] + gridMovements[direction][0] >= gridDimensions[0] ||
    currentCoordinates[1] + gridMovements[direction][1] >= gridDimensions[1]
  ) {
    /* console.log(
      `Moving ${direction}:${gridMovements[direction]} from ${currentCoordinates} will exceed the dimensions of the board`
    ); */
    return;
  } else {
    const nextLetter =
      wordSearchGrid[currentCoordinates[1] + gridMovements[direction][1]][
        currentCoordinates[0] + gridMovements[direction][0]
      ];
    // console.log('Looking for: ', wordToFind[depth]);
    // console.log('nextLetter found: ', nextLetter);

    // If nextLetter is the expected next letter continue, other wise return early.
    if (nextLetter === wordToFind[depth]) {
      // console.log('wordSoFar + nextLetter = ', wordSoFar + nextLetter);
      if (wordSoFar + nextLetter === wordToFind) {
        numberOfWordsFound += 1;
        return;
      } else if (depth + 1 > 3) {
        return;
      } else {
        const nextCoordinates: number[] = [
          currentCoordinates[0] + gridMovements[direction][0],
          currentCoordinates[1] + gridMovements[direction][1],
        ];
        // recursive check
        checkForWord(direction, nextCoordinates, wordSoFar + nextLetter, depth + 1);
      }
    } else {
      return;
    }
  }
}

// Step through each row in the grid, moving from left to right checking for the first letter of the word XMAS
wordSearchGrid.forEach((row: string, y: number) => {
  // console.log(row);
  for (let x = 0; x < row.length; x++) {
    if (row[x] === 'X') {
      Object.keys(gridMovements).forEach((key) => {
        checkForWord(key, [x, y], row[x], 1);
      });
    }
  }
});

console.log('Part 1');
console.log('Answer: ', numberOfWordsFound);
