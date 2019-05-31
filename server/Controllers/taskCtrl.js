module.exports = {
    getTasks: async (req, res) => {
        //getting all of the tasks from the db.
        //need to recieve identifying information to make db pull.
        //

        const db = req.app.get("db")
        const {username} = req.body
    },
    createTask: async (req, res) => {
        //use gig id to specify where task will go.
        //use data off of req.body for the info.
        const db = req.app.get("db")
        const {gigId} = req.params
        const {/*variable*/} = req.body

        // let task = await db./*db query*/({/*variable*/})
        // task = task[0]

        res.status(200).send("all good")
    },
    deleteTask: async (req, res) => {
        //delete a task based off of the task id.
        
        const db = req.app.get("db")
        const {taskId} = req.params

        // await db./*db query*/({taskId})

        res.status(200).send("deleted")
    },
    editTask: async (req, res) => {
        //edits the task by taking task ID from req.params
        //info will be taken from the req.body

        const db = req.app.get("db")
        const {taskId} = req.params
        const {/*variables*/} = req.body

        // let editedTask = await db./*db query*/({/*variables*/})

        // editedTask = editedTask[0]

        // if(editedTask){
        //     return res.status(400).send("there was a failure in edit")
        // }

        res.status(200).send("edited")
    }
}