<template>

  <router-link to="/home"><img src="../../public/medias/back.png" alt="Retour à l'accueil du site" id="return-icon" title="Retour à l'accueil du site"/></router-link>

  <div id="content-body">
    <div id="register-form" >
      <h1 class="titre-page">Inscription à Brut Messenger</h1>
      <form v-if="!isSubmited" @submit.prevent="">

        <label for="first-name">Prénom</label><br />
        <input v-model="userData.firstName" :class="{badInput: isEmptyFirstName}" @keyup="checkImputKeyUp" id="first-name" name="first-name" type="text" />
        <p v-if="isEmptyFirstName" class="errorMsg errorMsgImput" id="firstNameEmpty">Veuillez saisir votre prénom</p>

        <label for="last-name">Nom</label>
        <input v-model="userData.lastName" :class="{badInput: isEmptyLastName}" @keyup="checkImputKeyUp" id="last-name" name="last-name" type="text" />
        <p v-if="isEmptyLastName" class="errorMsg errorMsgImput" id="lastNameEmpty">Veuillez saisir votre nom</p>

        <label for="birth">Date de naissance</label>
        <input v-model="userData.birthday" :class="{badInput: isEmptyBirthday}" @keyup="checkImputKeyUp" id="birth" name="birth" type="date" />
        <p v-if="isEmptyBirthday" class="errorMsg errorMsgImput" id="birthdayEmpty">Veuillez saisir votre date de naissance</p>

        <label for="email">Adresse e-mail</label>
        <input v-model="userData.mail" :class="{badInput: isEmptyMail || !isMailCorrect}" @keyup="checkImputKeyUp" id="email" name="email" type="email" />
        <p v-if="isEmptyMail" class="errorMsg errorMsgImput" id="emailEmpty">Veuillez saisir votre adresse mail</p>
        <p v-if="!isMailCorrect" class="errorMsg errorMsgImput" id="emailError">Adresse mail incorrecte.</p>

        <label for="password">Mot de passe</label>
        <input v-model="userData.password" :class="{badInput: isEmptyPassword || !isPasswordsMatch}" @keyup="checkPasswordKeyUp" id="password" name="password" type="password" />
        <p v-if="isEmptyPassword" class="errorMsg errorMsgImput" id="passwordEmpty">Veuillez saisir un mot de passe</p>

        <label for="re-password">Ressaisir le mot de passe</label>
        <input v-model="userData.rePassword" :class="{badInput: isEmptyRePassword || !isPasswordsMatch}" @keyup="checkPasswordKeyUp" id="re-password" name="re-password" type="password"/>
        <p v-if="isEmptyRePassword" class="errorMsg errorMsgImput" id="rePasswordEmpty">Veuillez ressaisir votre mot de passe</p>

        <p v-if="!isPasswordsMatch" class="errorMsg p-center" id="passwordsMatch">Les deux mots de passe saisis ne sont pas identiques!</p>
        <p v-if="isPasswordError" class="errorMsg p-center" id="passwordError">Le mot de passe doit contenir : </p>
        <p v-if="!password.containUppercase" class="errorMsg p-center" id="containUppercase">Une lettre majuscule</p>
        <p v-if="!password.containLowercase" class="errorMsg p-center" id="containLowercase">Une lettre minuscule</p>
        <p v-if="!password.containNumber" class="errorMsg p-center" id="containNumber">Un chiffre</p>
        <p v-if="!password.isLongEnough" class="errorMsg p-center" id="isLongEnough">8 caractères minimums</p>
        <p v-if="serverError" class="errorMsg p-center" id="serverError">{{ serverResponse }}</p>

        <input @click="submitRegistration" class="principal"  value="Inscriptions" />
      </form>
      <h2 v-else id="success">{{ serverResponse }}</h2>
    </div>
  </div>

</template>

