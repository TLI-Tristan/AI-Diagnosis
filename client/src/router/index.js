import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import BrainTumor from "../views/BrainTumor.vue";
import Stroke from "../views/Stroke.vue";
import Heart from "../views/Heart.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/braintumor",
    name: "BrainTumor",
    component: BrainTumor,
  },
  {
    path: "/stroke",
    name: "Stroke",
    component: Stroke,
  },
  {
    path: "/heart",
    name: "Heart",
    component: Heart,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
