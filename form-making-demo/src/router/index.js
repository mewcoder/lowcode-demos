import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/drag1",
    name: "Drag1",
    component: () =>
      import(/* webpackChunkName: "drag1" */ "../views/DragDemo1.vue"),
  },
  {
    path: "/drag2",
    name: "Drag2",
    component: () =>
      import(/* webpackChunkName: "drag2" */ "../views/DragDemo2.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
