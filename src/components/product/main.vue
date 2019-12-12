<template>
<div>
    <bread-crumb></bread-crumb>
     <div class="product_image_area">
      <div class="container">
        <div class="row s_product_inner">
          <div class="col-lg-6">
              <div id="mount"></div>
              
          </div>
          <div class="col-lg-5 offset-lg-1">
            <div class="s_product_text">
              <h3>{{product.name}}</h3>
              <h2>$ {{ product.price}}</h2>
              <ul class="list">
                <li>
                  <a class="active" href="#">
                    <span>Category</span> : Household</a
                  >
                </li>
                <li>
                  <a href="#"> <span>Availibility</span> : In Stock</a>
                </li>
              </ul>
              <p>
               {{ product.description}}
              </p>
              <div class="product_count">
                <label for="qty">Quantity:</label>
                <input
                  type="text"
                  name="qty"
                  id="sst"
                  maxlength="12"
                  value="1"
                  title="Quantity:"
                  class="input-text qty"
                  v-model="quantity"
                />
                <button
                  @click="changeQuantity(1)"
                  class="increase items-count"
                  type="button"
                >
                  <i class="lnr lnr-chevron-up"></i>
                </button>
                <button
                  @click="changeQuantity(-1)"
                  class="reduced items-count"
                  type="button"
                >
                  <i class="lnr lnr-chevron-down"></i>
                </button>
              </div>
              <div class="card_area">
                <a class="main_btn" href="#" @click="addToCart($event)">Add to Cart</a>
                <a class="icon_btn" href="#">
                  <i class="lnr lnr lnr-diamond"></i>
                </a>
                <a class="icon_btn" href="#">
                  <i class="lnr lnr lnr-heart"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <product-review></product-review>
</div>
</template>

<script>
import BreadCrumb from '../breadcrumb.vue';
import ProductGallery from './productGallery.vue';
import ProductReview from './productReview.vue';
import {eventBus} from  '../../main';
import Vue from 'vue'
export default {
    components:{
        breadCrumb:BreadCrumb,
        productGallery:ProductGallery,
        ProductReview:ProductReview
    },
    data(){
        return {
            baseUrl:'https://sumit-node-shop.herokuapp.com/',
            id : this.$route.params.id,
            product:{},
            quantity:1
        }
    },methods:{
        addToCart(event){
          event.preventDefault();
          var data = {
            product:this.id,
            quantity:this.quantity
          }
          if(localStorage.getItem('token')){
            this.$http.post('https://sumit-node-shop.herokuapp.com/users/add-to-cart',data).then((response)=>{
              return response.json();
            }).then((result)=>{
              alert('added to cart');
              eventBus.$emit('addedToCart',result);
            })
            return;
          }
          this.$router.push('/login')
        },
        changeQuantity(n){
          this.quantity += n;
          this.quantity = this.quantity < 1 ? 1 : this.quantity;
        }
    },
    created(){
        let productId = this.id;
        return this.$http.get('https://sumit-node-shop.herokuapp.com/product/'+productId+'').then((response)=>{
            return response.json();
            }).then((product)=>{
                console.log(product);
                this.product=product;
                const Gallery = Vue.extend(ProductGallery);    
                const gallery = new Gallery({
                    propsData: {
                        images: product.productGallery
                    },
                });
                gallery.$mount('#mount');
                $('.carousel-indicators').find('li')[0].classList.add('active')
                 $('.carousel-inner').find('.carousel-item ')[0].classList.add('active')
            });
    }

}
</script>