import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';
firebase.initializeApp(firebaseConfig);


const SignUpEmailPass = () => {
    const [userInfo , setUserInfo] = useState({
        isLoggedIn : false,
        name :'',
        email : '',
        password : '',
        photo : '',
        error : '',
        success : false,
      });
      const [newUser , setNewUser] = useState(false)
    const handleSubmit = (e)=>{
        const {email , password} = userInfo
        // sign up 
        if(newUser && email && password){
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const successFullUser = {...userInfo}
                    successFullUser.error = ""
                    successFullUser.success = true
                    setUserInfo(successFullUser)
                    updateName(userInfo.name)
                
                })
                .catch((error) => {
                   const errorUser = {...userInfo}
                   errorUser.error = error.message;
                   errorUser.success = false;
                   setUserInfo(errorUser)
                    
                });
        }
        // sign in 
        if (!newUser && email && password){
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const successFullUser = {...userInfo}
                successFullUser.error = ""
                successFullUser.success = true
                setUserInfo(successFullUser)
                console.log(user);
      
            })
            .catch((error) => {
                const errorUser = {...userInfo}
                errorUser.error = error.message;
                errorUser.success = false;
                setUserInfo(errorUser)
  });
        }

        e.preventDefault();
    }
    const updateName = name =>{
        const user = firebase.auth().currentUser;
        user.updateProfile({
        displayName: name,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
        
        });  
    }
    const handleBlur = (e)=>{
         let isFieldValid = true;
        if(e.target.name ==="email"){
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          isFieldValid = re.test(e.target.value)
        }
         else if(e.target.name === "password"){
            isFieldValid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/.test(e.target.value);
        }

        if(isFieldValid){
            const newUserInfo = {...userInfo}
            newUserInfo[e.target.name] = e.target.value
            setUserInfo(newUserInfo)
        }
      }
    return (
        <div>
            <h3>Siun Up Section</h3>
            <p> Name : {userInfo.name}</p>
            <p> Password : {userInfo.password}</p>
            <p>Email : {userInfo.email}</p>
            <input type="checkbox" name="newUser" onChange={()=> setNewUser(!newUser)} />
            <label htmlFor="newUser" >New User Sign Up</label>
            <form onSubmit={handleSubmit}>
                {newUser && <input type="text" name="name" placeholder="Enter Your Name" onBlur={handleBlur} required />}
                <br />
                <input type="email" name="email" placeholder="Enter Your Email" onBlur={handleBlur} required />
                <br />
                <input type="password" name="password" placeholder="Enter Your Password" onBlur={handleBlur} required />
                <br />
                <input type="submit" value={newUser?'Sign Up':"Sign In"} />
            </form>
            {
                userInfo.success?<p  style={{color:"green"}}>User Account SuccessFully {newUser?"Created":"Logged in"}</p>:<p style={{color:"red"}}>{userInfo.error}</p>
            }
        </div>
    );
};

export default SignUpEmailPass;