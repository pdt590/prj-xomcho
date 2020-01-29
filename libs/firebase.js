import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyAjn0msAQdtmSdsVBJgDEvI723diqHOT2U",
    authDomain: "xomcho-prod-f4578.firebaseapp.com",
    databaseURL: "https://xomcho-prod-f4578.firebaseio.com",
    projectId: "xomcho-prod-f4578",
    storageBucket: "xomcho-prod-f4578.appspot.com",
    messagingSenderId: "345792245329"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

export default firebase