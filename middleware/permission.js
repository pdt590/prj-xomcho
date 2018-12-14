export default async function( context ) {
    // * It can run on both client and server side
    // * It is called by server when refeshing a page and by client when clicking a route
    const user = context.store.getters.user
    let loadedShop = context.store.getters.loadedShop
    if(!loadedShop) loadedShop = await context.store.dispatch('loadShop', context.params.shopUrl)
    loadedShop._creator.id !== user.id ? context.redirect('/') : ``
}