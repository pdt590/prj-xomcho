import Vue from 'vue'

// import Logo from '~/components/Logo'
// import NavBar from '~/components/NavBar'
// import Footer from '~/components/Footer'
// import ImageFrame from '~/components/ImageFrame'

// import CardShop from '~/components/CardShop'
// import CardShop4User from '~/components/CardShop4User'
// import CardShopMobile from '~/components/CardShopMobile'

// import CardItem from '~/components/CardItem'
// import CardItem4Shop from '~/components/CardItem4Shop'
// import CardItem4User from '~/components/CardItem4User'
// import CardItemMobile from '~/components/CardItemMobile'
// import CardItemMobile4Shop from '~/components/CardItemMobile4Shop'

// import ModalLogin from '~/components/ModalLogin'
// import ModalSignup from '~/components/ModalSignup'
// import ModalJoin from '~/components/ModalJoin'
// import ModalSale from '~/components/ModalSale'
// import ModalImage from '~/components/ModalImage'

// Vue.component('v-logo', Logo)
// Vue.component('v-navbar', NavBar)
// Vue.component('v-footer', Footer)
// Vue.component('v-image-frame', ImageFrame)

// // Card
// Vue.component('v-card-shop', CardShop)
// Vue.component('v-card-shop-4user', CardShop4User)
// Vue.component('v-card-shop-mobile', CardShopMobile)
// Vue.component('v-card-item', CardItem)
// Vue.component('v-card-item-4shop', CardItem4Shop)
// Vue.component('v-card-item-4user', CardItem4User)
// Vue.component('v-card-item-mobile', CardItemMobile)
// Vue.component('v-card-item-mobile-4shop', CardItemMobile4Shop)

// // Modal
// Vue.component('v-modal-login', ModalLogin)
// Vue.component('v-modal-signup', ModalSignup)
// Vue.component('v-modal-join', ModalJoin)
// Vue.component('v-modal-sale', ModalSale)
// Vue.component('v-modal-image', ModalImage)

// Modal
Vue.component('v-modal-login', () => import('~/components/ModalLogin'))
Vue.component('v-modal-signup', () => import('~/components/ModalSignup'))
Vue.component('v-modal-join', () => import('~/components/ModalJoin'))
Vue.component('v-modal-sale', () => import('~/components/ModalSale'))
Vue.component('v-modal-image', () => import('~/components/ModalImage'))

Vue.component('v-logo', () => import('~/components/Logo'))
Vue.component('v-navbar', () => import('~/components/NavBar'))
Vue.component('v-navbar-mobile', () => import('~/components/NavBarMobile'))
Vue.component('v-footer', () => import('~/components/Footer'))
Vue.component('v-image-frame', () => import('~/components/ImageFrame'))

// Card
Vue.component('v-card-shop', () => import('~/components/CardShop'))
Vue.component('v-card-shop-4user', () => import('~/components/CardShop4User'))
Vue.component('v-card-shop-mobile', () => import('~/components/CardShopMobile'))
Vue.component('v-card-item', () => import('~/components/CardItem'))
Vue.component('v-card-item-4user', () => import('~/components/CardItem4User'))
Vue.component('v-card-item-mobile', () => import('~/components/CardItemMobile'))

// Modal
Vue.component('v-modal-login', () => import('~/components/ModalLogin'))
Vue.component('v-modal-signup', () => import('~/components/ModalSignup'))
Vue.component('v-modal-join', () => import('~/components/ModalJoin'))
Vue.component('v-modal-sale', () => import('~/components/ModalSale'))
Vue.component('v-modal-image', () => import('~/components/ModalImage'))