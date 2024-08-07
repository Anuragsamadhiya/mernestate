import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { app } from '../Googlefirbase'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/useSlice';
import { useNavigate } from 'react-router-dom'

//SIGN-IN WITH GOOGLE ..CODE
export default function Googleauth() {
    const dispatch = useDispatch();
 const navigate=useNavigate()
    const handleform=async()=>{
try {
    const provider=new GoogleAuthProvider(app) //firebase function 
    const auth=getAuth()
    const result=await signInWithPopup(auth,provider) //for popup window when clicking sign with google triggers a popup window for the user to sign in with Google.
    //The signInWithPopup function from Firebase Authentication returns a Promise that resolves with a UserCredential object when the sign-in process completes successfully

const res=await fetch('https://mern-estate-4rhd.onrender.com/api/user/Google',{
    method:'POST',
   headers:{
    "Content-Type":'application/json'
   },
   credentials:'include',
   body:JSON.stringify({name:result.user.displayName,email:result.user.email,photo:result.user.photoURL})
})
console.log(result)
const data=await res.json();
console.log(data);

dispatch(signInSuccess(data));
navigate('/');
} catch (error) {
    console.log("user not respond",error)
}
    }
  return (
    <div>
<button type='button' onClick={handleform} className="btn btn-block bg-red-600 text-white uppercase hover:bg-red-600 hover:opacity-85">Continue With Google</button>    </div>
  )
}




//const result=await signInWithPopup(auth,provider)
// return this type detail
 // user: {
    //     uid: "1234567890",
    //     displayName: "John Doe",
    //     email: "john.doe@example.com",
    //     photoURL: "https://example.com/photo.jpg",
    //     providerData: [
    //       {
    //         providerId: "google.com",
    //         uid: "google-1234567890",
    //         displayName: "John Doe",
    //         email: "john.doe@example.com",
    //         photoURL: "https://example.com/photo.jpg"
    //       }
    //     ]
    //   },
    //   credential: {
    //     // Authentication credential details
    //   },
    //   additionalUserInfo: {
    //     isNewUser: false,
    //     providerId: "google.com",
    //     profile: {
    //       // Google profile information
    //     }
    //   }
    // }
    