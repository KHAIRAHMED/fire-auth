import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';
firebase.initializeApp(firebaseConfig);

const GoogleSignIN = () => {
    const [userInfo , setUserInfo] = useState({
      isLoggedIn : false,
      name :'',
      email : '',
      photo : '',
    });
  const provider = new firebase.auth.GoogleAuthProvider(); //Google sign in provider

  // google sign in start start
  const handleSignIn = ()=>{
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    const {email,displayName , photoURL} = result.user;
    const signedInUser = {
      isLoggedIn : true,
      name : displayName,
      email : email,
      photo : photoURL,
    } 
    setUserInfo(signedInUser)
 
  })
  .catch((error)=>{
    console.log(error);
    console.log(error.message);
    console.log(error.email);
  })
  }

  // google sign in function end

  // google sign out function start

  const handleSignOut = ()=>{
    console.log("signOut")
    firebase.auth().signOut()
    .then((res) => {
      const signOutUser = {
        isLoggedIn : false,
        name :'',
        email : '',
        photo : '',
      }
      setUserInfo(signOutUser)
    }).catch((error) => {
      // An error happened.
    });
  }
  // google sign out function end 

  // google sign up function start 


  return (
    <div>
      {/* google sign in UI start */}

      {
        userInfo.isLoggedIn?<button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleSignIn}>Sign In</button>
      }
      {
        userInfo.isLoggedIn && <div>
          <p> Name {userInfo.name}</p>
          <p>Email {userInfo.email}</p>
          <img src={userInfo.photo} alt="" width="50%" />
        </div>
      }

      {/* google sign in UI end  */}
      

    </div>
  );
};

export default GoogleSignIN;