import firebase from '~/plugins/firebase'

export default function (context) {
    // * This function supports persistent storage for auth-user at client side (it is similar with using localstorage)
    // * It can run on both client and server side
    // * It is called by both client and server when refeshing a page
    firebase.auth().onAuthStateChanged(
        user => {
            if (user) {
                context.store.dispatch('autoSignIn', user)
            }
        }
    )
}