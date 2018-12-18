export default async function( context ) {
    const user = context.store.getters.user
    let loadedShop = context.store.getters.loadedShop
    if(!loadedShop) loadedShop = await context.store.dispatch('loadShop', context.params.shopUrl)
    loadedShop._creator.id !== user.id ? context.redirect('/') : ``
}