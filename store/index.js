import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedShops: [],
      token: null
    },
    mutations: {
      setShops(state, shops) {
        state.loadedShops = shops
      },
      addShop(state, shop) {
        state.loadedShops.push(shop)
      },
      editShop(state, editedShop) {
        const shopIndex = state.loadedShops.findIndex(
          shop => shop.id === editedShop.id
        );
        state.loadedShops[shopIndex] = editedShop;
      },
      setToken(state, token) {
        state.token = token
      },
      clearToken(state) {
        state.token = null
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get('/shops.json')
          .then( data => {
            const shopsArray = []
            for (const key in data) {
              shopsArray.push({...data[key], id: key});
            }
            vuexContext.commit('setShops', shopsArray);
          })
          .catch(e => context.error(e));
      },
      setShops(vuexContext, shops) {
        vuexContext.commit('setShops', shops)
      },
      addShop(vuexContext, shop) {
        const createdShop = {
          ...shop,
          updatedDate: new Date()
        }
        return this.$axios
          .$post('/shops.json?auth=' + vuexContext.state.token, createdShop)
          .then( data => {
            vuexContext.commit('addShop', {...createdShop, id: data.name} );
          })
          .catch(e => console.log(e));
      },
      editShop(vuexContext, editedShop){
        return this.$axios
          .$put('/shops/' + editedShop.id + '.json?auth=' + vuexContext.state.token, editedShop)
          .then( res => {
            vuexContext.commit('editShop', editedShop);
          })
          .catch(e => console.log(e));
      },
      authenticateUser(vuexContext, authData) {
        let authUrl = 
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
          process.env.fbAPIKey;
        if (!authData.isLogin){
          authUrl = 
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
            process.env.fbAPIKey;
        }
        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(res => {
            vuexContext.commit('setToken', res.idToken);
            localStorage.setItem('token', res.idToken);
            localStorage.setItem('tokenExpiration',
              new Date().getTime() + Number.parseInt(res.expiresIn) * 1000
            );
            Cookie.set('jwt', res.idToken);
            Cookie.set(
              'expirationDate',
              new Date().getTime() + Number.parseInt(res.expiresIn) * 1000
            );
          })
          .catch(e => console.log(e))
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if(req) {
          if(!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
          if(!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("expirationDate="))
            .split("=")[1];
        } else {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }
        if(new Date().getTime() > +expirationDate || !token) {
          console.log("No token or invalid token");
          vuexContext.dispatch("logout");
          return;
        }
        vuexContext.commit("setToken", token)
      },
      logOut(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        if(process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      }
    },
    getters: {
      loadedShops(state) {
        return state.loadedShops;
      },
      isAuthenticated(state) {
        return state.token != null
      }
    }
  })
}

export default createStore;
