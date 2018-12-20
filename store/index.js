import Vuex from 'vuex'

import item from './item'
import shop from './shop'
import user from './user'
import shared from './shared'
import query from './query'
import chat from './chat'

export default () => {
    return new Vuex.Store({
        modules: {
            item: item,
            shop: shop,
            user: user,
            shared: shared,
            query: query,
            chat: chat
        }        
    })
}