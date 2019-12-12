import Admin from './components/admin/main.vue';
import Home from './components/home/main.vue';
import Users from './components/admin/user/users.vue';
import Product from './components/admin/product/product.vue';
import productGallery from './components/admin/product/gallery.vue';
import addProduct from './components/admin/product/add.vue';
import categoryProducts from './components/admin/product/categoryProducts.vue'
import categoryMain from './components/admin/category/main.vue';
import Categories from './components/admin/category/Categories.vue';
import Category from './components/admin/category/Category.vue';

import webCategory from './components/category/main.vue';
import webProduct from './components/product/main.vue';
import appLogin from './components/login/main.vue'
import appCart from './components/cart/main.vue';
import appCheckout from './components/checkout/main.vue';
import userProfile from './components/user/main.vue';
export const routes =[
    { 
      path :'/admin' , component : Admin, children:[
        { path :'user', component : Users},
        { path :'category/products/:id', component : categoryProducts},
        { path :'category', component : categoryMain ,children : [
           { path : '' , component : Categories},
            { path : ':id' ,component : Category}
        ]
      
        },
          { path : 'product/add' , component : addProduct},
          { path : 'product/gallery/:id' , component : productGallery},
          { path: 'product/:id',component :Product },
          
      ]
    },
      { path : '', component : Home},
      {path: '/category/:id', component: webCategory },
      { path : '/product/:id', component : webProduct},
      { path :'/login', component : appLogin},
      { path : '/cart' , component :appCart},
      { path : '/checkout' , component : appCheckout},
      { path: '/profile' , component : userProfile}

  ]
  


 