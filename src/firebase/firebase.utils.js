import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAciwggfzgdTv_QhC1rbpbzlAWsU4-Hz74",
    authDomain: "crwn-db-9491d.firebaseapp.com",
    databaseURL: "https://crwn-db-9491d.firebaseio.com",
    projectId: "crwn-db-9491d",
    storageBucket: "crwn-db-9491d.appspot.com",
    messagingSenderId: "849600681663",
    appId: "1:849600681663:web:23658df037859b1294d80a",
    measurementId: "G-KPWW8HX03C"
  }

  export const createUserProfileDocument = async (userAuth,additionalData) => {
    
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if(!snapshot.exists){
      const {displayName , email } = userAuth;

      const createdAt = new Date();

      try {

        await userRef.set({
          displayName,
          email,
          createdAt,
          ... additionalData
        });

      } catch (error) {
          console.log("error creating user",error.message);
      }
    }
    return userRef;
    console.log("this is snapshot",snapshot);
  }


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({propmt : 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);


  export default firebase;