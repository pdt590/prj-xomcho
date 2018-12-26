import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

const options = {
    error: 'https://xomcho.net/loading.gif',
    loading: 'https://xomcho.net/loading.gif'
}

Vue.use(VueLazyload, options)