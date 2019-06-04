const {toggle, breakTime} = require('../Utils/utils_Tiago')

//tiago test1

describe('testing toggle function', () => { 
  test('if it is false return true', ()=>{
    expect(toggle(false)).toBe(true)
  })
  test('if it is true return false', ()=>{
    expect(toggle(true)).toBe(false)
  })
})

describe('testing function takeBreak', ()=>{
  test('it will return sum of 2 positive int', ()=>{
    expect(breakTime(1, 2)).toBe(3)
  })
  test('return the sum of negative int and positive int', ()=>{
    expect(breakTime(-1, 2)).toBe(1)
  })
  test('return sum of 2 negative int', ()=>{
    expect(breakTime(-1, -2)).toBe(-3)
  })
})