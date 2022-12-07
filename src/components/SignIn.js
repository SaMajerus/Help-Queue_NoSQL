import React from "react";
import { auth } from './../firebase.js';
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignIn(){  
  function doSignUp(event){
    event.preventDefault(); 
    const email = event.target.email.value; 
    const password = event.target.password.value; 

    //It's with this function call that "Firebase authentication comes into play" (Lsn 21, 'Signing Up'). 
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User successfully signed up
      })
      .catch((error) => {
        // There was an error with Sign-Up
      });
  }

  return (
    <React.Fragment>
      <h1>Sign up</h1>
      <form onSubmit={doSignUp}>
        <input
          type='text'
          name='email'
          placeholder='email' />
        <input
          type='password'
          name='password'
          placeholder='Password' />
        <button type='submit'>Sign up</button>
      </form>
    </React.Fragment>
  );
}

export default SignIn;