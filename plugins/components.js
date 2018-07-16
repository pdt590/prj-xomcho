import Vue from 'vue'
import NavBar from "~/components/NavBar"
import NavBarMobile from "~/components/NavBarMobile"
import NavBarMobileMain from "~/components/NavBarMobileMain"
import SideBarShop from "~/components/SideBarShop"
import SideBarItem from "~/components/SideBarItem"
import Footer from "~/components/Footer"
import ModalLogin from "~/components/ModalLogin"


Vue.component('app-navbar', NavBar)
Vue.component('app-navbar-mobile', NavBarMobile)
Vue.component('app-navbar-mobile-main', NavBarMobileMain)
Vue.component('app-sidebar-shop', SideBarShop)
Vue.component('app-sidebar-item', SideBarItem)
Vue.component('app-footer', Footer)
Vue.component('app-modal-login', ModalLogin)