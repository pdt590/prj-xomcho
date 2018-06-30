import firebase from '~/plugins/firebase'

export default function (context) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            context.store.dispatch('autoSignIn', user)
        }
    })
}