<template>

    <router-link to="/home"><img src="MEDIAS/back.png" alt="Retour à l'accueil du site" id="return-icon" title="Retour à l'accueil du site"/></router-link>
  
    <div id="content-body">
      <div id="not-found">
        <h1 class="titre-page">J'aime la galette.</h1>
        <h2><router-link to="/home">Retour à l'acceuil du site</router-link></h2>
      </div>
    </div>
  
  </template>

  <script>
  export default {
    data() {
        return {
            url: new URLSearchParams(document.location.href),
            code : 0
        }
    },
    mounted(){
        this.code = this.$route.params.status;

    }
  }
  </script>