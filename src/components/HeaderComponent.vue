<template>
    <header>
        <div id="content-header">
            <div id="logo-titre">
                <div id="logo-header">
                    <router-link  to="/home"><img id ="img-logo" alt="Accueil du site" title="Retour à l'accueil du site" src="medias/LOGO_ROUND_YELLOW.png"></router-link>
                </div>
                <h1>BRUT MESSENGER</h1>
            </div>
            <nav>
                <router-link to='/home#fourth-section' class="nav-item">Télécharger l'app</router-link>
                <router-link to="/register"  class="nav-item inscription">Inscription</router-link>
            </nav>
        </div>
    </header>
</template>