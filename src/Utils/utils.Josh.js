import axios from "axios"

module.exports = {
    getClient: (id) => {
        axios.post("/api/clients", {id}).then(res => {
            return res.data
        })
    },
    
}