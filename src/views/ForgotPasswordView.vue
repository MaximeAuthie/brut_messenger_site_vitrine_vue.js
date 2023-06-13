<template>
    <router-link to="/home"><img src="../../public/medias/back.png" id="return-icon" alt="Retour à l'accueil du site" title="Retour à l'accueil du site"></router-link>
    
    <div id="content-body">
        <div id="contact-form">
            <h1 class="titre-page">Mot de passe oublié</h1><br>
            <form v-if="!submited" @submit.prevent="">

                <label for="email">Adresse e-mail pour envoi du lien de réinitialisation :</label>
                <input v-model="mail" :class="{badInput : isEmptyMail || !isMailCorrect}" @keyup="checkImputKeyUp" id="email" name="email" type="email">
                <p v-if="isEmptyMail" class="errorMsg errorMsgImput">Veuillez saisir votre adresse mail.</p>
                <p v-if="!isMailCorrect" class="errorMsg errorMsgImput">Adresse mail incorrecte.</p>

                <input @click="submitResetPassword" class="principal" value="Envoyer">
            </form>
            <h2 v-else>Un mail de réinitialisation vient de vous être envoyé.</h2>
        </div> 
    </div>
</template>
<script>
    export default {
        data() {
            return {
                mail:'',
                isEmptyMail: false,
                isMailCorrect: true,
                submited: false,
            }
        },
        methods: {
            submitResetPassword() {
                this.checkImputSubmit(); // Vérifie si tous les champs sont remplis
                this.checkMail(); // Vérifie si le format du mail est correct
                if (this.isEmptyMail == false &&  this.isMailCorrect == true) {
                    this.submited = true;
                }
            },
            checkImputSubmit() { // Vérifie si tous les champs sont remplis
                this.isEmptyMail = false; // Remets tous les booléens à false 
                if (this.mail == '') {
                    this.isEmptyMail = true;
                }
            },
            checkMail() {
                this.isMailCorrect = true;
                const pattern = /^[a-z0-9.-]{2,}@+[a-z0-9.-]{2,}$/i;
                if (pattern.test(this.mail)) {
                    this.isMailCorrect = true;
                } else {
                    this.isMailCorrect = false;
                }
            },
            checkImputKeyUp() { // Vérifie si le champs est remplis au moment où l'utilisateur saisi dans un champs
                if (this.mail != '') {
                  this.isEmptyMail = false;
                } 
            },
            
        }
    }
</script>
