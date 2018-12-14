export default function( context ) {
    // * It can run on both client and server side
    // * It is called by server when refeshing a page and by client when clicking a route
    const user = context.store.getters.user
    !user ? context.redirect('/user/join') : ``
}