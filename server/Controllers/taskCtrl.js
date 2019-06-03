// module.exports = {
//   getGigTasks= async (req, res) => {
//     let db = req.app.get('db')
//     let { gigId } = req.params

//     //doesn't exist yet

//     try {
//       let gigTasks = await db.get_gig_tasks([gigId])

//       res.status(200).send(gigTasks)

//     }

//     catch (err) {
//       res.status(500).send(err)
//     }




//   },

// createTask= async (req, res) => {
//   let {title, description, client, gigId}= req.body
//   let db= req.app.get('db')
// //doesn't exist
 
// try {
//   await  db.create_task([title, description, client])
  
//    let dbRes= await db.get_gig_tasks()
//   res.status(200).send(dbRes)
// } catch (error) {
//   res.status(500).send(error)
// }



// },

// editTask= async (req, res) => {
//   let db= req.app.get('db')
//   let {taskId}= req.params
//   let {newTitle, newDescription, gigId}= req.body
//   //doesn't exist
// try {
//   await db.edit_task([newTitle, newDescription])
//   let dbRes= await db.getGigTasks(gigId)

//   res.status(200).send(dbRes)
// } catch (error) {
// res.status(500).send(error)
// }



// }, 

// deleteTask= async (req, res)=> {
//   let db= req.app.get('db')
//   let {taskId}= req.params

// try {
//   await db.delete_task(taskId)
//   res.sendStatus(200)
// } catch (error) {
//   res.status(500).send(error)
// }
// }

// }