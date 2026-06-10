#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
// - Addition (+)       -> command: add
// - Subtraction (-)    -> command: sub
// - Multiplication (*) -> command: mul
// - Division (/)       -> command: div
// - Modulo (%)         -> command: mod
// - Exponentiation     -> command: pow
// - Square root        -> command: sqrt
//
// This file implements a small Node.js CLI calculator that supports the
// basic operations. Commands accept numeric operands and print the
// numeric result to stdout. Error cases (division/modulo by zero,
// negative sqrt, invalid input) print an error to stderr and set a
// non-zero exit code.

function printUsage() {
  console.log('Usage: node src/calculator.js <command> <a> <b?>')
  console.log('Commands: add, sub, mul, div, mod, pow, sqrt')
  console.log('Examples:')
  console.log('  node src/calculator.js add 2 3')
  console.log('  node src/calculator.js sqrt 9')
}

function parseNumber(val) {
  const n = Number(val)
  return Number.isFinite(n) ? n : NaN
}

// New utility functions
function modulo(a, b) {
  return a % b
}

function power(base, exponent) {
  return Math.pow(base, exponent)
}

function squareRoot(n) {
  return Math.sqrt(n)
}

function main(argv) {
  const [cmd, aRaw, bRaw] = argv

  if (!cmd) {
    printUsage()
    process.exitCode = 1
    return
  }

  // Determine required operands
  const needsTwo = cmd !== 'sqrt'
  if (needsTwo && (aRaw === undefined || bRaw === undefined)) {
    printUsage()
    process.exitCode = 1
    return
  }
  if (!needsTwo && aRaw === undefined) {
    printUsage()
    process.exitCode = 1
    return
  }

  const a = parseNumber(aRaw)
  const b = bRaw !== undefined ? parseNumber(bRaw) : undefined

  if (Number.isNaN(a) || (needsTwo && Number.isNaN(b))) {
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
    case 'mod':
      if (b === 0) {
        console.error('Error: modulo by zero')
        process.exitCode = 3
        return
      }
      result = modulo(a, b)
      break
    case 'pow':
      result = power(a, b)
      break
    case 'sqrt':
      if (a < 0) {
        console.error('Error: square root of negative number')
        process.exitCode = 5
        return
      }
      result = squareRoot(a)
      break
    default:
      console.error(`Unknown command: ${cmd}`)
      printUsage()
      process.exitCode = 4
      return
  }

  console.log(result)
}

// Export functions for testing
module.exports = { main, modulo, power, squareRoot }

if (require.main === module) {
  main(process.argv.slice(2))
}
