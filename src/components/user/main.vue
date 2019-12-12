<template>
<div>
    <app-breadcrumb></app-breadcrumb>
    <br><br>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h3>Name</h3>
                   
                        <div class="mt-10">
                            <input type="text"  placeholder="User Name" class="single-input" v-model="name">
                        </div>
                        <br>
                        <div class="mt-10">
                            <button @click="updateName()"  class="genric-btn danger radius">Update name</button>
                        </div>
                    
            </div>
            <div class="col-md-6 userImage">
                {{name}}
                <div class="userImge" v-if="image">
                    <img :src="image">
                </div>
                <input type="file" @change="updateUserImage($event)">
            </div>
        </div>
         
        <br><br>
        </div>
        </div>
</div>
</template>

<script>
import BreadCrumb from '../breadcrumb.vue'
import {eventBus} from '../../main';
export default {
    components:{
        appBreadcrumb:BreadCrumb
    },
    data(){
        return {
            baseUrl:'https://sumit-node-shop.herokuapp.com/',
            name:null,
            image:null
        }
    },
    created(){
        this.checkLogin();
        this.getUserData();
    },
    methods:{
    getUserData(){
        var token = localStorage.getItem('token');
        var jwt = this.$jwt.decode(token);
        var id = jwt.userId;
      this.$http.get('https://sumit-node-shop.herokuapp.com/users/'+id).then((response)=>{
          return response.json();
      }).then((user)=>{
          this.name = user.name;
          this.image = user.image;  
      })  
    },
    updateUserImage(event){
        console.log(event);
        var file = event.target.files[0];
        var formData = new FormData();
        formData.append("image", event.target.files[0]);
        this.$http.post('https://sumit-node-shop.herokuapp.com/users/update',formData).then((response)=>{
            return response.json();
        }).then((result)=>{
            this.image = result.image;
            this.getRefreshToken();
            console.log(result);
        })
    },
    getRefreshToken(){
        this.$http.get('https://sumit-node-shop.herokuapp.com/users/refresh/token').then((response)=>{
            return response.json();
        }).then((result)=>{
            localStorage.setItem('token',result.token);
            eventBus.$emit('userLoggedIn');
        }).catch((error)=>{
            console.log(error)
        })
    },

    updateName(){
        let data={
            name:this.name
        }
        this.$http.post('https://sumit-node-shop.herokuapp.com/users/update',data).then((response)=>{
            //alert('name updated');
            this.getRefreshToken();
        })
    },  
    checkLogin(){
            var token = localStorage.getItem('token');
            if(token){
                var jwt = this.$jwt.decode(token);
                console.log(jwt)
               // this.name = jwt.name;
                // if(jwt.image){
                //     this.image = jwt.image;
                // }
                // if(!jwt){
                //     this.$router.push('./login')
                // }
                return;
            }
            this.$router.push('./login')
        },
    }

}
</script>

<style scoped>
   .userImage img{
       height:200px;
       width:300px;
   } 
</style>