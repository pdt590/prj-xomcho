import firebase from '~/plugins/firebase'

export default function (context) {
    // * This function supports persistent storage for auth-user at client side (it is similar with using localstorage)
    // * It can run on both client and server side
    firebase.auth().onAuthStateChanged(
        user => {
            if (user) {
                context.store.dispatch('users/autoSignIn', user)
            }
        }
    )
}