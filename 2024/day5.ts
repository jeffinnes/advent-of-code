import fs from 'fs';

// Read in the file contents
// const inputString: String = fs.readFileSync('./2024/inputs/day5-input.txt', 'utf8');
const inputString: string = `47|53
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
97,13,75,29,47`;

// Prepare the input data
const [orderingRuleStrings, updatedPageStrings] = inputString.split('\n\n');
const orderingRules: number[][] = orderingRuleStrings.split('\n').map((rule) => {
  return rule.split('|').map((num) => parseInt(num));
});
const updatedPages: number[][] = updatedPageStrings.split('\n').map((page) => {
  return page.split(',').map((num) => parseInt(num));
});

// Part 1
