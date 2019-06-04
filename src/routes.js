import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import Register from './components/forms/Register'
import Home from './component/Home'
// import Login from './components/forms/Login'
// import NewUser from './components/forms/NewUser';
import Gig from "./component/Gig"
import UserHome from './component/userHome'
import Register from './component/Register'
import GigWizard from './component/GigWizard'
import SingleGig from './component/SingleGig';

export default (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path="/userHome" component={UserHome} />

    <Route path='/register' component={Register} />
    
    <Route path="/gig" component={Gig} />
    <Route path="/wizard" component={GigWizard} />
    <Route path="/singlegig/:gig_id" component={SingleGig} />
    {/* <Route path='/login' component={() => (
      <Login>
        <Register />
      </Login>
    )} /> */}
    {/* <Route path='/register' component={NewUser} /> */} 
    {/* <Route path='/home' component={Home} /> */}


  </Switch>
)