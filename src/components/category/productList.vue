<template>
    <div>
        <section class="cat_product_area section_gap">
      <div class="container">
        <div class="row flex-row-reverse">
          <div class="col-lg-9">
            <div class="product_top_bar">
              <div class="left_dorp">
                <select class="sorting">
                  <option value="1">Default sorting</option>
                  <option value="2">Default sorting 01</option>
                  <option value="4">Default sorting 02</option>
                </select>
                <select class="show">
                  <option value="1">Show 12</option>
                  <option value="2">Show 14</option>
                  <option value="4">Show 16</option>
                </select>
              </div>
            </div>
            
            <div class="latest_product_inner">
              <div class="row">
                <div class="col-lg-4 col-md-6" v-for="product in products">
                  <div class="single-product">
                    <div class="product-img">
                      <img
                        class="card-img"
                        :src="product.imageUrl.image"
                        alt=""
                      />
                      <div class="p_icon">
                        <router-link  :to="'/product/'+product._id+''" >
                            <i class="ti-eye"></i>
                        </router-link>
                        <a href="#">
                          <i class="ti-heart"></i>
                        </a>
                        <a href="#" @click="addToCart($event,product._id)">
                          <i class="ti-shopping-cart"></i>
                        </a>
                      </div>
                    </div>
                    <div class="product-btm">
                      <a href="#" class="d-block">
                        <h4>{{product.name}}</h4>
                      </a>
                      <div class="mt-3">
                        <span class="mr-4">$ {{product.price}}</span>
                        <del>$35.00</del>
                      </div>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
          </div>

          <div class="col-lg-3">
            <div class="left_sidebar_area">
              <aside class="left_widgets p_filter_widgets">
                <div class="l_w_title">
                  <h3>Browse Categories</h3>
                </div>
                <div class="widgets_inner">
                  <ul class="list">
                    <li v-for="category in subCategories">
                      <a @click="subCategoryChanged($event,category._id._id)" href="#">{{ category._id.name}}</a>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>

        </div>
     </div>
    </section>
    </div>
</template>

<script>
import $ from 'jquery';
import {eventBus } from '../../main';

export default {
    props:['id'],
    data(){
         return {
             baseUrl:'https://sumit-node-shop.herokuapp.com/',
             subCategories:[],
             products:[]
         }
     },
     methods:{
         getCategoryData(){
            let categoryId = this.id;
            return this.$http.get('https://sumit-node-shop.herokuapp.com/category/'+categoryId+'').then((response)=>{
            return response.json();
            }).then((category)=>{
                this.subCategories = category.childs; 
                console.log(this.subCategories);
            });
        },
        getProductsData(categoryId){
            return this.$http.get('https://sumit-node-shop.herokuapp.com/product/category/products/'+categoryId+'').then((response)=>{
            return response.json();
            }).then((products)=>{
                console.log(products);
                this.products=products;    
            });
        },
        subCategoryChanged(event,data){
            event.preventDefault();
            console.log(event,data);
            this.getProductsData(data).then(()=>{
                $('.widgets_inner').find('a').removeClass('active-cat');
                event.target.classList.add('active-cat');
            });  
        },
        addToCart(event,productId){
          event.preventDefault();
          console.log(productId);
          var data = {
            product:productId,
            quantity:1
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
        }
     },
     watch:{
         id(){
             this.getCategoryData().then(()=>{
                 if(this.subCategories.length){
                   let firstCategoryId = this.subCategories[0]._id._id;
                    this.getProductsData(firstCategoryId);
                }
             });
         }
     },
     created(){
        this.getCategoryData().then(()=>{
            if(this.subCategories.length){
                let firstCategoryId = this.subCategories[0]._id._id;
                this.getProductsData(firstCategoryId).then(()=>{
                    $('.widgets_inner').find('a')[0].classList.add('active-cat')
                });
            }
        });
    }

}

</script>

<style scoped>
.product-img img{
    height:246px;
}
.active-cat{
    font-weight:600 !important;
}
</style>