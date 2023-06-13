<template>
    <router-link to="/home"><img src="../../public/medias/back.png" id="return-icon" alt="Retour à l'accueil du site" title="Retour à l'accueil du site"></router-link>
    
    <div id="content-body">
        <div id="contact-form">
            <h1 class="titre-page">Formulaire de contact</h1><br>
            <form v-if="!submited" @submit.prevent="">

                <label for="first-name">Prénom</label>
                <input v-model="messageData.firstName" :class="{badInput: isEmptyFirstName}" @keyup="checkImputKeyUp" id="first-name" name="first-name" type="text">
                <p v-if="isEmptyFirstName" class="errorMsg errorMsgImput">Veuillez saisir votre prénom.</p>

                <label for="name">Nom</label>
                <input v-model="messageData.lastName" :class="{badInput: isEmptyLastName}" @keyup="checkImputKeyUp" id="name" name="name" type="text">
                <p v-if="isEmptyLastName" class="errorMsg errorMsgImput">Veuillez saisir votre nom.</p>

                <label for="email">Adresse e-mail</label>
                <input v-model="messageData.mail" :class="{badInput : isEmptyMail || !isMailCorrect}" @keyup="checkImputKeyUp" id="email" name="email" type="email">
                <p v-if="isEmptyMail" class="errorMsg errorMsgImput">Veuillez saisir votre adresse mail.</p>
                <p v-if="!isMailCorrect" class="errorMsg errorMsgImput">Adresse mail incorrecte.</p>

                <label for="subjet">Sujet</label>
                <input v-model="messageData.msgSubject" :class="{badInput: isEmptySubject}" @keyup="checkImputKeyUp" id="subject" name="subject" type="text">
                <p v-if="isEmptySubject" class="errorMsg errorMsgImput">Veuillez saisir le l'objet de votre message.</p>

                <label for="message">Message</label>
                <textarea v-model="messageData.message" :class="{badInput: isEmptyMessage}" @keyup="checkImputKeyUp" id="message" name="message">Saisir votre message ici</textarea>
                <p v-if="isEmptyMessage" class="errorMsg errorMsgImput">Veuillez saisir un message.</p>

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
            this.checkImputSubmit();
            this.checkMail();
            if (this.emptyImput == false && this.isMailCorrect == true) {
                this.submited=true;
            }  
        },
        checkImputSubmit() {
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
        checkImputKeyUp() { // Vérifie si le champs est remplis au moment où l'utilisateur saisi dans un champs
            if (this.messageData.firstName != '') {
                this.isEmptyFirstName= false;
            } 
            if (this.messageData.lastName != '') {
                this.isEmptyLastName= false;
            } 
            if (this.messageData.mail != '') {
                this.isEmptyBirthday= false;
            } 
            if (this.userData.msgSubject != '') {
                this.isEmptyMail= false;
            } 
            if (this.userData.message != '') {
                this.isEmptyPassword= false;
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