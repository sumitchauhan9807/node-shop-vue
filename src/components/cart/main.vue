<template>
<div>
    <app-breadcrumb></app-breadcrumb>
    <section class="cart_area">
      <div class="container">
        <div class="cart_inner">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item,index  in cart">
                  <td>
                    <div class="media">
                      <div class="d-flex">
                        <img
                          :src="item.productId.imageUrl.image"
                          alt=""
                        />
                      </div>
                      <div class="media-body">
                        <p>{{ item.productId.name}}</p>
                      </div>
                    </div>
                  </td>
                  <td class="media-body">
                    <h5>${{ item.productId.price}}</h5>
                  </td>
                  <td>
                    <div class="product_count">
                      <input
                        type="text"
                        name="qty"
                        title="Quantity:"
                        class="input-text qty"
                        v-model="cart[index].quantity"
                      />
                      <button
                        @click="changeQuant(index,1)"
                        class="increase items-count"
                        type="button"
                      >
                        <i class="lnr lnr-chevron-up"></i>
                      </button>
                      <button
                        @click="changeQuant(index,-1)"
                        class="reduced items-count"
                        type="button"
                      >
                        <i class="lnr lnr-chevron-down"></i>
                      </button>
                    </div>
                  </td>
                  <td style="position:relative">
                    <h5>{{ item.quantity * item.productId.price}}</h5>
                    <i class="fa fa-times removeItem" @click="removeItem(index)" aria-hidden="true"></i>
                  </td>
                </tr>
                
                
                <tr class="bottom_button">
                  <td>
                    <a class="gray_btn" href="#" @click="updateCart($event)">Update Cart</a>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <h5>Subtotal</h5>
                  </td>
                  <td>
                    <h5>${{subTotal()}}</h5>
                  </td>
                </tr>
                <tr class="shipping_area">
                  <td></td>
                  <td></td>
                  <td>
                    
                  </td>
                  <td>
                    <div class="shipping_box">
                      <h6>
                        Calculate Shipping
                      </h6>
                      <select class="shipping_select">
                        <option value="1">Bangladesh</option>
                        <option value="2">India</option>
                        <option value="4">Pakistan</option>
                      </select>
                      <select class="shipping_select">
                        <option value="1">Select a State</option>
                        <option value="2">Select a State</option>
                        <option value="4">Select a State</option>
                      </select>
                      <input type="text" placeholder="Postcode/Zipcode" />
                      <a class="gray_btn" href="#">Update Details</a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="checkout_btn_inner">
                      <router-link class="gray_btn" to="/">Continue Shopping</router-link>
                      <router-link class="main_btn" to="/checkout">Proceed to checkout</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
</div>
</template>

<script>
import BreadCrumb from '../breadcrumb.vue';
import {eventBus} from '../../main';
export default {
    components:{
        appBreadcrumb:BreadCrumb
    },
    data(){
      return {
        baseUrl:'https://sumit-node-shop.herokuapp.com/',
        cart:[]
      }
    },
    methods:{
      changeQuant(index,n){
        this.cart[index].quantity += n;
        this.cart[index].quantity = this.cart[index].quantity < 1 ? 1 : this.cart[index].quantity;  
        console.log(index,n)
      },
      updateCart(event){
        event.preventDefault();
        var updatedCart = this.cart.map((item)=>{
          return {
              productId:item.productId._id,
              quantity:item.quantity
          }
        });
        var data = {
          cart : updatedCart
        } 
        this.$http.post('https://sumit-node-shop.herokuapp.com/users/update-cart',data).then((response)=>{
          return response.json();
        }).then((result)=>{
          alert('cart updated');
          eventBus.$emit('addedToCart',result);
        })
      },
      removeItem(index){
        this.cart.splice(index,1);
        console.log(this.cart);
      },
      subTotal(){
        let total = 0;
        this.cart.forEach((cartItem)=>{
          total += cartItem.quantity * cartItem.productId.price;
        });
        return total;
      },
        checkLogin(){
        var token = localStorage.getItem('token');
        if(token){
            var jwt = this.$jwt.decode(token);
            if(!jwt){
                this.$router.push('./login')
            }
            return;
        }
        this.$router.push('./login')
        },
        getUserCart(){
        this.$http.get('https://sumit-node-shop.herokuapp.com/users/cart').then((response)=>{
            return response.json();
          }).then((user)=>{
              this.cart = user.cart;
              console.log(this.cart);
          })
      }
    },
    created(){
         this.checkLogin();
         this.getUserCart();
    }
}
</script>

<style scoped>
.removeItem{
  position:absolute;
  top: 7px;
  right: 0px;
  font-size: 18px;
  color: red;
}
.table-responsive{
  overflow-x:unset;
}
.d-flex img{
  height:80px;
  width:80px;
}
</style>