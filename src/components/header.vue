<template>
<header class="header_area">
    <div class="top_menu">
      <div class="container">
        <div class="row">
          <div class="col-lg-7">
            <div class="float-left">
              <p>Phone: {{ phone }}</p>
              <p>email: info@eiser.com</p>
            </div>
            


          </div>
          <div class="col-lg-5">
            <div class="float-right">
              <ul class="right_side">
                <li>
                  <a href="tracking.html">
                    track order
                  </a>
                </li>
                <li v-if="username">
                  <router-link to="/profile">
                    {{username}}
                  </router-link>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main_menu">
      <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light w-100">
          <!-- Brand and toggle get grouped for better mobile display -->
          <a class="navbar-brand logo_h" href="index.html">
            <img src="../assets/img/logo.png" alt="" />
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="collapse navbar-collapse offset w-100" id="navbarSupportedContent">
            <div class="row w-100 mr-0">
              <div class="col-lg-7 pr-0">
                <ul class="nav navbar-nav center_nav pull-right">
                  <li class="nav-item active">
                    <router-link class="nav-link" to="/">Home</router-link>
                  </li>
                  <li class="nav-item submenu dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                      aria-expanded="false">Categories</a>
                    <ul class="dropdown-menu">
                      <li class="nav-item" v-for="category in categories">
                        <router-link class="nav-link" :to="'/category/'+category._id+''" >{{ category.name}}</router-link>
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item submenu dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                      aria-expanded="false">Blog</a>
                    <ul class="dropdown-menu">
                      <li class="nav-item">
                        <a class="nav-link" href="blog.html">Blog</a>
                      </li> 
                      <li class="nav-item">
                        <a class="nav-link" href="single-blog.html">Blog Details</a>
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item submenu dropdown">
                    <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                      aria-expanded="false">Pages</a>
                    <ul class="dropdown-menu">
                      <li class="nav-item">
                        <a class="nav-link" href="tracking.html">Tracking</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="elements.html">Elements</a>
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="contact.html">Contact</a>
                  </li>
                  <li class="nav-item" v-if="isAdmin">
                    <router-link class="nav-link" to="/admin">Admin</router-link>
                  </li>
                </ul>
              </div>

              <div class="col-lg-5 pr-0">
                <ul class="nav navbar-nav navbar-right right_nav pull-right">
                  <li class="nav-item">
                    <a href="#" class="icons">
                      <i class="ti-search" aria-hidden="true"></i>
                    </a>
                  </li>

                  <li class="nav-item">
                    <router-link to="/cart" class="icons">
                      <div id="ex4">
              <span v-if="cartCount"  class="p1 fa-stack fa-2x has-badge" v-bind:data-count="cartCount">
                <i class="p3 fa fa-shopping-cart fa-stack-1x xfa-inverse" data-count="4b"></i>
              </span>
              <span v-else  class="p1 fa-stack fa-2x has-badge">
                <i class="p3 fa fa-shopping-cart fa-stack-1x xfa-inverse" data-count="4b"></i>
              </span>
          </div>
                    </router-link>
                  </li>

                  <li class="nav-item">
                    <router-link to="/login" class="icons">
                      <i class="ti-user" aria-hidden="true"></i>
                    </router-link>
                  </li>

                  <li class="nav-item">
                    <a href="#" class="icons">
                      <i class="ti-heart" aria-hidden="true"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { eventBus } from '../main';
import { isAdmin } from '../main';
export default {
    data() {
        return {
            isAdmin:isAdmin,
            name : 'sumit',
            phone : 9816241397,
            categories: [],
            username:null,
            cartCount:0 
        }
    },
    methods:{
      upadteHeader(){
        var token = localStorage.getItem('token');
        if(token){
          var jwt = this.$jwt.decode(token);
          this.isAdmin = jwt.isAdmin;
          this.username = jwt.name;
          if(jwt.isAdmin){
            eventBus.$emit('adminLoggedIn')
          }else{
            eventBus.$emit('adminLoggedOut')
          }
        }
      },
      getUserData(){
        var token = localStorage.getItem('token');
        if(token){
          var jwt = this.$jwt.decode(token);
          var userId = jwt.userId;
          this.$http.get('https://sumit-node-shop.herokuapp.com/users/'+userId+'').then((response)=>{
            return response.json();
          }).then((user)=>{
            this.cartCount = user.cart.length;
          })
        }
      }
        
    },
    created(){
      this.upadteHeader();
      this.getUserData();
      eventBus.$on('userLoggedIn',()=>{
            this.upadteHeader();
            this.getUserData();
          });
        eventBus.$on('addedToCart',(user) =>{
          var cart = user.cart;
          this.cartCount = cart.length;
        });
          //https://sumit-node-shop.herokuapp.com/category/main
          //
        this.$http.get('https://sumit-node-shop.herokuapp.com/category/main').then((response)=>{
            return response.json();
        }).then((categories)=>{
          this.categories = categories;
        });
    }
}
</script>
<style scoped>
#ex4 .p1[data-count]:after{
  position:absolute;
  right:10%;
  top:8%;
  content: attr(data-count);
  font-size:40%;
  padding:.2em;
  border-radius:50%;
  line-height:1em;
  color: white;
  background:rgba(255,0,0,.85);
  text-align:center;
  min-width: 1em;
}


</style>