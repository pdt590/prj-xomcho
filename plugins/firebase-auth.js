import firebase from '~/plugins/firebase'

//TODO: Only run before instantiating the root vue.js application at client side and is useful 
// when refreshing a page. Without Nuxt, this function can be located at created() hook of a vue app
export default function (context) {
    firebase.auth().onAuthStateChanged( 
        user => {
            if (user) {
                context.store.dispatch('autoSignIn', user) 
            }
        }
    )
}