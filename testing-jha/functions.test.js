const functions = require('./functions.js')
const axios= require('axios')

test('sendEmail Should send an email', () => {
  expect( functions.sendEmail() ).toEqual('email sent')
})


// test('testDb old gigs should be 1 shorter than new gigs', ()=> {
//   expect(functions.testDb).toEqual()
// })

// test('get everthing should return a response with a user on it', ()=>{


//   expect(functions.testGet()).toContain(session.user)
// })


test('reducer on update gigs should update state', ()=> {
  expect(functions.reducer({}, {
    type:'UPDATE_GIGS', 
    payload: ['gig1', 'gig2', 'gig3']
  })).toEqual({gigs:['gig1', 'gig2', 'gig3']})
  expect(functions.reducer({}, {
    type:'UPDATE_GIGS', 
    payload: ['gig2', 'gig4', 'gig7']
  })).toEqual({gigs:['gig2', 'gig4', 'gig7']})
})