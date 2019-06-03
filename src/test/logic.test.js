const {toggle} = require('../Utils/utils_Tiago')

//tiago test1

describe('testing toggle function', () => { 
  test('if it is false return true', ()=>{
    expect(toggle(false)).toBe(true)
  })
})