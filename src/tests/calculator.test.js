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
    main(['pow', '2', '3'])
    expect(errorSpy).toHaveBeenCalled()
    expect(process.exitCode).toBe(4)
  })
})
