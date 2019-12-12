<template>
    <div>
         <router-link style="float:right" to="/admin/category" class="genric-btn success-border circle arrow">All Categories
			<span class="lnr lnr-arrow-left"></span>
		</router-link>
       <a href="#" @click="toggleForm($event)" class="genric-btn success-border circle arrow">Add Sub-category
			<span class="lnr lnr-arrow-right"></span>
		</a>
        <br> <br> 
        <h2><span>{{categoryData.name }}</span></h2>
        <add-category-form @newCategoryAdded="getCategoryData()" :categoryId="categoryId" catType="sub" style="display:none" id="addCategory"></add-category-form>
        <br>
      
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Sub-Categories</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
           <tr v-for="category in categoryData.childs">
                <td>{{ category._id.name}}</td>
                <td>
                    <router-link :to='"/admin/category/products/"+category._id._id+""' class="genric-btn warning-border small"> Show Products</router-link>
                    <a href="#" class="genric-btn primary-border small"> Edit</a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import categoryForm from  './addCategoryForm.vue';
    export default {
        components:{
            addCategoryForm :categoryForm
        },
        data(){
            return {
                categoryData: [],
                categoryId:null
            }
        },
        methods:{
        toggleForm(e){
            e.preventDefault();
           let fromStyle =  document.getElementById('addCategory').style.display;
           if(fromStyle == 'none'){
               document.getElementById('addCategory').style.display= 'block';
           }else{
               document.getElementById('addCategory').style.display = 'none';
           }
        },
        getCategoryData(){
            let categoryId = this.$route.params.id;
            this.categoryId = categoryId 
            this.$http.get('https://sumit-node-shop.herokuapp.com/category/'+categoryId+'').then((response)=>{
            return response.json();
            }).then((category)=>{
                this.categoryData = category; 
                console.log(category);
            });
        }
    },  
        created(){
            this.getCategoryData();
        }
    }
</script>