module.exports = {
  getGigTasks: async (req, res) => {
    let db = req.app.get('db')
    let { gigId } = req.params

    //doesn't exist yet

    try {
      let gigTasks = await db.get_gig_tasks([gigId])

      res.status(200).send(gigTasks)

    }

    catch (err) {
      res.status(500).send(err)
    }




  },

  createTask: async (req, res) => {
    let { taskTitle, taskDesc, gig_id } = req.body
    let gigId = +gig_id
    console.log(req.body, 'did this get fired?')
    let db = req.app.get('db')


    try {
      let dbRes = await db.create_task({taskTitle, taskDesc, gigId})

      // let dbRes = await db.get_gig_tasks()
      console.log(dbRes)
      res.status(200).send(dbRes)
    } catch (error) {
      res.status(500).send(error)
    }



  },

  editTask: async (req, res) => {
   
    console.log(`update task fired`, req.params, req.body)
    const db = req.app.get('db')
    const { taskId } = req.params;
    let id = taskId
    const { task_title, task_desc } = req.body  
    db.edit_task({id, task_title, task_desc}).then(() => {
      res.sendStatus(200)
    }).catch(err => console.log("error", err))


  },

 
  deleteTask: (req, res) => {
    const db = req.app.get('db')
    let { taskId } = req.params
    console.log(`delete gig was fired`, taskId)
    
    db.delete_task({taskId}).then(() => { 
      res.sendStatus(200)
    }).catch(err => console.log("error", err))
  },

}
