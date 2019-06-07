const { GOOGLE } = process.env

module.exports = {
  getGigs: (req, res) => {
    console.log(`get gigs fired`)
    
    
    const db = req.app.get('db')
    
    if(req.session.user){
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
  }


  },

  createGig: async (req, res) => {
    console.log(`create gig was fired`, req.body)
    const { session } = req
    const { id: user_id } = req.session.user
    const db = req.app.get('db')
    const { gigName, gigDesc, rate, clientFName, clientLName, clientPhone, clientEmail  } = req.body 
    

    try {
      let newClient=await db.create_client([clientFName, clientLName, clientEmail, clientPhone])

      await db.create_gig([user_id, gigName, gigDesc, rate, newClient[0].id])
      let newGigs= await db.get_gigs_by_user_id(user_id)
      session.gigs=newGigs

      res.status(200).send(newGigs)

    } catch (error) {
      console.log(error, 'create gig error')
      res.status(500).send(error)
    }

  },

  delete: (req, res) => {
    const db = req.app.get('db')
    const { id } = req.params
    console.log(`delete gig was fired`, id)
    // const { id: user_id } = req.session.user 

    db.delete_gig([id]).then(() => {
      res.status(200).send(gig)
    }).catch(err => console.log("error", err))
  },

  update: (req, res) => {
    console.log(`update gigs fired`, req.params, req.body)
    const db = req.app.get('db')
    const { id } = req.params;
    const { title, description, project_rate } = req.body
    db.update_gig({ id, title, description, project_rate }).then(() => {
      res.sendStatus(200)
    }).catch(err => console.log("error", err))
  },

  billGig: async (req, res) => {

    console.log('bill hit!')
    let db = req.app.get('db')

    let { total } = req.body

    console.log(req.params)

    //get client email for gig

    try {
      let gig = await db.get_gig_by_gig_id([req.params.gigId])
      let id = gig[0].client_id
      console.log(id, 'client ID')
      let client = await db.get_client_by_id({ id })
      console.log("gig", gig[0], "client", client)



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

      res.sendStatus(200)

    } catch (error) {
      res.status(500).send(error)
      console.log(error)
    }

    //

    //send nodemailer to client email


    //make body for client email


    //status 200



  },

  updateGigTime: async (req, res) => {
    console.log(`update gigTime fired`, req.params, req.body)
    const db = req.app.get('db')
    let { id } = req.params;
    id = +id
    const { totalGigTime } = req.body
    console.log(id)
    let oldTime = await db.get_gig_total_time(id)
    console.log(oldTime[0])
    let newTime = oldTime[0].total_time + totalGigTime

    db.update_gig_total_time({ id, newTime }).then(() => {
      res.sendStatus(200)
    }).catch(err => console.log("error", err))
  }, 

  getSingleGig: async (req, res)=> {
    console.log('hit')
    

    try {
      let db= req.app.get('db')
      let gig=  await db.get_gig_by_gig_id(+req.params.gigId)
      
      res.status(200).send(gig[0])
    } catch (error) {
      res.send(error)
      console.log(error)
    }



  }
  ,

  togglePaid: (req, res) => {
    console.log(`update paid fired`, req.params, req.body)
    const db = req.app.get('db')
    const { id } = req.params;
    const { is_paid } = req.body
    db.update_paid({ id, is_paid }).then(() => {
      res.sendStatus(200)
    }).catch(err => console.log("error", err))
  },

  toggleBilled: (req, res) => {
    console.log(`update paid fired`, req.params, req.body)
    const db = req.app.get('db')
    const { id } = req.params;
    const { is_billed } = req.body
    db.update_billed({ id, is_billed }).then(() => {
      res.sendStatus(200)
    }).catch(err => console.log("error", err))
  },

    paidGigs: (req, res) => {
    console.log(`get paid fired`)
    const db = req.app.get('db')
    let { id } = req.session.user
    id = String(id)
    db.paid_gigs(id).then((gigs) => {  
      res.status(200).send(gigs)
    }).catch(err => console.log("error", err))
  },

  notPaidGigs: (req, res) => {
    console.log(`get not paid fired`)
    const db = req.app.get('db')
    let { id } = req.session.user
    id = String(id)
    db.not_paid_gigs(id).then((gigs) => {  
      res.status(200).send(gigs)
    }).catch(err => console.log("error", err))
  }



}