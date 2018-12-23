export default async function( { store, params, error } ) {
    try{
        if(process.client) {
            if(!store.getters.loadedShop || store.getters.loadedShop.url !== params.shopUrl) { 
                await Promise.all([
                    store.dispatch('loadShop', params.shopUrl),
                    store.dispatch('loadItems', params.shopUrl)
                ])
            }
        }else {
            await Promise.all([
                store.dispatch('loadShop', params.shopUrl),
                store.dispatch('loadItems', params.shopUrl)
            ])
        }
    } catch(e) {
        console.log('[ERROR-middleware/edit-permission]', e)
        error({ statusCode: 500, message: 'Lỗi loadShop và loadItems'})
    }
    const user = store.getters.user
    const loadedShop = store.getters.loadedShop
    loadedShop._creator.id !== user.id ? error({ statusCode: 404, message: 'Không tìm thấy trang'}) : ``
}