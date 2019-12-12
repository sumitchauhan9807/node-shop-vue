<template>
    <div>
        <app-banner></app-banner>
        <app-features></app-features>
        <app-featured-products></app-featured-products>
        <app-latest-blog></app-latest-blog>
    </div>
</template>

<script>
import Banner from './banner.vue';
import Features from './features.vue';
import featuredProducts from './featuredProducts.vue';
import latestBlog from './latestBlog';
export default {
    components : {
        appBanner : Banner,
        appFeatures : Features,
        appFeaturedProducts:featuredProducts,
        appLatestBlog:latestBlog
    }
}
</script>