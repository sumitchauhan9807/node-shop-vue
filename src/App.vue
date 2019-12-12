<template>
  <div>
        <app-header></app-header>
        <router-view></router-view>
        <app-footer></app-footer>
        <app-chat></app-chat>
  </div>
</template>

<script>
import Header from './components/header.vue';
import Footer from './components/footer.vue';
import ChatModule from './components/chat/main';
export default {
    components : {
      appHeader:Header,
      appFooter : Footer,
      appChat: ChatModule
    }
    
}
</script>

<style>

</style>
