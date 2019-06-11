import React, {Component} from "react"
// import dotenv from "dotenv"
// import {PayPalButton} from "react-paypal-button"
// import {dropin} from "braintree-web-drop-in"
import Axios from "axios";
import braintree from "braintree"

// const env = dotenv.config()

// const CLIENT = {
//     sandbox: env.PAYPAL_CLIENT_ID_SANDBOX,
//     production: env.PAYPAL_CLIENT_ID_PRODUCTION
// }
// const ENV = process.env.NODE_ENV === "production" ? "production" : "sandbox"


// class PaypalView extends React.Component{
//     render(){
//             return (
//               <PayPalButton
//                 env='sandbox'
//                 sandboxID='Ab0mEsnJwnWFJWU_dK95raMYsURtPDlD-TnVqGgeYYMD0y56Lvmfb7NToAWeO7OC4x9C7b38sNoE3hdl'
//                 amount='0.01'
//                 currency='USD'
//                 onPaymentStart={() => console.log('payment started')}
//                 onPaymentSuccess={(res) => console.log('payment complete', res)}
//                 onPaymentError={(msg) => console.log('payment error', msg)}
//                 onShippingChange={(data) => {
//                   console.log('onShippingChange', data)
//                   const shippingAmount = 1.00
                  // run code to calculate and update your shipping charges
                  // this callback will also work as an async funciton
                  // must return a number
                //   return shippingAmount
//                 }}
//               />
//             )
//           }
        
// }
// export default PaypalView



class PaypalView extends Component {
    state = {
        tokenKey: ""
    }
    componentDidMount(){
        Axios.get("/client_token").then(res => {
            this.setState({
                tokenKey: res.data
            })
        })
    }
    handleSubmit = () => {
        braintree.dropin.create({
            authorization: this.state.tokenKey,
            container: "#dropin-container"
        }).then(function(err, instance){
            console.log(instance)
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <button onClick={this.handleSubmit}>click me!</button>
            </div>
        );
    }
}

export default PaypalView;