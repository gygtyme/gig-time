const {GOOGLE}=process.env


module.exports = {
    getClient: async (req, res) => {
        //get client by the client id that is on the gig
        //send back the client information

       const db = req.app.get("db")
       const {id} = req.body
       let client = await db.get_client_by_id({id})
       client = client[0]

       res.status(200).send(client)
    }, 

    sendUpdate: async (req, res)=> {
//sends fromt he gig an update to the client. 
    }, 

    sendFeedback: async (req, res) => {
        console.log(req.session)
      let dbInstance= req.app.get('db')
        let {feedback, gig, clientId:id}= req.body

        let {email, firstName}= req.session.user
        // let gig= req.session.user.gigs.find(el=> {
        //     return +el.client_id===+req.body.clientId
        // })

//need client id so we can send email to client. 
//
      // let client= await dbInstance.get_client_by_id({id})

//db call
      

        
        //nodemailer sends with req.body



  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dropinappinfo@gmail.com',
      pass: GOOGLE
    }
  });
  
  var mailOptions = {  //line 57 can not read title of undefined... need to check that
    from: 'billing@gigtime.com',
    to: `${email}`,
    subject: `A client has left you feedback on one of your gigs.`,
    text: `${firstName}, you have feedback on your gig ${gig.title}. The client's feedback is listed below.  
    ${feedback}
    `
  };
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });




        res.send(req.session)
    },
}