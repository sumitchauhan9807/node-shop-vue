<template>
    <div>
        <div class="container">
            <admin-header></admin-header>
            <br><br>
             <router-view></router-view>
        </div>
    </div>
    
</template>


<script>
import Header from './header.vue';
import { isAdmin } from '../../main';
import Vue from 'vue';
export default {
    components:{
        adminHeader:Header
    },
    beforeRouteEnter(to,from,next){
        if(isAdmin){
            next(true);
            return 
        }
        window.location.href='./';
    }

}

</script>