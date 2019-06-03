const bcrypt= require('bcryptjs')

module.exports= {

 register: async (req, res) => {
   console.log('reg hit')
    let dbInstance = req.app.get('db')
    let { phone, firstName, email, lastName } = req.body
    const { session } = req
    phone = +phone
    let exists = await dbInstance.find_user_by_phone(phone)
    exists = +exists[0].count

    //if user does not exist
    if (exists !== 0) {
      return res.sendStatus(409)
    }


    let salt = bcrypt.genSaltSync(10)
    let hashedPass = bcrypt.hashSync(req.body.pass, salt)


    const user = await dbInstance.register_new_user([firstName, lastName, email, phone, hashedPass])

    // console.log(user[0])
    //log in user automatically

user[0].isLoggedIn=true

delete user[0].pass_hash

    session.user = user[0], 
      

    res.status(200).send(session)

  },

  login:(req, res)=>{

  },

  logout:(req, res)=>{

  },

  deleteUser:(req, res)=>{

  },

}