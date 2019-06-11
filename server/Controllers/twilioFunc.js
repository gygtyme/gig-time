require('dotenv').config()

const {TWILIO_SID, TWILIO_AUTH_TOKEN}= process.env

const client=require('twilio')(TWILIO_SID, TWILIO_AUTH_TOKEN)


module.exports= {

textAlert: (clientPhone, gigTotal)=>{

  client.messages.create({
    body:`Your project has been finished! Please send ${gigTotal} to Jacob at your earliest convenience.`,
    from:"+13852175119", 
    to:`${clientPhone}` 
  }).then(message=>console.log("the message worked you're a genius"
  return "message sent"
  ))


}



}





