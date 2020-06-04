import React, { Component } from 'react'
import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import {auth,signInWithGoogle} from '../../firebase/firebase.utils'
export default class SignIn extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email:'',
             password:''
        }
    }
    

    handleSubmit = async event =>{
        event.preventDefault();

       const {email,password}= this.state;

       try{
           await auth.signInWithEmailAndPassword(email,password);
           this.setState({
            email:'', password:''
        })

       } catch(error){
            console.log(error);
       }
       
        
    }
    
    handleChange = event => {
        const {value,name}=event.target
        this.setState({
            [name]:value
        })
    }


    render() {
        return (
            <div className='sign-in'>

                <h2> I Already have an account</h2>
                <span> Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                {/* <label>Email</label> */}

                    <FormInput 
                    name='email' 
                    type='email' 
                    value={this.state.email} 
                    label="Email"
                    required 
                    handleChange={this.handleChange} />

                   
{/* <label>Password</label> */}
                    
                    <FormInput 
                    name='password'  
                    label="Password"
                    type='password' 
                    value={this.state.password} 
                    required 
                    handleChange={this.handleChange}
                    />

                    <div className='buttons'>
                    <CustomButton type='submit' value='Submit Form'>Sign In</CustomButton>
                    <CustomButton onClick ={signInWithGoogle} isGoogleSignIn> Sign in with Google</CustomButton>
                    </div>
                </form>
                
            </div>
        )
    }
}