<script>
  import UserDataService from '@/services/UserDataService';
  import CryptoService from '@/services/CryptoService';

  export default {
    data() {
        return {
          userData: {
            firstName:        '',
            lastName:         '',
            name:             '',
            birthday:         '',
            mail:             '',
            password:         '',
            rePassword:       '',
          },
          password : {
            containUppercase:   true,
            containLowercase:   true,
            containNumber :     true,
            isLongEnough:       true,
          },
          isSubmited:         false,
          isEmptyFirstName:   false,
          isEmptyLastName:    false,
          isEmptyBirthday:    false,
          isEmptyMail:        false,
          isEmptyPassword:    false,
          isEmptyRePassword:  false,
          isEmptyImput:       false,
          isPasswordsMatch:   true,
          isMailCorrect:      true,
          serverError:        false,
          isPasswordError:    false,
          serverResponse:     '',
        }
    },
    methods: {

      submitRegistration() {

        //? Exécuter les fonctions de vérification des données
        this.checkImputSubmit(); // Vérifie si tous les champs sont remplis
        this.checkPassword(); // Vérifie si le format du password est respecté er si les deux password sont identiques
        this.checkMailFormat(); // Vérifie si le format du mail est correct

        //? Vérifier que toutes les conditions préalables sont respectées
        if (this.isEmptyImput == false && this.isPasswordsMatch == true && this.isMailCorrect == true && this.isPasswordError == false) {

          //? Appeler la méthode generateKeys() du service CryptoService
          let userKeys = CryptoService.generateKeys();

          //? Construire l'objet à passer en paramètre de la méthode addUser()
          const user = {
            firstName:    this.userData.firstName,
            lastName:     this.userData.lastName,
            birthday:     this.userData.birthday,
            email:        this.userData.mail,
            password:     this.userData.password,
            publicKey:    userKeys.public,
            privateKey:   userKeys.private
            }

          //? Appeller la métode addUser() du service UserDataService
          UserDataService.addUser(user).then (message => {
            this.serverResponse = message.text;

            if (message.code === 200) {
              this.isSubmited = true;
            } else {
              this.isSubmited = false;
              this.serverError = true;
            }
          });
        }
      },

      checkImputSubmit() { // Vérifie si tous les champs sont remplis
        
        //? Réinitialiser les booléens
        this.resetIsEmptyData();

        //? Vérifier chaque data pour modifier la valeur des booléens
        if (this.userData.firstName == '') {
            this.isEmptyFirstName = true;
            this.isEmptyImput = true;
        }
        if (this.userData.lastName == '') {
            this.isEmptyLastName = true;
            this.isEmptyImput = true;
        }
        if (this.userData.birthday == '') {
            this.isEmptyBirthday = true;
            this.isEmptyImput = true;
        }
        if (this.userData.mail == '') {
            this.isEmptyMail = true;
            this.isEmptyImput = true;
        }
        if (this.userData.password == '') {
            this.isEmptyPassword = true;
            this.isEmptyImput = true;
        }
        if (this.userData.rePassword == '') {
            this.isEmptyRePassword = true;
            this.isEmptyImput = true;
        }
      },

      checkImputKeyUp() { // Vérifie si le champs est remplis au moment où l'utilisateur saisi dans un champs

        if (this.userData.firstName != '') {
            this.isEmptyFirstName = false;
        } 
        if (this.userData.lastName != '') {
            this.isEmptyLastName = false;
        } 
        if (this.userData.birthday != '') {
            this.isEmptyBirthday= false;
        } 
        if (this.userData.mail != '') {
            this.isEmptyMail = false;
        } 
        if (this.userData.password != '') {
            this.isEmptyPassword = false;
        } 
        if (this.userData.rePassword != '') {
            this.isEmptyRePassword = false;
        }
      },

      checkPasswordKeyUp() { //Vérifie sii les champs sont remplis lors de la saisir et vérifie le format du password
        this.checkImputKeyUp();
        this.checkPasswordFormat();
      },

      resetIsEmptyData() { // Remets tous les booléens à false 
          this.isEmptyImput       = false; 
          this.isEmptyFirstName   = false;
          this.isEmptyLastName    = false;
          this.isEmptyMail        = false;
          this.isEmptyBirthday    = false;
          this.isEmptyPassword    = false;
          this.isEmptyPassword    = false; 
      },

      checkPassword() { // Vérifie si les deux password sont identiques
          this.isPasswordsMatch  = true;
        if (this.userData.password != this.userData.rePassword) {
          this.isPasswordsMatch  = false;
        }
      },

      checkPasswordFormat() {
        //Réinialiser les booléens
        this.password.containUppercase      = true;
        this.password.containLowercase      = true;
        this.password.containNumber         = true;
        this.password.isLongEnough          = true;
        this.isPasswordError                = false;

        //Définir les pattern des regex
        const upperCasePattern          = new RegExp(/[A-Z]/g);
        const lowerCasePattern          = new RegExp(/[a-z]/g);
        const numberPattern             = new RegExp(/[0-9]/g);
        
        //Vérifier si le mot de passe contient une majuscule
        if (!upperCasePattern.test(this.userData.password)) {
          this.password.containUppercase  = false;
          this.isPasswordError            = true;
          console.log("contient une majuscule");
        }
        //Vérifier si le mot de passe contient une minuscule
        if (!lowerCasePattern.test(this.userData.password)) {
          this.password.containLowercase  = false;
          this.isPasswordError            = true;
          console.log("contient une minuscule");
        }
        //Vérifier si le mot de passe contient un chiffre
        if (!numberPattern.test(this.userData.password)) {
          this.password.containNumber     = false;
          this.isPasswordError            = true;
          console.log("ne contient pas un chiffre");
        }
        //Vérifier la longueur
        if (this.userData.password.length < 8 ) {
          this.password.isLongEnough      = false;
          this.isPasswordError            = true;
          console.log("ne contient pas 8 caracères");
        }
        
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
    },
  }
</script>
