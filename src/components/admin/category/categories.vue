<template>
    <div>
        <h3>All Categories</h3>
        <br>
        <a href="#" @click="toggleForm($event)" class="genric-btn success-border circle arrow">Add Category
			<span class="lnr lnr-arrow-right"></span>
		</a>
        <br>
        <add-category-form @newCategoryAdded="getCategoryData()" catType="parent" style="display:none" id="addCategory"></add-category-form>
        <br><br>
        <table class="table table-hover">
            <thead>
            <tr>
                <th>Category</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="category in categories">
                <td>{{ category.name}}</td>
                <td>
                    <router-link :to="'/admin/category/'+category._id+''" class="genric-btn primary-border small"> Childs</router-link>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import categoryForm from './addCategoryForm.vue';
export default {
    components:{
        addCategoryForm:categoryForm
    },
    data(){
        return {
            categories : []
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
            this.$http.get('https://sumit-node-shop.herokuapp.com/category/main').then((response)=>{
            return response.json();
            }).then((categories)=>{
                this.categories = categories;
                console.log(categories);
            });

        }
    },
    created(){
        this.getCategoryData();
    }
}

</script>