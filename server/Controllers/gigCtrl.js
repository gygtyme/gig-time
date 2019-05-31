module.exports = {
  getGigs: (req, res) => {
    console.log(`get gigs fired`)
    const db = req.app.get('db')
    // let { id } = req.session.user
    // id = String(id)

    if (req.query.title) {
      let searchTerm = `%${req.query.title}%`

      db.search_gig([searchTerm]).then((recipe) => {  //I will need to add id to db.searcg_gig([id, searchTerm])
        res.status(200).send(recipe)
      })
    } else {

      db.display_gigs().then((recipe) => {  //add id to db.display_gigs([id])
        res.status(200).send(recipe)
      }).catch(err => console.log("error", err))
    }
  },

  createRecipe: (req, res) => {
    console.log(`create gig was fired`)
    // const { session } = req

    const db = req.app.get('db')
    const { title, instructions, image } = req.body //need db schema to be able to know what to pass in
    // const { id } = req.session.user

    db.create_recipe([id, title, instructions, image]).then((id_array) => { //use the same as line 27
      res.sendStatus(200)
    }).catch(err => console.log("error", err))
  },

  delete: (req, res) => {
    console.log(`delete gig was fired`)
    const db = req.app.get('db')
    const { id } = req.params
    // const { id: user_id } = req.session.user 

    db.delete_recipe([id, user_id]).then((gig) => { //we dont have a session to get user id yet
      res.status(200).send(gig)
    }).catch(err => console.log("error", err))
  },

  update: (req, res) => {
    console.log(`update gigs fired`)
    const db = req.app.get('db')
    const { id } = req.params;
    const { title, instructions, ingredients } = req.body  //pass in whatever we want it to have

    db.update_recipe([title, instructions, id]).then(() => {
      res.sendStatus(200)
    }).catch(err => console.log("error", err))
  },
}