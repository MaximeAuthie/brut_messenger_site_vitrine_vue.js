<template>
  <router-link to="/home"
    ><img
      src="MEDIAS/back.png"
      alt="Retour à l'accueil du site"
      title="Retour à l'accueil du site"
  /></router-link>
  <div id="content-body">
    <div id="register-form">
      <h1 class="titre-page">Inscription à Brut Messenger</h1>
      <form v-if="!submited" @submit.prevent="">
        <label for="first-name">Prénom</label><br />
        <input v-model="firstName" id="first-name" name="first-name" type="text" /><br />
        <label for="name">Nom</label><br />
        <input v-model="lastName" id="name" name="name" type="text" /><br />
        <label for="birth">Date de naissance</label><br />
        <input v-model="birthday" id="birth" name="birth" type="date" /><br />
        <label for="email">Adresse e-mail</label><br />
        <input v-model="mail" id="email" name="email" type="email" /><br />
        <label for="password">Mot de passe</label><br />
        <input v-model="password" id="password" name="password" type="password" /><br />
        <label for="re-password">Ressaisir le mot de passe</label><br />
        <input v-model="rePassword" id="re-password" name="re-password" type="password"/><br />
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
      }
  },
  methods: {
    submitRegistration() {
      this.submited=true;
    }
  },
}
</script>
