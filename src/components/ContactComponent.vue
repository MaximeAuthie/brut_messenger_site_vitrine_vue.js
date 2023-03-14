<template>
    <router-link to="/home"><img src="MEDIAS/back.png" id="return-icon" alt="Retour à l'accueil du site" title="Retour à l'accueil du site"></router-link>
    <div id="content-body">
        <div id="contact-form">
            <h1 class="titre-page">Formulaire de contact</h1><br>
            <form v-if="!submited" @submit.prevent="">
                <label for="first-name">Prénom</label><span v-if="isEmptyFirstName" class="errorMsg">   Veuillez saisir votre prénom.</span><br>
                <input v-model="messageData.firstName" :class="{badInput: isEmptyFirstName}" id="first-name" name="first-name" type="text"><br>
                <label for="name">Nom</label><span v-if="isEmptyLastName" class="errorMsg">   Veuillez saisir votre nom.</span><br>
                <input v-model="messageData.lastName" :class="{badInput: isEmptyLastName}" id="name" name="name" type="text"><br>
                <label for="email">Adresse e-mail</label><span v-if="isEmptyMail" class="errorMsg">   Veuillez saisir votre adresse mail.</span><span v-if="!isMailCorrect" class="errorMsg">   Adresse mail incorrecte.</span><br>
                <input v-model="messageData.mail" :class="{badInput : isEmptyMail}" id="email" name="email" type="email"><br>
                <label for="subjet">Sujet</label><span v-if="isEmptySubject" class="errorMsg">   Veuillez saisir le l'objet de votre message.</span><br>
                <input v-model="messageData.msgSubject" :class="{badInput: isEmptySubject}" id="subject" name="subject" type="text"><br>
                <label for="message">Message</label><span v-if="isEmptyMessage" class="errorMsg">   Veuillez saisir un message.</span><br>
                <textarea v-model="messageData.message" :class="{badInput: isEmptyMessage}" id="message" name="message"> Saisir votre message ici </textarea><br>
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
            isEmptyFirstName: false,
            isEmptyLastName: false,
            isEmptyMail: false,
            isEmptySubject: false,
            isEmptyMessage: false,
            emptyImput: false,
            isMailCorrect: true,
        }
    },
    methods: {
        submitMessage() {
            this.checkImput();
            this.checkMail();
            if (this.emptyImput == false && this.isMailCorrect == true) {
                this.submited=true;
            }  
        },
        checkImput() {
            this.resetIsEmptyData();
            if (this.messageData.firstName == '') {
                this.isEmptyFirstName= true;
                this.emptyImput= true;
            }
            if (this.messageData.lastName == '') {
                this.isEmptyLastName= true;
                this.emptyImput= true;
            }
            if (this.messageData.mail == '') {
                this.isEmptyMail= true;
                this.emptyImput= true;
            }
            if (this.messageData.msgSubject == '') {
                this.isEmptySubject= true;
                this.emptyImput= true;
            }
            if (this.messageData.message == '') {
                this.isEmptyMessage= true;
                this.emptyImput= true;
            }
        },
        resetIsEmptyData() {
            this.emptyImput=false;
            this.isEmptyFirstName= false;
            this.isEmptyLastName= false;
            this.isEmptyMail= false;
            this.isEmptySubject= false;
            this.isEmptyMessage= false;
        },
        checkMail() {
          this.isMailCorrect = true;
          const pattern = /^[a-z0-9.-]{2,}@+[a-z0-9.-]{2,}$/i;
          if (pattern.test(this.messageData.mail)) {
            this.isMailCorrect = true;
          } else {
            this.isMailCorrect = false;
          }
        }
    }
}
</script>