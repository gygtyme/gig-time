module.exports = {
  getGigs: (req, res) => {
    console.log(`get gigs fired`)
    const db = req.app.get('db')
    let { id } = req.session.user
    id = String(id)

    if (req.query.title) {
      let searchTerm = `%${req.query.title}%`
      db.search_gig([searchTerm]).then((recipe) => {  //I will need to add id to db.searcg_gig([id, searchTerm])
        res.status(200).send(recipe)   //probably will need to fetch tasks here for all gigs
        })
    } else {

      db.display_gigs(id).then((recipe) => {  //add id to db.display_gigs([id])
        res.status(200).send(recipe)
      }).catch(err => console.log("error", err))
    }
  },

  createGig: async (req, res) => {
    console.log(`create gig was fired`, req.body)
    const { session } = req
    const { id:user_id } = req.session.user
    const db = req.app.get('db')
    const { gigName, gigDesc, rate, clientFName, clientLName, clientPhone, email  } = req.body 
    

    try {
      let newClient=await db.create_client([clientFName, clientLName, email, clientPhone])
      
      await db.create_gig([user_id, gigName, gigDesc, rate, newClient[0].client_id])
      let newGigs= await db.get_gigs_by_user_id(user_id)
  
      res.status(200).send(newGigs)

    } catch (error) {
      res.status(500).send(error)
    }

  },

  delete: (req, res) => {
    console.log(`delete gig was fired`)
    const db = req.app.get('db')
    const { id } = req.params
    // const { id: user_id } = req.session.user 

    db.delete_gig([id]).then(() => { //we dont have a session to get user id yet
      // res.status(200).send(gig)
    }).catch(err => console.log("error", err))
  },

  update: (req, res) => {
    console.log(`update gigs fired`)
    const db = req.app.get('db')
    const { id } = req.params;
    const { title, description, total_time, project_rate, client_id, is_paid, is_billed } = req.body  //pass in whatever we want it to have

    db.update_gig({id, title, description, total_time, project_rate, client_id, is_paid, is_billed}).then(() => {
      res.sendStatus(200)
    }).catch(err => console.log("error", err))
  }, 

  billGig: async (req, res) => {
    req.app.get('db')
    let gigId= req.params
    let {total, clientId}= req.body
    

    
//get client email for gig
let gig= await db.get_gig_by_gig_id(gigId)

let client= await db.get_client_by_id(gig[0].client_id)
//

//send nodemailer to client email


//make body for client email


//status 200



var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dropinappinfo@gmail.com',
    pass: GOOGLE
  }
});

var mailOptions = {
  from: 'billing@gigtime.com',
  to: `${client[0].client_email}`,
  subject: `Your Project is done! Here's your invoice!`,
  text: `${client[0].client_first}, Thank you for your business! I have completed ${gig[0].title}. `
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});


  },

  updateGigTime: async(req, res) => {
    console.log(`update gigTime fired`, req.params, req.body)
    const db = req.app.get('db')
    let { id } = req.params;
    id = +id
    const { totalGigTime } = req.body 
    console.log(id)
    let oldTime = await db.get_gig_total_time(id)
    console.log(oldTime[0])
    let newTime = oldTime[0].total_time + totalGigTime

    db.update_gig_total_time({id, newTime}).then(() => {
      res.sendStatus(200)
    }).catch(err => console.log("error", err))
  }
 }