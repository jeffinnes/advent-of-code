import fs from 'fs';

// Read in the file contents
const inputString: String = fs.readFileSync('./2024/inputs/day5-input.txt', 'utf8');
/* const inputString: string = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`; */

// Prepare the input data
const [orderingRuleStrings, updatedPageStrings] = inputString.split('\n\n');
const orderingRules: number[][] = orderingRuleStrings.split('\n').map((rule) => {
  return rule.split('|').map((num) => parseInt(num));
});
const updatedPages: number[][] = updatedPageStrings.split('\n').map((page) => {
  return page.split(',').map((num) => parseInt(num));
});

const misorderedUpdates: number[][] = [];

// Part 1
let middlePageNumberSum: number = 0;

updatedPages.forEach((updateSet) => {
  let updatePageOrderIsCorrect = true;

  orderingRules.forEach((rule) => {
    // If the rule applies to this update set
    if (updateSet.includes(rule[0]) && updateSet.includes(rule[1])) {
      const i = updateSet.indexOf(rule[0]);

      // If i is the last item in the set, the second rule value must have come before the one at index i for the above to evaluate to true.
      // Or if the array resulting from slicing at index i doesn't include the second rule value, the second value must have come before the one at index i for the above to evaluate to true.
      if (i === updateSet.length - 1 || !updateSet.slice(i).includes(rule[1])) {
        updatePageOrderIsCorrect = false;
      }
    }
  });

  //console.log('\n', updateSet, ' is valid? - ', updatePageOrderIsCorrect);

  if (updatePageOrderIsCorrect) {
    const middlePageIndex: number = Math.round(updateSet.length / 2) - 1;

    /* console.log('updateSet.length ', updateSet.length);
    console.log('middlePageIndex ', middlePageIndex);
    console.log('updateSet[middlePageIndex] ', updateSet[middlePageIndex]); */

    middlePageNumberSum += updateSet[middlePageIndex];
  } else {
    misorderedUpdates.push(updateSet);
  }
});

console.log('Part 1: ', middlePageNumberSum);

// Part 2
let correctedUpdateMiddlePageNumberSum: number = 0;

const correctedUpdates: number[][] = [];

misorderedUpdates.forEach((updateSet) => {
  const setToUpdate = [...updateSet];
  let updatePageOrderIsCorrect = false;
  // Get the rule sets that apply to this update set
  const applicableRuleSets: number[][] = orderingRules.filter(
    (rule) => setToUpdate.includes(rule[0]) && setToUpdate.includes(rule[1])
  );

  do {
    //console.log('\nOrdering: ', setToUpdate);
    //console.log('Applicable Rule Sets: ', applicableRuleSets);

    applicableRuleSets.forEach((rule) => {
      const i = setToUpdate.indexOf(rule[0]);

      // Saaame logic as above
      if (i === setToUpdate.length - 1 || !setToUpdate.slice(i).includes(rule[1])) {
        // Rule has been violated. Correct the order.
        const j = setToUpdate.indexOf(rule[1]);

        // Swap the two values
        const temp = setToUpdate[i];
        setToUpdate[i] = setToUpdate[j];
        setToUpdate[j] = temp;
      }
    });

    // Check if the order is correct now
    updatePageOrderIsCorrect = true;
    // console.log('state this pass: ', setToUpdate);

    applicableRuleSets.forEach((rule) => {
      const i = setToUpdate.indexOf(rule[0]);

      if (i === setToUpdate.length - 1 || !setToUpdate.slice(i).includes(rule[1])) {
        //console.log('Rule violated: ', rule);
        updatePageOrderIsCorrect = false;
      }
    });
  } while (!updatePageOrderIsCorrect);

  correctedUpdates.push(setToUpdate);
});

correctedUpdates.forEach((updateSet) => {
  correctedUpdateMiddlePageNumberSum += updateSet[Math.round(updateSet.length / 2) - 1];
});
/* console.log('Misordered Updates: ', misorderedUpdates);
console.log('Corrected Updates: ', correctedUpdates); */

console.log('Part 2: ', correctedUpdateMiddlePageNumberSum);
