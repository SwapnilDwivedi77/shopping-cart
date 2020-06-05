import './App.css';
import HomePage from './pages/homepage/homepage.component.jsx'
import {Switch,Route,} from "react-router-dom";
import ShopPage from './pages/shop/shop.component'
import Header from './component/header/header.component'
import SignInAndSignUp  from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {auth,createUserProfileDocument} from './firebase/firebase.utils'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import {setCurrentUser} from './component/redux/user/user.actions'
class App extends Component {

  
  unsubscribeFromAuth = null

    componentDidMount(){
      const {setCurrentUser}= this.props;
     this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(onSnapshot => {
            setCurrentUser({
              id: onSnapshot.id,
              ...onSnapshot.data()
            });
        });
      }

      setCurrentUser(userAuth);
     });
    }

componentWillUnmount(){
  this.unsubscribeFromAuth();
}
    
  render() {
    return (
      <div>
         <Header />
      <Switch>
     <Route exact path ='/' component={HomePage}/>
     <Route  path ='/shop' component ={ShopPage}/>
     <Route path ='/signin' component ={SignInAndSignUp}/>
      </Switch> 
      
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))

})
export default connect(null,mapDispatchToProps)(App);
