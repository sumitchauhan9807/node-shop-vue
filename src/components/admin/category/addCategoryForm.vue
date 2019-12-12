<template>
    <div>
        <form action="#">
            <div class="mt-10">
                <input type="text" v-model="categoryData.name" placeholder="Category Name" class="single-input">
            </div>
            <div class="mt-10">
                <input type="text" v-model="categoryData.slug" placeholder="Category Slug" class="single-input">
            </div>
            <div class="mt-10" v-if="catType == 'sub'">
                <input type="hidden" name="parentId" v-model="categoryData.parentId">
                  
            </div>
            <div class="mt-10">
                <button type="submit" @click="addCategory($event)" class="genric-btn danger radius">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            categoryData:{
                name : '',
                slug:'',
                parentId:null
            }
        }
    },
     props: {
            catType: {
                type: String,
                default : 'sub'
            },
            categoryId:{
                type:String,
                default:null
            },
        },
        methods:{
            addCategory(e){
                e.preventDefault();
                this.$http.post('https://sumit-node-shop.herokuapp.com/category',this.categoryData).then((response)=>{
                    this.$emit('newCategoryAdded');
                    console.log(response);
                }).catch((error)=>{
                    console.log(error);
                })
               // console.log(this.categoryData);
            }
        },
        created(){
            this.categoryData.parentId = this.categoryId;
        }
}


</script>