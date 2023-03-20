<template>
  <header-component></header-component>
  <RouterView />
  <footer-component></footer-component>
</template>

<script>
import Header from './components/HeaderComponent.vue';
import Footer from './components/FooterComponent.vue'

export default {
  name: 'App',
  components: {
    'header-component': Header,
    'footer-component': Footer,
  }
}
</script> 

