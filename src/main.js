import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueJWT from 'vuejs-jwt'
import App from './App.vue'
import { routes } from './routes.js';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueJWT);

const router = new VueRouter({
  routes:routes,
  mode:'history'
})
// sending whatsapp messages too..
export var isAdmin = false;
export var loggedIn = 'i logedsd';

Vue.http.interceptors.push((request,next)=>{
    var token = localStorage.getItem('token');
    if(token){
      token = 'Bearer '+token;
      request.headers.set('Authorization',token);
      next();
    }
});


export const eventBus = new Vue();
eventBus.$on('adminLoggedIn',()=>{
  isAdmin = true;
  //localStorage.setItem('isAdmin',true);
}) 
eventBus.$on('adminLoggedOut',()=>{
  isAdmin = false;
});


import { Sockets } from './socket';
export const WebSocket = new Sockets();


new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
})