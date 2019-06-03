import React, {Component} from 'react'
import axios from 'axios';


export default class Register extends Component {
  constructor(){
    super()
    this.state={
      firstName:'', 
      lastName:'', 
      email:'', 
      phone: '', 
      password:''
    }
  }

submitHandler=(e)=> {
  e.preventDefault()

axios.post('/users/register', this.state).then((res)=>{
  console.log(res)
}).catch(err=>console.log(err, 'register failed' ))
}

changeHandler=(e)=> {
  this.setState({
    [e.target.name]:e.target.value
  })
}

  render() {
    return(
      <div>
        <form action="submit">

      <input type="text" name="firstName" placeholder="First Name" onChange={this.changeHandler} required/>

      <input type="text" name="lastName" placeholder="Last Name" onChange={this.changeHandler} required/>

      <input type="email" name="email" placeholder="email" onChange={this.changeHandler} required/>

      <input type="text" name="phone" placeholder="Phone Number" onChange={this.changeHandler} required/>

      <input type="password" name="password" placeholder="password" onChange={this.changeHandler} required/>

        </form>
      </div>
    )
  }
}