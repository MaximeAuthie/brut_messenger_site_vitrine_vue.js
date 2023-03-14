<template>
  <router-link to="/home"
    ><img src="MEDIAS/back.png" alt="Retour à l'accueil du site" id="return-icon" title="Retour à l'accueil du site"
  /></router-link>
  <div id="content-body">
    <div id="register-form">
      <h1 class="titre-page">Inscription à Brut Messenger</h1>
      <form v-if="!submited" @submit.prevent="">
        <label for="first-name">Prénom</label><span v-if="isEmptyFirstName" class="errorMsg">   Veuillez saisir votre prénom</span><br />
        <input v-model="userData.firstName" :class="{badInput: isEmptyFirstName}" id="first-name" name="first-name" type="text" /><br />
        <label for="name">Nom</label><span v-if="isEmptyLastName" class="errorMsg">   Veuillez saisir votre nom</span><br />
        <input v-model="userData.lastName" :class="{badInput: isEmptyLastName}" id="name" name="name" type="text" /><br />
        <label for="birth">Date de naissance</label><span v-if="isEmptyBirthday" class="errorMsg">   Veuillez saisir votre date de naissance</span><br />
        <input v-model="userData.birthday" :class="{badInput: isEmptyBirthday}" id="birth" name="birth" type="date" /><br />
        <label for="email">Adresse e-mail</label><span v-if="isEmptyMail" class="errorMsg">   Veuillez saisir votre adresse mail</span><span v-if="!isMailCorrect" class="errorMsg">   Adresse mail incorrecte.</span><br />
        <input v-model="userData.mail" :class="{badInput: isEmptyMail}" id="email" name="email" type="email" /><br />
        <label for="password">Mot de passe</label><span v-if="isEmptyPassword" class="errorMsg">   Veuillez saisir un mot de passe</span><br />
        <input v-model="userData.password" :class="{badInput: isEmptyPassword, badInput:passwordError}" id="password" name="password" type="password" /><br />
        <label for="re-password">Ressaisir le mot de passe</label><span v-if="isEmptyRePassword" class="errorMsg">   Veuillez ressaisir votre mot de passe</span><br />
        <input v-model="userData.rePassword" :class="{badInput: isEmptyRePassword, badInput:passwordError}" id="re-password" name="re-password" type="password"/><br />
        <p v-if="passwordError" class="errorMsg p-center">Les deux mots de passe saisis ne sont pas identiques!</p>
        <input @click="submitRegistration" class="principal"  value="Inscriptions" />
      </form>
      <h2 v-else>Félicitations! Votre compte à bien été créé!</h2>
    </div>
  </div>
</template>

<script>
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
        isEmptyBirthday:false,
        isEmptyMail: false,
        isEmptyPassword: false,
        isEmptyRePassword: false,
        emptyImput: false,
        passwordError: false,
        isMailCorrect:true,
      }
  },
  methods: {
    submitRegistration() {
      this.checkImput();
      this.checkPassword();
      this.checkMail();
      if (this.emptyImput==false && this.passwordError==false && this.isMailCorrect==true) {
        this.submited=true;
      }
    },
    checkImput() {
            this.resetIsEmptyData();
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
        resetIsEmptyData() {
            this.emptyImput=false;
            this.isEmptyFirstName= false;
            this.isEmptyLastName= false;
            this.isEmptyMail= false;
            this.isEmptySubject= false;
            this.isEmptyMessage= false;
        },
        checkPassword() {
            this.passwordError = false;
          if (this.userData.password != this.userData.rePassword) {
            this.passwordError= true;
          }
        },
        checkMail() {
          this.isMailCorrect = true;
          const pattern = /^[a-z0-9.-]{2,}@+[a-z0-9.-]{2,}$/i;
          if (pattern.test(this.userData.mail)) {
            this.isMailCorrect = true;
          } else {
            this.isMailCorrect = false;
          }
        }
  },
}
</script>
