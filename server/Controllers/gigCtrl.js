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
      
      await db.create_gig([user_id, gigName, gigDesc, rate])
      await db.create_client([clientFName, clientLName, email, clientPhone])
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
  }
}