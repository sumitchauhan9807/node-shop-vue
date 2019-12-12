<template>
<div>

    <div class="s_product_img">
              <div
                id="carouselExampleIndicators"
                class="carousel slide"
                data-ride="carousel"
              >
                <ol class="carousel-indicators">
                  <li v-for="image,index in images"
                    data-target="#carouselExampleIndicators"
                    :data-slide-to="index"
                    class=""
                  >
                    <img
                      :src="image.image"
                      alt=""
                    />
                  </li>
                </ol>
                <div class="carousel-inner">
                    
                        <div  class="carousel-item " v-for="image,index in images"> 
                            <img
                            class="d-block w-100"
                            :src="image.image"
                            alt="First slide"
                            />
                        </div>
                </div>
              </div>
            </div>
</div>
</template>


<script>
export default  {
    data(){
        return {
            baseUrl:'https://sumit-node-shop.herokuapp.com/',
        }
    },
  props: ['images'],
};
</script>

<style scoped>
.carousel-indicators img{
    height:100%;
}
</style>