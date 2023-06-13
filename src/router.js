import { createWebHistory, createRouter } from "vue-router";

const routes =  [
{//Route vers la page d'accueil (présentation des fonctionnalités)
    path: "/",
    alias: "/home",
    name: "home",
    component: () => import("./views/HomeView")
},
{// Route vers le formulaire d'inscription
    path: "/register",
    name: "register",
    component: () => import("./views/RegisterView")
},
{// Route vers le formulaire de contact
    path: "/contact",
    name: "contact",
    component: () => import("./views/ContactView")
},
{// Route vers la politique de confidentialité
    path: "/privacy-policy",
    name: "privacy-policy",
    component: () => import("./views/PrivacyPolicyView")
},
{// Route vers les conditions d'utilisation
    path: "/terms-of-use",
    name: "terms-of-use",
    component: () => import("./views/TermsOfUseView")
},
{// Route vers les la réinitialisation du MDP
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("./views/ForgotPasswordView")
},
{ // Route vers la page qui sert si la page demandée n'est pas trouvée
    name:'NotFound',
    path:'/:pathMatch(.*)', // Redirige vers NotFound.vue si la route demandée n'est pas répertoriée
    component: () => import("./views/NotFoundView.vue")
},
{ // Route vers la page qui gère les retours de l'api d'activation de compte
    path:'/account-activation/:status',
    name: "account-activation",
    component: () => import("./views/AccountActivationView.vue")
},
];

const router = createRouter({
history: createWebHistory(),
routes,
});

export default router;