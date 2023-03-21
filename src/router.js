import { createWebHistory, createRouter } from "vue-router";

const routes =  [
{//Route vers la page d'accueil (présentation des fonctionnalités)
    path: "/",
    alias: "/home",
    name: "home",
    component: () => import("./components/HomeComponent")
},
{// Route vers le formulaire d'inscription
    path: "/register",
    name: "register",
    component: () => import("./components/RegisterComponent")
},
{// Route vers le formulaire de contact
    path: "/contact",
    name: "contact",
    component: () => import("./components/ContactComponent")
},
{// Route vers la politique de confidentialité
    path: "/privacy-policy",
    name: "privacy-policy",
    component: () => import("./components/PrivacyPolicyComponent")
},
{// Route vers les conditions d'utilisation
    path: "/terms-of-use",
    name: "terms-of-use",
    component: () => import("./components/TermsOfUseComponent")
},
{// Route vers les la réinitialisation du MDP
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("./components/ForgotPasswordComponent")
},
{ // Route vers la page qui sert si la page demandée n'est pas trouvée
    name:'NotFound',
    path:'/:pathMatch(.*)', // Redirige vers NotFound.vue si la route demandée n'est pas répertoriée
    component: () => import("./components/NotFoundComponent.vue")
},
];

const router = createRouter({
history: createWebHistory(),
routes,
});

export default router;