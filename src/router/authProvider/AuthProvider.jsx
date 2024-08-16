import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import auth from '../../firebase/Firebase.config';


export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loader,setLoader] = useState(true);

  const createUser = (email,password)=>{
    setLoader(true);
    return createUserWithEmailAndPassword(auth,email,password);
  }
  
  const signIn = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  }
  const logOut = () => {
    setLoader(true);
    return signOut(auth)
  }

  const googleLogin = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  }
  
  const githubLogin = () => {
    setLoader(true);
    return signInWithPopup(auth, githubProvider);
  }

 
  const updateUserProfile = (name,photo) => {
    return updateProfile(auth.currentUser, {
       displayName: name,
       photoURL: photo,
     })
   }


const AuthInfo = {
  user,
  loader,
  createUser,
  updateUserProfile,
  signIn,
  logOut,
  googleLogin,
  githubLogin
}

useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth,currentUser =>{
    setUser(currentUser);
    setLoader(false)
  })
  return() => unsubscribe();
},[])

  return (
    <AuthContext.Provider value={AuthInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;