#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
// - Addition (+)      -> command: add
// - Subtraction (-)   -> command: sub
// - Multiplication (*)-> command: mul
// - Division (/)      -> command: div
//
// This file implements a small Node.js CLI calculator that supports the
// four basic operations above. It follows the repository issue spec by
// accepting commands: add, sub, mul, div and printing the numeric result
// to stdout. Division by zero is handled with an error message and non-zero
// exit code.

function printUsage() {
  console.log('Usage: node src/calculator.js <add|sub|mul|div> <a> <b>')
  console.log('Example: node src/calculator.js add 2 3')
}

function parseNumber(val) {
  const n = Number(val)
  return Number.isFinite(n) ? n : NaN
}

function main(argv) {
  const [cmd, aRaw, bRaw] = argv
  if (!cmd || aRaw === undefined || bRaw === undefined) {
    printUsage()
    process.exitCode = 1
    return
  }

  const a = parseNumber(aRaw)
  const b = parseNumber(bRaw)

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: both operands must be valid numbers')
    process.exitCode = 2
    return
  }

  let result
  switch (cmd) {
    case 'add':
      // Addition
      result = a + b
      break
    case 'sub':
      // Subtraction
      result = a - b
      break
    case 'mul':
      // Multiplication
      result = a * b
      break
    case 'div':
      // Division (handle division by zero)
      if (b === 0) {
        console.error('Error: division by zero')
        process.exitCode = 3
        return
      }
      result = a / b
      break
    default:
      console.error(`Unknown command: ${cmd}`)
      printUsage()
      process.exitCode = 4
      return
  }

  // Print the numeric result to stdout
  console.log(result)
}

// Export main for testing and require-check
module.exports = { main }

if (require.main === module) {
  main(process.argv.slice(2))
}
>>>>>>> bbfe3f9 (Add Node.js CLI calculator in src (supports +, -, *, /))// Supports the following operations:
// - Addition (+)      -> command: add
// - Subtraction (-)   -> command: sub
// - Multiplication (*)-> command: mul
// - Division (/)      -> command: div
//
// Usage examples:
//   node src/calculator.js add 2 3     # prints 5
//   node src/calculator.js div 10 2    # prints 5

const [,, cmd, aRaw, bRaw] = process.argv;

function printUsage() {
  console.log('Usage: node src/calculator.js <add|sub|mul|div> <a> <b>');
  console.log('Example: node src/calculator.js add 2 3');
}

if (!cmd || !aRaw || !bRaw) {
  printUsage();
  process.exit(1);
}

const a = Number(aRaw);
const b = Number(bRaw);

if (Number.isNaN(a) || Number.isNaN(b)) {
  console.error('Error: both operands must be valid numbers.');
  process.exit(1);
}

let result;

switch (cmd) {
  case 'add':
    // Addition
    result = a + b;
    break;
  case 'sub':
    // Subtraction
    result = a - b;
    break;
  case 'mul':
    // Multiplication
    result = a * b;
    break;
  case 'div':
    // Division
    if (b === 0) {
      console.error('Error: division by zero');
      process.exit(1);
    }
    result = a / b;
    break;
  default:
    console.error(`Unknown command: ${cmd}`);
    printUsage();
    process.exit(1);
}

// Print result to stdout
console.log(result);
>>>>>>> bbfe3f9 (Add Node.js CLI calculator in src (supports +, -, *, /))
