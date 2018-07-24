import Vue from 'vue'
import NavBar from "~/components/NavBar"
import NavBarMobile from "~/components/NavBarMobile"
import SideBarShop from "~/components/SideBarShop"
import SideBarItem from "~/components/SideBarItem"
import SideBarInbox from "~/components/SideBarInbox"
import Footer from "~/components/Footer"
import ModalLogin from "~/components/ModalLogin"
import UploadImg from "~/components/UploadImg"
import ProductTypes from "~/components/ProductTypes"

import ProductCard01 from "~/components/ProductCard01"
import ProductCard02 from "~/components/ProductCard02"
import ProductCard03 from "~/components/ProductCard03"
import ShopCard01 from "~/components/ShopCard01"
import ShopCard02 from "~/components/ShopCard02"

import ButtonSaveItem from "~/components/ButtonSaveItem"
import ButtonSaveShop from "~/components/ButtonSaveShop"
import ButtonSale from "~/components/ButtonSale"
import ButtonSaleCard from "~/components/ButtonSaleCard"
import ButtonSwitch from "~/components/ButtonSwitch"

import SliderMainPanel from "~/components/SliderMainPanel"
import SliderMainShop from "~/components/SliderMainShop"
import SliderShopPanel from "~/components/SliderShopPanel"
import SliderItem from "~/components/SliderItem"

Vue.component('app-navbar', NavBar)
Vue.component('app-navbar-mobile', NavBarMobile)
Vue.component('app-sidebar-shop', SideBarShop)
Vue.component('app-sidebar-item', SideBarItem)
Vue.component('app-sidebar-inbox', SideBarInbox)
Vue.component('app-footer', Footer)
Vue.component('app-modal-login', ModalLogin)
Vue.component('app-img-upload', UploadImg)
Vue.component('app-product-types', ProductTypes)

Vue.component('app-product-card01', ProductCard01)
Vue.component('app-product-card02', ProductCard02)
Vue.component('app-product-card03', ProductCard03)
Vue.component('app-shop-card01', ShopCard01)
Vue.component('app-shop-card02', ShopCard02)

Vue.component('app-btn-sale', ButtonSale)
Vue.component('app-btn-salecard', ButtonSaleCard)
Vue.component('app-btn-saveshop', ButtonSaveShop)
Vue.component('app-btn-saveitem', ButtonSaveItem)
Vue.component('app-btn-switch', ButtonSwitch)

Vue.component('app-slider-mainpanel', SliderMainPanel)
Vue.component('app-slider-mainshop', SliderMainShop)
Vue.component('app-slider-shoppanel', SliderShopPanel)
Vue.component('app-slider-item', SliderItem)