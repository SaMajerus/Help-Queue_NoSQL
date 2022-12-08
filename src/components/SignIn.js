import React, { useState } from "react"; 
import { auth } from './../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"; //New import!


function SignIn(){ 
  const [signUpSuccess, setSignUpSuccess] = useState(null); 
  const [signInSuccess, setSignInSuccess] = useState(null); 
  const [signOutSuccess, setSignOutSuccess] = useState(null);  //New state variable  

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

  function doSignIn(event){ 
    event.preventDefault(); 
    const email = event.target.signinEmail.value; 
    const password = event.target.signinPassword.value; 

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //User successfully signed in
        setSignInSuccess(`You've successfully signed in as ${userCredential.user.email}!`); 
      })
      .catch((error) => {
        //There was an error with Sign-In
        setSignInSuccess(`There was an error signing in: ${error.message}!`); 
      });
  }

  //New [Sign-Out] function
  function doSignOut(){
    signOut(auth)
      .then(function() {
        setSignOutSuccess("You have successfully signed out!");
      }).catch(function(error) {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`);
      });
  }

  return (
    <React.Fragment>
      <h1>Sign up</h1>
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

      <h1>Sign In</h1>
      {signInSuccess}
      <form onSubmit={doSignIn}>
        <input
          type='text'
          name='signinEmail'
          placeholder='email' />
        <input
          type='password'
          name='signinPassword'
          placeholder='Password' />
        <button type='submit'>Sign in</button>
      </form>

      {/* New sign out button*/}
      <h1>Sign Out</h1>
      {signOutSuccess}
      <br />
      <button onClick={doSignOut}>Sign out</button>
    </React.Fragment>
  );
}

export default SignIn;