import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

const options = {
    error: 'http://192.168.178.24:3000/loading.gif',
    loading: 'http://192.168.178.24:3000/loading.gif',
    //lazyComponent: true
}

process.client ? Vue.use(VueLazyload, options) : ``