<template>

  <router-link to="/home"><img src="MEDIAS/back.png" alt="Retour à l'accueil du site" id="return-icon" title="Retour à l'accueil du site"/></router-link>

  <div id="content-body">
    <div id="register-form" @click="checkImputKeyUp">
      <h1 class="titre-page">Inscription à Brut Messenger</h1>
      <form v-if="!submited" @submit.prevent="">

        <label for="first-name">Prénom</label><br />
        <input v-model="userData.firstName" :class="{badInput: isEmptyFirstName}" @keyup="checkImputKeyUp" id="first-name" name="first-name" type="text" />
        <p v-if="isEmptyFirstName" class="errorMsg errorMsgImput">Veuillez saisir votre prénom</p>

        <label for="last-name">Nom</label>
        <input v-model="userData.lastName" :class="{badInput: isEmptyLastName}" @keyup="checkImputKeyUp" id="last-name" name="last-name" type="text" />
        <p v-if="isEmptyLastName" class="errorMsg errorMsgImput">Veuillez saisir votre nom</p>

        <label for="birth">Date de naissance</label>
        <input v-model="userData.birthday" :class="{badInput: isEmptyBirthday}" @keyup="checkImputKeyUp" id="birth" name="birth" type="date" />
        <p v-if="isEmptyBirthday" class="errorMsg errorMsgImput">Veuillez saisir votre date de naissance</p>

        <label for="email">Adresse e-mail</label>
        <input v-model="userData.mail" :class="{badInput: isEmptyMail || !isMailCorrect}" @keyup="checkImputKeyUp" id="email" name="email" type="email" />
        <p v-if="isEmptyMail" class="errorMsg errorMsgImput">Veuillez saisir votre adresse mail</p>
        <p v-if="!isMailCorrect" class="errorMsg errorMsgImput">Adresse mail incorrecte.</p>

        <label for="password">Mot de passe</label>
        <input v-model="userData.password" :class="{badInput: isEmptyPassword || passwordError}" @keyup="checkImputKeyUp" id="password" name="password" type="password" />
        <p v-if="isEmptyPassword" class="errorMsg errorMsgImput">Veuillez saisir un mot de passe</p>

        <label for="re-password">Ressaisir le mot de passe</label>
        <input v-model="userData.rePassword" :class="{badInput: isEmptyRePassword || passwordError}" @keyup="checkImputKeyUp" id="re-password" name="re-password" type="password"/>
        <p v-if="isEmptyRePassword" class="errorMsg errorMsgImput">Veuillez ressaisir votre mot de passe</p>

        <p v-if="passwordError" class="errorMsg p-center">Les deux mots de passe saisis ne sont pas identiques!</p>

        <p v-if="serverError" class="errorMsg p-center">{{ serverResponse }}</p>

        <input @click="submitRegistration" class="principal"  value="Inscriptions" />
      </form>
      <h2 v-else>{{ serverResponse }}</h2>
    </div>
  </div>

</template>

<script>
  import UserDataService from '@/services/UserDataService';

  export default {
    data() {
        return {
          userData: {
            firstName: '',
            lastName: '',
            name: '',
            birthday: '',
            mail: '',
            password: '',
            rePassword: '',
          },
          submited: false,
          isEmptyFirstName: false,
          isEmptyLastName: false,
          isEmptyBirthday: false,
          isEmptyMail: false,
          isEmptyPassword: false,
          isEmptyRePassword: false,
          emptyImput: false,
          passwordError: false,
          isMailCorrect: true,
          serverResponse: '',
          serverError: false
        }
    },
    methods: {
      submitRegistration() {
        //? On exécute les fonctions de vérification
        this.checkImputSubmit(); // Vérifie si tous les champs sont remplis
        this.checkPassword(); // Vérifie si les deux password sont identiques
        this.checkMail(); // Vérifie si le format du mail est correct

         //? On vérifie que toutes les conditions préalables sont respectées
        if (this.emptyImput==false && this.passwordError==false && this.isMailCorrect==true) {

          //? On construit l'objet à passer en paramètre de la méthode addUser()
          const user = {
            firstName: this.userData.firstName,
            lastName: this.userData.lastName,
            birthday: this.userData.birthday,
            email: this.userData.mail,
            password: this.userData.password
          }

          //? On appelle la métode addUser du service UserDataService
          UserDataService.addUser(user).then (message => {
            console.log(message);
            this.serverResponse = message.text;

            if (message.code === 200) {
              this.submited = true;
            } else {
              this.submited = false;
              this.serverError = true;
            }
          });
          
        }
      },
      checkImputSubmit() { // Vérifie si tous les champs sont remplis
              this.resetIsEmptyData(); // Remets tous les booléens à false 
              if (this.userData.firstName == '') {
                  this.isEmptyFirstName= true;
                  this.emptyImput= true;
              }
              if (this.userData.lastName == '') {
                  this.isEmptyLastName= true;
                  this.emptyImput= true;
              }
              if (this.userData.birthday == '') {
                  this.isEmptyBirthday= true;
                  this.emptyImput= true;
              }
              if (this.userData.mail == '') {
                  this.isEmptyMail= true;
                  this.emptyImput= true;
              }
              if (this.userData.password == '') {
                  this.isEmptyPassword= true;
                  this.emptyImput= true;
              }
              if (this.userData.rePassword == '') {
                  this.isEmptyRePassword= true;
                  this.emptyImput= true;
              }
          },
          checkImputKeyUp() { // Vérifie si le champs est remplis au moment où l'utilisateur saisi dans un champs
              if (this.userData.firstName != '') {
                  this.isEmptyFirstName= false;
              } 
              if (this.userData.lastName != '') {
                  this.isEmptyLastName= false;
              } 
              if (this.userData.birthday != '') {
                  this.isEmptyBirthday= false;
              } 
              if (this.userData.mail != '') {
                  this.isEmptyMail= false;
              } 
              if (this.userData.password != '') {
                  this.isEmptyPassword= false;
              } 
              if (this.userData.rePassword != '') {
                  this.isEmptyRePassword= false;
              } 
          },
          resetIsEmptyData() { // Remets tous les booléens à false 
              this.emptyImput=false; 
              this.isEmptyFirstName= false;
              this.isEmptyLastName= false;
              this.isEmptyMail= false;
              this.isEmptyBirthday= false;
              this.isEmptyPassword= false;
              this.isEmptyPassword= false; 
          },
          checkPassword() { // Vérifie si les deux password sont identiques
              this.passwordError = false;
            if (this.userData.password != this.userData.rePassword) {
              this.passwordError= true;
            }
          },
          checkMail() { // Vérifie si le format du mail est correct
            this.isMailCorrect = true;
            const pattern = /^[a-z0-9.-]{2,}@+[a-z0-9.-]{2,}$/i;
            if (this.userData.mail != '') {
              if (pattern.test(this.userData.mail)) {
              this.isMailCorrect = true;
              } else {
                this.isMailCorrect = false;
              }
            }
          }
    },
  }
</script>
