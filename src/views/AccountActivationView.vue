<template>

    <router-link to="/home"><img src="../../public/medias/back.png" alt="Retour à l'accueil du site" id="return-icon" title="Retour à l'accueil du site"/></router-link>
  
    <div id="content-body">
      <div id="not-found" :style="{backgroundColor : success ? '#23A093' : '#F55A4F'}">
        <h1 class="titre-page" > {{ defineMessage() }} </h1>
        <h2 ><router-link to="/home">Retour à l'acceuil du site</router-link></h2>
      </div>
    </div>
  
  </template>

  <script>
    export default {
        data() {
            return {
                code : 0,
                success: false,
                message: ''
            }
        },
            mounted(){
            this.code = this.$route.params.status;
        },
        methods: {
            defineMessage() {
                switch (this.code) {
                    case '200':
                        this.message = "Félicitations! Votre compte a été activé avec succès! Vous pouvez dès maintenant vous connecter sur votre mobile!";
                        this.success = true;
                        break;
                    case '206':
                        this.message = "Le compte a déjà été activé.";
                        break;
                    case '419':
                        this.message = "Le délai de validité du lien est dépassé. Un nouveau lien de confirmation vient de vous être envoyé sur l'adresse mail saisie lors de votre inscription";
                        break;
                    case '498':
                        this.message = "Token invalide. Echec de l'activation du compte.";
                        break;
                    default:
                        this.message = "Une erreur est survenue lors de l'activation de votre compte. Veuillez réessayer plus tard.";
                        break;
                }
                return this.message;
            }
        }

  }
  </script>