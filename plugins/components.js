import Vue from 'vue'
import NavBar from "~/components/Navigation/NavBar"
import NavBarMobile from "~/components/Navigation/NavBarMobile"
import SideBarShop from "~/components/Navigation/SideBarShop"
import SideBarInbox from "~/components/Navigation/SideBarInbox"
import Footer from "~/components/Navigation/Footer"

import ModalLogin from "~/components/ModalLogin"
import UploadImg from "~/components/UploadImg"
import ProductTypes from "~/components/ProductTypes"

import ProductCardHome from "~/components/ProductCardHome"
import ProductCardShop from "~/components/ProductCardShop"
import ShopCardHome from "~/components/ShopCardHome"

import ButtonSaveItem from "~/components/ButtonSaveItem"
import ButtonSaveShop from "~/components/ButtonSaveShop"
import ButtonSale from "~/components/ButtonSale"
import ButtonSaleCard from "~/components/ButtonSaleCard"
import ButtonSwitch from "~/components/ButtonSwitch"

import SliderHomePanel from "~/components/SliderHomePanel"
import SliderHomeShop from "~/components/SliderHomeShop"
import SliderShopPanel from "~/components/SliderShopPanel"
import SliderItemImg from "~/components/SliderItemImg"

Vue.component('app-navbar', NavBar)
Vue.component('app-navbar-mobile', NavBarMobile)
Vue.component('app-sidebar-shop', SideBarShop)
Vue.component('app-sidebar-inbox', SideBarInbox)
Vue.component('app-footer', Footer)
Vue.component('app-modal-login', ModalLogin)
Vue.component('app-img-upload', UploadImg)
Vue.component('app-product-types', ProductTypes)

Vue.component('app-product-card-home', ProductCardHome)
Vue.component('app-product-card-shop', ProductCardShop)
Vue.component('app-shop-card-home', ShopCardHome)

Vue.component('app-btn-sale', ButtonSale)
Vue.component('app-btn-salecard', ButtonSaleCard)
Vue.component('app-btn-saveshop', ButtonSaveShop)
Vue.component('app-btn-saveitem', ButtonSaveItem)
Vue.component('app-btn-switch', ButtonSwitch)

Vue.component('app-slider-homepanel', SliderHomePanel)
Vue.component('app-slider-homeshop', SliderHomeShop)
Vue.component('app-slider-shoppanel', SliderShopPanel)
Vue.component('app-slider-item', SliderItemImg)