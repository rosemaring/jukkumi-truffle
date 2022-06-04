/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
// import AuthGuard from "./utils/auth.guard";
// import { adminRoot } from "./constants/config";
// import { UserRole } from "./utils/auth.roles";
// import store from "@/store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: `/app/home`,
  },
  {
    path: "/app",
    redirect: `/app/home`,
    component: () => import( /* webpackChunkName: "main" */ "./views/Main"),
    children: [
      {
        path: "home",
        component: () =>
          import( /* webpackChunkName: "myInfo" */ "./views/info/Home"),
      },
      {
        path: "info/me",
        component: () =>
          import( /* webpackChunkName: "myInfo" */ "./views/info/Info"),
      },
      {
        path: "game/create",
        component: () =>
          import( /* webpackChunkName: "gameCreate" */ "./views/game/GameCreate"),
      },
      {
        path: "game/list",
        component: () =>
          import( /* webpackChunkName: "gameList" */ "./views/game/GameList"),
      },
      {
        path: "link",
        component: () =>
          import( /* webpackChunkName: "gameList" */ "./views/link/Link"),
      },
    ]
  },
  // {
  //   path: "/error",
  //   component: () =>
  //     import( /* webpackChunkName: "error" */ "./views/a//Error")
  // },
  // {
  //   path: "*",
  //   component: () =>
  //     import( /* webpackChunkName: "error" */ "./views/a//Error")
  // }
];

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history",
});
export default router;