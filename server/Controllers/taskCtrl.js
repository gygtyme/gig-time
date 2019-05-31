module.exports = {
    createTask: async (req, res) => {
        //use gig id to specify where task will go.
        //use data off of req.body for the info.

        const db = req.app.get("db")
        const {gigId} = req.params
        const {task_desc, task_title} = req.body

        let task = await db.create_task({gigId, task_title, task_desc})
        task = task[0]

        res.status(200).send(task)
    },
    deleteTask: async (req, res) => {
        //delete a task based off of the task id.
        
        const db = req.app.get("db")
        let {taskId, gig_id} = req.params

        let id = taskId

        await db.delete_task({id, gig_id})

        res.sendStatus(200)
    },
    editTask: async (req, res) => {
        //edits the task by taking task ID from req.params
        //info will be taken from the req.body

        const db = req.app.get("db")
        const {task_id} = req.params
        const {task_title, task_desc} = req.body

        let editedTask = await db.edit_task({task_id, task_title, task_desc})

        editedTask = editedTask[0]

        if(editedTask){
            return res.status(400).send("there was a failure in edit")
        }

        res.status(200).send(editedTask)
    }
}