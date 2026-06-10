const { main } = require('../calculator')

describe('CLI calculator', () => {
  let logSpy
  let errorSpy

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    logSpy.mockRestore()
    errorSpy.mockRestore()
    // reset exitCode
    process.exitCode = 0
  })

  test('addition: add 2 3 -> 5', () => {
    main(['add', '2', '3'])
    expect(logSpy).toHaveBeenCalledWith(5)
    expect((process.exitCode ?? 0)).toBe(0)
  })

  test('subtraction: sub 10 4 -> 6', () => {
    main(['sub', '10', '4'])
    expect(logSpy).toHaveBeenCalledWith(6)
    expect((process.exitCode ?? 0)).toBe(0)
  })

  test('multiplication: mul 45 2 -> 90', () => {
    main(['mul', '45', '2'])
    expect(logSpy).toHaveBeenCalledWith(90)
    expect((process.exitCode ?? 0)).toBe(0)
  })

  test('division: div 20 5 -> 4', () => {
    main(['div', '20', '5'])
    expect(logSpy).toHaveBeenCalledWith(4)
    expect((process.exitCode ?? 0)).toBe(0)
  })

  test('division by zero returns error', () => {
    main(['div', '5', '0'])
    expect(errorSpy).toHaveBeenCalledWith('Error: division by zero')
    expect(process.exitCode).toBe(3)
  })

  test('invalid numbers produce error', () => {
    main(['add', 'a', '2'])
    expect(errorSpy).toHaveBeenCalledWith('Error: both operands must be valid numbers')
    expect(process.exitCode).toBe(2)
  })

  test('missing args prints usage and sets exit code', () => {
    main([])
    expect(process.exitCode).toBe(1)
  })

  test('unknown command prints usage and sets exit code', () => {
    main(['foo', '2', '3'])
    expect(errorSpy).toHaveBeenCalled()
    expect(process.exitCode).toBe(4)
  })

  // Extended operations from feature request
  test('modulo: mod 5 2 -> 1', () => {
    main(['mod', '5', '2'])
    expect(logSpy).toHaveBeenCalledWith(1)
    expect((process.exitCode ?? 0)).toBe(0)
  })

  test('modulo by zero returns error', () => {
    main(['mod', '5', '0'])
    expect(errorSpy).toHaveBeenCalledWith('Error: modulo by zero')
    expect((process.exitCode ?? 0)).toBe(3)
  })

  test('power: pow 2 3 -> 8', () => {
    main(['pow', '2', '3'])
    expect(logSpy).toHaveBeenCalledWith(8)
    expect((process.exitCode ?? 0)).toBe(0)
  })

  test('square root: sqrt 16 -> 4', () => {
    main(['sqrt', '16'])
    expect(logSpy).toHaveBeenCalledWith(4)
    expect((process.exitCode ?? 0)).toBe(0)
  })

  test('square root of negative number returns error', () => {
    main(['sqrt', '-9'])
    expect(errorSpy).toHaveBeenCalledWith('Error: square root of negative number')
    expect((process.exitCode ?? 0)).toBe(5)
  })
})
