import Vue from 'vue'

import Logo from '~/components/Logo'
import NavBar from "~/components/NavBar"
import Footer from "~/components/Footer"
import ImageFrame from '~/components/ImageFrame'

import CardShop from '~/components/CardShop'
import CardShopMobile from '~/components/CardShopMobile'
import CardShopMobile4User from '~/components/CardShopMobile4User'
import CardItem from '~/components/CardItem'
import CardItemMobile from '~/components/CardItemMobile'
import CardItem4Shop from '~/components/CardItem4Shop'
import CardItemMobile4Shop from '~/components/CardItemMobile4Shop'
import CardItemMobile4User from '~/components/CardItemMobile4User'

import ModalLogin from "~/components/ModalLogin"
import ModalSignup from '~/components/ModalSignup'
import ModalJoin from '~/components/ModalJoin'
import ModalSale from '~/components/ModalSale'

Vue.component('v-logo', Logo)
Vue.component('v-navbar', NavBar)
Vue.component('v-footer', Footer)
Vue.component('v-image-frame', ImageFrame)

// Card
Vue.component('v-card-shop', CardShop)
Vue.component('v-card-shop-mobile', CardShopMobile)
Vue.component('v-card-shop-mobile-4user', CardShopMobile4User)
Vue.component('v-card-item', CardItem)
Vue.component('v-card-item-mobile', CardItemMobile)
Vue.component('v-card-item-4shop', CardItem4Shop)
Vue.component('v-card-item-mobile-4shop', CardItemMobile4Shop)
Vue.component('v-card-item-mobile-4user', CardItemMobile4User)

// Modal
Vue.component('v-modal-login', ModalLogin)
Vue.component('v-modal-signup', ModalSignup)
Vue.component('v-modal-join', ModalJoin)
Vue.component('v-modal-sale', ModalSale)