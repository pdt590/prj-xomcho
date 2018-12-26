import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyCBJntBA6p16jw20LArZn-lhw6EO5utA6E",
    authDomain: "xomcho-production.firebaseapp.com",
    databaseURL: "https://xomcho-production.firebaseio.com",
    projectId: "xomcho-production",
    storageBucket: "xomcho-production.appspot.com",
    messagingSenderId: "78176232230"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

export default firebase