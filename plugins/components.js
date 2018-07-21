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
import ButtonSaveItem from "~/components/ButtonSaveItem"
import ButtonSaveShop from "~/components/ButtonSaveShop"
import ButtonSale from "~/components/ButtonSale"

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
Vue.component('app-btn-sale', ButtonSale)
Vue.component('app-btn-saveshop', ButtonSaveShop)
Vue.component('app-btn-saveitem', ButtonSaveItem)