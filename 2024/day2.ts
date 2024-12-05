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

function reportIsSafe(report: string): { isSafe: boolean; badLevel?: number } {
  const reportAsArray: string[] = report.split(' ');
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
      return {
        isSafe: false,
        badLevel: i,
      };
    }

    // Check the magnitude of the step between levels
    if (Math.abs(thisLevel - nextLevel) > 3) {
      return {
        isSafe: false,
        badLevel: i,
      };
    }
  }

  return {
    isSafe: true,
  };
}

// Loop over the reports and check to see if they are safe
reports.forEach((report) => {
  if (reportIsSafe(report).isSafe) {
    safeReportCount += 1;
  }
});

console.log('Count of Safe Reports Part 1: ', safeReportCount);

// Part 2

// reset safeReportCount
safeReportCount = 0;

// Loop over the reports and check to see if they are safe
reports.forEach((report) => {
  const reportSafetyResult: { isSafe: boolean; badLevel?: number } = reportIsSafe(report);

  if (reportSafetyResult.isSafe) {
    safeReportCount += 1;
  } else if (reportSafetyResult.badLevel) {
    console.log('Bad Report: ', report, reportSafetyResult);

    const reportAsArray: string[] = report.split(' ');

    const splicedArray: string[] = [
      ...reportAsArray.slice(0, reportSafetyResult.badLevel),
      ...reportAsArray.slice(reportSafetyResult.badLevel + 1),
    ];

    if (reportIsSafe(splicedArray.join(' ')).isSafe) {
      safeReportCount += 1;
    } else {
      console.log(splicedArray.join(' '), ' still not safe');
    }
  } else {
    console.log('Bad Report no bad level: ', report, reportSafetyResult);
  }
  console.log('safeReportCount: ', safeReportCount, '\n');
});

console.log('Count of Safe Reports Part 2: ', safeReportCount);

//
/**
 * How do I know which level to remove?
 * Bad Report:  3 1 3 4 7 9 13 { isSafe: false, badLevel: 1 }
 * 3 3 4 7 9 13  still not safe
 * safeReportCount:  4
 */
