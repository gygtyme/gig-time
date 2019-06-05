const { toggle, breakTime } = require('../Utils/utils_Tiago')
const { getClient, userInfo, updateGigTime } = require("../Utils/utils.Josh")

//tiago test1

describe('testing toggle function', () => {
  test('if it is false return true', () => {
    expect(toggle(false)).toBe(true)
  })
  test('if it is true return false', () => {
    expect(toggle(true)).toBe(false)
  })
})

describe('testing function takeBreak', () => {
  test('it will return sum of 2 positive int', () => {
    expect(breakTime(1, 2)).toBe(3)
  })
  test('return the sum of negative int and positive int', () => {
    expect(breakTime(-1, 2)).toBe(1)
  })
  test('return sum of 2 negative int', () => {
    expect(breakTime(-1, -2)).toBe(-3)
  })
})

//Josh Tests

describe("testing axios call for client", () => {
  test("axios call recieves clients for specific gig", async () => {
    getClient("/api/clients", 1).then(response => {
      expect(response).toBeDefined()
    })
  })
  test("axios call recieves clients for specific gig", async () => {
    getClient("/api/clients", 1).then(response => {
      expect(response).toHaveLength(1)
    })
  })
})

describe("testing the userInfo for the redux that will return a type and payload", () => {
  let obj = {num1: 1, num2: 2, num3: 3}
  test("when given an object, it will return the object as well as the type", () => {
    expect(userInfo(obj)).toMatchObject({payload: obj, type: "USERINFO"})
  })
  test("when an object is passed in, the value will be defined", () => {
    expect(userInfo(obj)).toBeDefined()
  })
})

test("test that the updated gig time is passed through and returns the correct value", () => {
  expect(updateGigTime(2)).toMatchObject({payload: 2, type: "UPDATE_GIG_TIME"})
})
