import React, { Component } from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Header from './component/header/header'
import Profile from './component/viewProfile/viewProfile'
import View from './component/view/view';
import Product from './component/view/productDetail';
import Cart from './component/cart/cart'
import Home from './component/view/home'
import Slider from './component/view/slider'
import Dashboard from './component/admin/dashboard'

import {connect} from "react-redux";

import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class App extends Component {
    render() {
    return (
        <div>
          <Router>
            <div>
                {!localStorage.getItem('token') || localStorage.getItem('role')==='User'?(<Header/>):null}
              <Alert stack={{limit: 1, spacing: 50}} timeout={2000} offset={40}  effect='slide' />
              <Switch>
                  <Route exact path='/dashboard' component={Dashboard} />
                  <Route exact path='/slider' component={Slider} />
                  <Route exact path='/profile' component={Profile}/>
                  <Route exact path='/home' component={View}/>
                  <Route exact path='/cart' component={Cart}/>
                  <Route exact path='/detail/:id/:sid' component={Product}/>
                  <Route exact path='/:id' component={View}/>
                  <Route exact path='/' component={Home}/>
              </Switch>
          </div>
          </Router>
        </div>
    );
  }
}

const mapStateToProps=(state)=>{
    return({
        token:state.register.token,
        role:state.register.role,
    })
}


export default (connect(mapStateToProps,null)(App))


