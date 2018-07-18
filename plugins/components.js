import Vue from 'vue'
import NavBar from "~/components/NavBar"
import NavBarMobile from "~/components/NavBarMobile"
import SideBarShop from "~/components/SideBarShop"
import SideBarItem from "~/components/SideBarItem"
import Footer from "~/components/Footer"
import ModalLogin from "~/components/ModalLogin"
import ImgUpload from "~/components/ImgUpload"

Vue.component('app-navbar', NavBar)
Vue.component('app-navbar-mobile', NavBarMobile)
Vue.component('app-sidebar-shop', SideBarShop)
Vue.component('app-sidebar-item', SideBarItem)
Vue.component('app-footer', Footer)
Vue.component('app-modal-login', ModalLogin)
Vue.component('app-img-upload', ImgUpload)