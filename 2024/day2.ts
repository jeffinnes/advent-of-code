import fs from 'fs';

// Read in the file contents
const rawReports: String = fs.readFileSync('./2024/inputs/day2-input.txt', 'utf8');
/* const rawReports: String = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`; */

// Part 1
let safeReportCount: number = 0;

// Split the raw string into an array of strings
// each element of the reports array is a single report
const reports: string[] = rawReports.split('\n');

// Loop over the reports and check to see if they are safe
reports.forEach((report) => {
  const reportAsArray: string[] = report.split(' ');
  let reportIsSafe: boolean = true;
  let reportIsAscending: boolean = true;

  // Determine if the report should actually be descending based on first two values
  if (parseInt(reportAsArray[0], 10) > parseInt(reportAsArray[1], 10)) {
    reportIsAscending = false;
  }

  // Step through the report
  for (let i = 0; i < reportAsArray.length - 1; i++) {
    const thisLevel: number = parseInt(reportAsArray[i], 10);
    const nextLevel: number = parseInt(reportAsArray[i + 1], 10);

    // Does this step change from the expected ascending/descending dirctions?
    // Does it plateu?
    if (
      (reportIsAscending && thisLevel > nextLevel) ||
      (!reportIsAscending && thisLevel < nextLevel) ||
      thisLevel === nextLevel
    ) {
      reportIsSafe = false;

      // The direction changed, no need to check the steps magnitude;
      break;
    }

    // Check the magnitude of the step between levels
    if (Math.abs(thisLevel - nextLevel) > 3) {
      reportIsSafe = false;
    }
  }

  if (reportIsSafe) {
    safeReportCount += 1;
  }

  //console.log(`${reportAsArray} - ${reportIsSafe ? 'Safe' : 'Unsafe'}`);
});

console.log('Count of Safe Reports: ', safeReportCount);
