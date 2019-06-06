const braintree = require("braintree")

const gateway = braintree.connect

module.exports = {
    getClient: async (req, res) => {
        //get client by the client id that is on the gig
        //send back the client information

       const db = req.app.get("db")
       const {id} = req.body
       let client = await db.get_client_by_id({id})
       client = client[0]

       res.status(200).send(client)
    },
    clientPayment: async (req, res) => {
        let saleRequest = {
            amount: req.body.amount,
            merchangAccountId: "USD", //type of currency
            paymentMethodNonce: req.body.nonce,
            orderId: "Mapped to PayPal Invoice Number",
            descriptor: {
                name: "Descriptor displayed in customer CC statements..."
            },
            shipping: {
                firstName: "Josh",
                lastName: "B",
                company: "GigTime",
                streetAddress: "123 Nonya",
                locality: "Business",
                region: "FU",
                postalCode: "42069",
                countryCodeAlpha2: "US"
            },
            options: {
                paypal: {
                    customField: "PayPal gonna suck deez nutz",
                    descriptor: "Description of the suck transaction"
                },
                submitForSettlement: true
            }
        }
        gateway.transaction.sale(saleRequest, function(err, result){
            if(err){
                res.send("your mom is an error")
            }else if (result.success){
                res.send("successful transaction.  you lost your money")
            }else {
                res.send("i already said your mom was an error")
            }
        })
    }
}