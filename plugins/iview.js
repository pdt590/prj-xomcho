import Vue from 'vue'
import iView from 'iview'

/*
** Import iView on demand
*/
import { 
  locale, 
  Layout,
  Header,
  Content,
  Footer,
  Menu,
  MenuItem,
  Icon,
  Button,
  Form,
  FormItem,
  Input,
  Modal 
} from 'iview'
import lang from 'iview/dist/locale/vi-VN'

// configure language
locale(lang)

// import components
Vue.component('Layout', Layout)
Vue.component('Header', Header)
Vue.component('Content', Content)
Vue.component('Footer', Footer)
Vue.component('Menu', Menu)
Vue.component('MenuItem', MenuItem)
Vue.component('Icon', Icon);
Vue.component('Button', Button)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Input', Input)
Vue.component('Modal', Modal)


/*
** Import iView
*
import locale from 'iview/dist/locale/vi-VN'
Vue.use(iView, { locale })
*/