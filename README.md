# tadicho

> An eCommercial project for online shops and more

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## TODO

* Re-write validate input forms ?
* Add lazyload for images
* Add lazyload for components ?
* Edit breadcrumb logic in each query page
* Deploy main page with categories column ?
* Re-struct folder based on firebase deployment
* Add avatar in Navbar mobile
* Add Share Button in Shop
* Move Card Style to global file and remove shadow in case of mobile ?
* Implement Slider for Home page
* Adjust the number of displayed items/shops bw desktop and mobile ?
* Refer Navbar logic for mobile on Zing, Dantri or VnExpress (Add breadcrumb on navbar mobile)
* Re-design buy logic ?
* Edit number input style
* Implement Message without response message
  * Have read and un-read status
* Add danh muc cells on home page ?
* Add bookmark function
* Implement forget pw and confirm sigup page ?
* Add middleware rule for join page ?
* Implement image optimize in cloud function and remove maximum image size rule
* Reimplement error message code ?
* Change card style likes youtube

* Note for Vuelidate
  * @blur should go with $error
  * v-if affects vuelidate (solution: change to v-show - refer to /user/join)
  * sameAs('xxx') can use with same level of input (refer - confirmNewPassword and newPassword in /user/activekey)
  * should use this with function(){} inside sameAs instead of vm
  * required and isValid validator always show error message at beginning