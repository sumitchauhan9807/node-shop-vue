<template>
<div>
    <h3>Add Product</h3>
    <form action="#">
            <div class="mt-10">
                <input type="text" v-model="productData.name" placeholder="Product Name" class="single-input">
            </div>
            <div class="mt-10">
                <input type="text" v-model="productData.price"  placeholder="Product Price" class="single-input">
            </div>
            <div class="mt-10">
                <input type="text" v-model="productData.slug"  placeholder="Product Slug" class="single-input">
            </div>
            <div class="mt-10">
                <textarea type="text" v-model="productData.description"  placeholder="Product Description" class="single-input"></textarea>
            </div>
          <div class="mt-10">
            <div class="switch-wrap d-flex justify-content-between" style="width:13%">
                    <p>Featured</p>
                    <div class="primary-switch">
                        <input type="checkbox" id="primary-switch" checked="" v-model="productData.featured">
                        <label for="primary-switch"></label>
                    </div>
                </div>
			</div>
            <div class="row selectCategory">
                <div class="col-md-4 selectCategoryCol" v-for="parentCat in allCategories">
                    <h3>{{ parentCat.name}}</h3>
                    <label class="radio-inline" v-for="child in parentCat.childs">
                         <input type="radio" v-model="productData.categoryId" :value="child._id._id" name="categoryId" checked>{{ child._id.name}}
                    </label>
                </div>
            </div>
            <br>
            <div class="mt-10">
                <button type="submit" @click="addProduct($event)"  class="genric-btn danger radius">Submit</button>
            </div>
        </form>
        <br><br>
        </div>
</template>

<script>
export default {
    data(){
        return {
            allCategories:[],
            productData:{
                categoryId:null,
                name:'',
                price:null,
                slug : '',
                description:'',
                featured:false
            }
        }
    },
    methods:{
        addProduct(e){
            e.preventDefault();
            if(!this.productData.categoryId){
                alert('Please select a category !!');
                return; 
            }
            console.log(this.productData);
            this.$http.post('https://sumit-node-shop.herokuapp.com/product',this.productData).then((result)=>{
                return result.json();
            }).then((response)=>{
                console.log(response);
                let redirect = '/admin/product/gallery/'+response._id;
                this.$router.push(redirect);
                // let redirect = ''
                
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    created(){
         
        // this.$router.push('/admin');
        ///admin/product/gallery/5ddeed25c55f950004a319bd
            this.$http.get('https://sumit-node-shop.herokuapp.com/category/main').then((result)=>{
                return result.json();
            }).then((response)=>{
                console.log(response);
                this.allCategories = response;
            })
    }
}

</script>

<style scoped>
.selectCategory input{
    padding-left:14px;
}
.selectCategoryCol{
    margin-top:20px;
}
</style>