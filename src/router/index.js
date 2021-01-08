import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    // 登出 / 未登入
    path: "/Login",
    name: "Login",
    component: () => import("../views/Login/Login.vue"),
  },
  {
    // 登出 / 未登入
    path: "/logout",
    name: "Logout",
    component: () => import("../views/Logout/Logout.vue"),
  },
  {
    // 時價登入門牌管理區
    path: "/doorplate",
    name: "DoorplateManage",
    component: () => import("../components/Doorplate/Manage/Manage.vue"),
  },
  {
    // 新聞挑稿區
    path: "/news/pickup",
    name: "Pickup",
    component: () => import("../components/News/Picks/Picks.vue"),
  },
  {
    // 新聞上稿區
    path: "/news/publisher",
    name: "Publisher",
    props: true,
    meta: {
      keepAlive: true, // 需要被缓存
    },
    component: () => import("../components/News/Publisher/Publisher.vue"),
  },
  {
    // 新聞上稿區
    path: "/news/preview/:id?",
    name: "Preview",
    component: () => import("../components/News/Preview/Preview.vue"),
  },
  {
    // 新聞挑選置頂新聞
    path: "/news/top-news",
    name: "top-news",
    component: () => import("../components/News/TopNews/TopNews.vue"),
  },
  {
    // 新聞挑選置頂新聞
    path: "/news/editor/:id?",
    name: "Editor",
    component: () => import("../components/News/Editor/Editor.vue"),
  },
  {
    // 社團管理
    path: "/news/group",
    name: "Group",
    props: true,
    component: () => import("../components/News/Group/Group.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
