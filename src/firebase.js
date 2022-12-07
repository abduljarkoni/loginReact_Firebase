// ganti urlnya menjadi "firebase/app"
import { initializeApp } from "firebase/app";

// tambahkan getauth
import { getAuth } from "firebase/auth"

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDodDPzZDZG1HNEPqTlOkZjkNigi_1HDv4",
    authDomain: "login-react-firebase-2481e.firebaseapp.com",
    projectId: "login-react-firebase-2481e",
    storageBucket: "login-react-firebase-2481e.appspot.com",
    messagingSenderId: "428468199233",
    appId: "1:428468199233:web:9891e66abadda657e54bc0"
  };

  // Initialize Firebase
const app = initializeApp( firebaseConfig );
// export auth
const auth = getAuth( app );
