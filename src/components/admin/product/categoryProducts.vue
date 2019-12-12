<template>
    <div>
        <h1>category products </h1>
         <table class="table table-hover">
            <thead>
            <tr>
                <th>Products</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
           <tr v-for="product in productData">
                <td>{{ product.name}}</td>
                <td>
                    <router-link :to='"/admin/product/"+product._id+""' class="genric-btn danger-border small"> View Product</router-link>
                    <router-link :to='"/admin/product/gallery/"+product._id+""' class="genric-btn primary-border small">Product Gallery</router-link>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            categoryId:null,
            productData:[]
        }
    },
    methods:{
        getProductData(){   
            let categoryId = this.categoryId;
            this.$http.get('https://sumit-node-shop.herokuapp.com/product/category/products/'+categoryId+'')
            .then((response)=>{
                return response.json();
            }).then((product)=>{
                this.productData = product; 
                console.log(product);
            }).catch((err)=>{
                alert('no products found');
            });
        }
    },
    created(){
        let categoryId = this.$route.params.id;
        this.categoryId = categoryId;
        this.getProductData();
    }
}
</script>