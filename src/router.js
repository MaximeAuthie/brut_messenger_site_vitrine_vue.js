import { createWebHistory, createRouter } from "vue-router";

const routes =  [
{
    path: "/",
    alias: "/home",
    name: "home",
    component: () => import("./components/HomeComponent")
},
{
    path: "/register",
    name: "register",
    component: () => import("./components/RegisterComponent")
},
{
    path: "/contact",
    name: "contact",
    component: () => import("./components/ContactComponent")
},
{
    path: "/privacy-policy",
    name: "privacy-policy",
    component: () => import("./components/PrivacyPolicyComponent")
},
{
    path: "/terms-of-use",
    name: "terms-of-use",
    component: () => import("./components/TermsOfUseComponent")
}
];

const router = createRouter({
history: createWebHistory(),
routes,
});

export default router;