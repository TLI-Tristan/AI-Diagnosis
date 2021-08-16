import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import BrainTumor from "../views/BrainTumor.vue";
import Stroke from "../views/Stroke.vue";
import Heart from "../views/Heart.vue";
import BrainTumorReport from "../views/BrainTumorReport.vue";
import ReportList from "../views/ReportList.vue";
import Report from "../views/Report.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { restricted: false },
    props: true,
  },
  {
    path: "/profile",
    name: "Profile",
    meta: { restricted: true },
    component: Profile,
  },
  {
    path: "/braintumor",
    name: "BrainTumor",
    meta: { restricted: true },
    component: BrainTumor,
  },
  {
    path: "/stroke",
    name: "Stroke",
    meta: { restricted: false },
    component: Stroke,
  },
  {
    path: "/heart",
    name: "Heart",
    meta: { restricted: false },
    component: Heart,
  },
  {
    path: "/braintumor/report/:patientid",
    name: "BrainTumorReport",
    meta: { restricted: true },
    component: BrainTumorReport,
    props: true,
  },
  {
    path: "/reportlist",
    name: "ReportList",
    meta: { restricted: true },
    component: ReportList,
  },
  {
    path: "/report/:patientid",
    name: "Report",
    meta: { restricted: true },
    component: Report,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(to.path + " Restricted: " + to.meta.restricted);
  if (to.meta.restricted) {
    if (!store.state.token) {
      console.log("no token");
      return next({ name: "Login", params: { restrict: "forbidden" } });
    } else {
      fetch("http://127.0.0.1:3000/verifyToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: store.state.token,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.result != "success") {
            console.log("invalid token");
            return next({ name: "Login", params: { restrict: "forbidden" } });
          } else {
            return next();
          }
        })
        .catch((error) => console.log("error", error));
    }
  } else {
    return next();
  }
});

export default router;
