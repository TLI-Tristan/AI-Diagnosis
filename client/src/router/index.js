import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import BrainTumor from "../views/BrainTumor.vue";
import Stroke from "../views/Stroke.vue";
import Heart from "../views/Heart.vue";
import BrainTumorReport from "../views/BrainTumorReport.vue";
import ReportList from "../views/ReportList.vue";
import Report from "../views/Report.vue";
import StrokeForm from "../views/StrokeForm";
import StrokeDetails from "../views/StrokeDetails";

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
  {
    path: "/braintumor/report/:patientid",
    name: "BrainTumorReport",
    component: BrainTumorReport,
    props: true,
  },
  {
    path: "/reportlist",
    name: "ReportList",
    component: ReportList,
  },
  {
    path: "/report/:patientid",
    name: "Report",
    component: Report,
    props: true,
  },
  {
    path: "/strokeForm",
    name: "StrokeForm",
    component: StrokeForm,
  },
  {
    path: "/strokeDetails",
    name: "StrokeDetails",
    component: StrokeDetails,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
