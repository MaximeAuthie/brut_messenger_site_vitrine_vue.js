<template>
  <header-component></header-component>
  <router-view></router-view>
  <footer-component></footer-component>
</template>

<script>
import Header from './components/HeaderComponent.vue';
import Footer from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    'header-component': Header,
    'footer-component': Footer,
  }
}
</script> 

