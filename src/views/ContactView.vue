<template>
    <router-link to="/home"><img src="../../public/medias/back.png" id="return-icon" alt="Retour à l'accueil du site" title="Retour à l'accueil du site"></router-link>
    
    <div id="content-body">
        <div id="contact-form">
            <h1 class="titre-page">Formulaire de contact</h1><br>
            <form v-if="!isSubmited" @submit.prevent="">

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

                <label for="subject">Sujet</label>
                <input v-model="messageData.subject" :class="{badInput: isEmptySubject}" @keyup="checkImputKeyUp" id="subject" name="subject" type="text">
                <p v-if="isEmptySubject" class="errorMsg errorMsgImput">Veuillez saisir le l'objet de votre message.</p>

                <label for="message">Message</label>
                <textarea v-model="messageData.content" :class="{badInput: isEmptyMessage}" @keyup="checkImputKeyUp" id="message" name="message">Saisir votre message ici</textarea>
                <p v-if="isEmptyContent" class="errorMsg errorMsgImput">Veuillez saisir un message.</p>

                <p v-if="serverError" class="errorMsg p-center" id="serverError">{{ serverResponse }}</p>

                <input @click="submitMessage" class="principal" value="Envoyer">
            </form>
            <h2 v-else id="success">{{ serverResponse }}!</h2>
        </div> 
    </div>
</template>

<script>
import ContactService from '@/services/ContactService';
export default {
    data() {
        return {
            messageData: {
                firstName:      '',
                lastName:       '',
                mail:           '',
                subject:        '',
                content:        ''
            },
            isSubmited:         false,
            isEmptyFirstName:   false,
            isEmptyLastName:    false,
            isEmptyMail:        false,
            isEmptySubject:     false,
            isEmptyContent:     false,
            emptyImput:         false,
            isMailCorrect:      true,
            serverResponse:     ''
        }
    },
    methods: {
        submitMessage() {

            //? Exécuter les fonctions de vérification des donnée
            this.checkImputSubmit();
            this.checkMail();

            //? Vérifier que toutes les conditions préalables sont respectées
            if (this.emptyImput == false && this.isMailCorrect == true) {
                
                //? Construire l'objet à passer en paramètre de la méthode sendContactMail() du service ContactService
                const contact = {
                    firstName:    this.messageData.firstName,
                    lastName:     this.messageData.lastName,
                    email:        this.messageData.mail,
                    subject:      this.messageData.subject,
                    content:      this.messageData.content
                    }

                //? Appeller la métode sendContactMail() du service ContactService
                ContactService.sendContactMail(contact).then(message => {
                    this.serverResponse = message.text;

                    if (message.code === 200) {
                        this.isSubmited = true;
                    } else {
                        this.isSubmited = false;
                        this.serverError = true;
                    }
                })
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
            if (this.messageData.subject == '') {
                this.isEmptySubject= true;
                this.emptyImput= true;
            }
            if (this.messageData.content == '') {
                this.isEmptyContent= true;
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
        checkMailFormat() { // Vérifie si le format du mail est correct

            //? Réinitialiser le booléen
            this.isMailCorrect = true;3

            //? Définir le regex pour le format mail
            const pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);

            //? Vérifier le si le mail est saisi
            if (this.userData.mail != '') {

                //? Vérifier si la saisie correspond au regex
                if (pattern.test(this.userData.mail)) {
                    this.isMailCorrect = true;
                } else {
                    this.isMailCorrect = false;
                }
            }
        }
    }
}
</script>