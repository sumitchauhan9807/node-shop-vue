<template>
<div>
    <app-breadcrumb></app-breadcrumb>
    
<product-list :id="id"></product-list>
    
    
   
</div>
</template>

<script>
import Breadcrumb from '../breadcrumb.vue'
import productList from './productList.vue';
 export default {
     components:{
         appBreadcrumb:Breadcrumb,
         productList:productList
     },
     data(){
         return {
             id : this.$route.params.id,
         }
     },
     methods:{
         
     },
     watch:{
      '$route'(to,from){
        this.id = to.params.id;
      }
    },
    created(){
        
        
    }

    

}
</script>