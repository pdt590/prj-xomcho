export default function( context ) {
    const user = context.store.getters.user
    !user ? context.redirect('/user/join') : ``
}