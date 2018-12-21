import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

process.client ? Vue.use(VueLazyload, {
    error: 'http://localhost:3000/loading.gif',
    loading: 'http://localhost:3000/loading.gif',
    //lazyComponent: true
}) : ``