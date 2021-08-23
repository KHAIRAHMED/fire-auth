import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';
firebase.initializeApp(firebaseConfig);

const Facebook = () => {
const provider = new firebase.auth.FacebookAuthProvider();
const handleFbSignIn = ()=>{
    firebase
  .auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    console.log("testing result" ,result)
    // The signed-in user info.
    var user = result.user;
    console.log("user testing" , user);

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });
}
    return (
        <div>
            <button onClick={handleFbSignIn}>Log in Facebook </button>
        </div>
    );
};

export default Facebook;