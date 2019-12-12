<template>
<div>
    <center><h2>{{ productName}}</h2></center>
        <h3>Product Image</h3>
        <div class="productImage">
            
            <div class="col-md-6" v-if="productImage !=''">
                <img :src="productImage" id="productImageTag" class="img-rounded" alt="Cinque Terre">
            </div>
            <div class="col-md-6">
                <input id="productImgInput" type="file" v-on:change ="addProductImage($event)">
            </div>
        </div>
        <br><br>
       <h3>Product Gallery</h3>
        <div class="gallery">
            <div class="row">
                <div class="col-md-3" v-for="image in productGallery">
                    <img :src="image.image" class="img-rounded" alt="Cinque Terre">
                    <a style="margin-left:38%" @click="removeGalleryImage($event,image.public_id)" href="#" class="btn btn-info btn-sm">
                        <span class="glyphicon glyphicon-remove"></span> Remove 
                    </a>
                </div>
            </div>
            <br>
            <div class="col-md-6">
                <input id="productGalleryInput" type="file" v-on:change ="addProductGalleryImage($event)" multiple>
            </div>
            <br><br>
        </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            productName:'',
            productImage:'',
            productGallery:[],
            baseUrl:'https://sumit-node-shop.herokuapp.com/',
        }
    },
    methods:{
        addProductImage(event){
            var formData = new FormData();
            formData.append("productImage", event.target.files[0]);
            formData.append('product',this.$route.params.id);
            this.$http.post('https://sumit-node-shop.herokuapp.com/product/gallery',formData).then((result)=>{
                return result.json()   
            }).then((response)=>{
                let updatedImage = response.imageUrl.image
                this.productImage = updatedImage; 
            })
            .catch((err)=>{   
                console.log(err)
            })
            
        },
        addProductGalleryImage(event){
            var formData = new FormData();
            var files = event.target.files;

            for(let i=0;i<files.length;i++){
                formData.append("productGallery", event.target.files[i]);
            }
            formData.append('product',this.$route.params.id);
            this.$http.post('https://sumit-node-shop.herokuapp.com/product/gallery',formData).then((result)=>{
                return result.json();
            }).then((response)=>{
                this.productGallery = response.productGallery.map((galImage)=>{
                    return galImage;
                })
            })   
            .catch((err)=>{   
                console.log(err)
            })
        },
        getProductData(){
            let productId = this.$route.params.id;
            this.$http.get('https://sumit-node-shop.herokuapp.com/product/'+productId+'').then((result)=>{
                return result.json();
            }).then((product)=>{
                this.productName = product.name;
                if(product.imageUrl){
                    let productImage = product.imageUrl.image;
                    this.productImage = productImage;
                }
                
                let productGallery = product.productGallery.map((image)=>{
                    return image
                })
                this.productGallery = productGallery;
            })
            .catch((err)=>{
                console.log(err)
            })

        },
        removeGalleryImage(event,public_id){
            event.preventDefault();
            
            let data = {
                product : this.$route.params.id,
                image : public_id
            };
            // console.log(data);
            // return 
            //https://sumit-node-shop.herokuapp.com
            this.$http.post('https://sumit-node-shop.herokuapp.com/product/gallery/delete',data).then((result)=>{ 
                    return result.json()
            }).then((response)=>{
                console.log(response);
                this.productGallery = response.productGallery;
            })
        }
    },
    created(){
        this.getProductData();
    }
}
</script>

<style scoped>
.productImage img {
    height: 251px;
    width: 38%;
    margin: 10px;
}
.gallery img {
    height: 288px;
    width: 100%;
    margin: 10px;
}
</style>