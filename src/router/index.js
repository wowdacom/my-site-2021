import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    // 登出 / 未登入
    path: "/About",
    name: "About",
    component: () => import("../components/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
