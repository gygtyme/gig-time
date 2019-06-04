module.exports = {
    getClient: async (req, res) => {
        //get client by the client id that is on the gig
        //send back the client information

       const db = req.app.get("db")
       const {id} = req.body
        console.log(id)
       let client = await db.get_client_by_id({id})
       client = client[0]

       console.log(client)

       res.status(200).send(client)
    }
}