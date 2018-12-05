import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAu6dwrb78Awh57LoH9G1O35G5cBcqGPiA",
    authDomain: "tadicho-dev.firebaseapp.com",
    databaseURL: "https://tadicho-dev.firebaseio.com",
    projectId: "tadicho-dev",
    storageBucket: "tadicho-dev.appspot.com",
    messagingSenderId: "354721765773"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

export default firebase