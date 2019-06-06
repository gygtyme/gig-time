import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './component/Home'
import Gig from "./component/Gig"
import UserHome from './component/userHome'
import Register from './component/Register'
import LearnMore from './component/LearnMore';
import ClientView from './component/ClientView';
import GigWizard from './component/GigWizard'
import SingleGig from './component/SingleGig';
import TaskWizard from './component/TaskWizard';


export default (
  <Switch>
    <Route exact path='/' component={Home} />

    <Route path="/userHome" component={UserHome} />

    <Route path='/register' component={Register} />
    
    <Route path="/gig" component={Gig} />

    <Route path='/learnMore' component={LearnMore} />

    <Route path='/clientView' component={ClientView} />
    <Route path="/wizard" component={GigWizard} />
    <Route path="/singlegig/:gig_id" component={SingleGig} />
    <Route path="/taskwizard/:gig_id" component={TaskWizard} />


  </Switch>
)