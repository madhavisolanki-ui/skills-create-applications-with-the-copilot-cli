#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
//  - Addition (add): a + b
//  - Subtraction (sub): a - b
//  - Multiplication (mul): a * b
//  - Division (div): a / b  (division-by-zero handled with an error)

// Usage examples:
//  node src/calculator.js add 2 3    # prints 5
//  node src/calculator.js div 10 2   # prints 5
//  node src/calculator.js mul 4 5    # prints 20
//  node src/calculator.js sub 7 1    # prints 6

function printUsage() {
  console.log('Usage: node src/calculator.js <command> <a> <b>')
  console.log('Commands: add, sub, mul, div')
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
      result = a + b
      break
    case 'sub':
      result = a - b
      break
    case 'mul':
      result = a * b
      break
    case 'div':
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

if (require.main === module) {
  main(process.argv.slice(2))
}
