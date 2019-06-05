module.exports = {
    getClient: async (req, res) => {
        //get client by the client id that is on the gig
        //send back the client information

       const db = req.app.get("db")
       const {id} = req.body
       let client = await db.get_client_by_id({id})
       client = client[0]

       res.status(200).send(client)
    }
}