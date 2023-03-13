<template>
    <router-link to="/home"><img src="MEDIAS/back.png" alt="Retour à l'accueil du site" title="Retour à l'accueil du site"></router-link>
    <div id="content-body">
        <div id="contact-form">
            <h1 class="titre-page">Formulaire de contact</h1><br>
            <form v-if="!submited" @submit.prevent="">
                <label for="first-name">Identifiant</label><br>
                <input id="first-name" name="first-name" type="text"><br>
                <label for="name">Nom</label><br>
                <input id="name" name="name" type="text"><br>
                <label for="email">Adresse e-mail</label><br>
                <input id="email" name="email" type="email"><br>
                <label for="subjet">Sujet</label><br>
                <input id="subject" name="subject" type="text"><br>
                <label for="message">Message</label><br>
                <textarea id="message" name="message"> Saisir votre message ici </textarea><br>
                <input @click="submitMessage" class="principal" value="Envoyer">
            </form>
            <h2 v-else>Votre message a bien été envoyé!</h2>
        </div> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            messageData: {
                firstName: '',
                lastName: '',
                mail: '',
                msgSubject: '',
                message: ''
            },
            submited: false,
        }
    },
    methods: {
        submitMessage() {
            this.submited=true;
        }
    }
}
</script>