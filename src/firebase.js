 import firebase from "firebase/app";
 import "firebase/firestore"
 import "firebase/auth";
 const firebaseConfig = {
    apiKey: "AIzaSyCRSq8fT6Lj95xogpWmi4XaDhh14yUDrzk",
    authDomain: "think-piece-2402f.firebaseapp.com",
    databaseURL: "https://think-piece-2402f.firebaseio.com",
    projectId: "think-piece-2402f",
    storageBucket: "",
    messagingSenderId: "175228985544",
    appId: "1:175228985544:web:085ba9cddd236fa55b45fd"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);  

  export const firestore = firebase.firestore();
  export const auth = firebase.auth();

  export const provider = new firebase.auth.GoogleAuthProvider();
  export const signInWithGoogle = () =>  auth.signInWithPopup(provider);
  export const signOut = () => auth.signOut();

  // for signUp
  export const createUserProfileDocument = async (user, additionalData) => {
    if(!user) return;

    const userRef = firestore.collection('users').doc(user.uid);
    const snap = await userRef.get();
    if(!snap.exists){
      // const {displayName, photoUrl} = additionalData;
      const {email,photoUrl} = user;
      const createdAt = new Date();
      try{
        await userRef.set({
          email,
          photoUrl,
          createdAt,
          ...additionalData
        })
    }catch(err) {
      console.error('Error creating user '+err.message);
    }
  }

  return getUserDocument(user.uid);
}
  
export const getUserDocument = async (uid) => {
  if(!uid) return null;
  try{
    const userDoc = await firestore.collection('users').doc(uid).get();

    return {uid, ...userDoc.data()}
  }catch(err) {
      console.error('Error getting user '+err.message);
    }
}

window.firebase = firebase;

  export default firebase;