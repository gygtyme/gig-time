const express = require('express')
require('dotenv').config()
const app = express()
const massive = require('massive')
const gigCtrl = require('./Controllers/gigCtrl')
const taskCtrl = require("./Controllers/taskCtrl")
// const session = require('express-session')




const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env



app.use(express.json())

// app.use(express.static(`${__dirname}/../build`));  

// app.use(session({
//   secret: SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24
//   }
// }))

massive(CONNECTION_STRING).then((database) => {
  app.set('db', database)
  console.log(`1- db is connected`)
  app.listen(SERVER_PORT, () => {
    console.log(`2-server is connected on ${SERVER_PORT}`)
  })
})


app.get('/api/gigs', gigCtrl.getGigs)
app.post('/api/gigs', gigCtrl.createRecipe)
app.get('/api/gigs/:title', gigCtrl.getGigs)
app.delete('/api/gigs/:id', gigCtrl.delete)
app.put('/api/gigs/:id', gigCtrl.update)
app.post("/api/tasks/:id", taskCtrl.createTask)
app.put("/api/:gig_id/:id", taskCtrl.editTask)



