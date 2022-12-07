import React from "react";
import { auth } from './../firebase.js';
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";   //New import!

function SignIn(){ 
  const [signUpSuccess, setSignUpSuccess] = useState(null);  //New code! 

  function doSignUp(event){ 
    event.preventDefault(); 
    const email = event.target.email.value; 
    const password = event.target.password.value; 

    //It's with this function call that "Firebase authentication comes into play" (Lsn 21, 'Signing Up'). 
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User successfully signed up
        setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`);  //New code!
      })
      .catch((error) => {
        // There was an error with Sign-Up
        setSignUpSuccess(`There was an error signing up: ${error.message}!`);  //New code!
      });
  }

  return (
    <React.Fragment>
      <h1>Sign up</h1>
      {/* New code below! */}
      {signUpSuccess}
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