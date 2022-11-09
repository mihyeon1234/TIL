import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import HelloView from "@/views/HelloView";
import LoginView from "@/views/LoginView";
import NotFount404 from "@/views/NotFount404";

Vue.use(VueRouter);
const isLoggedIn = true;
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    // lazy-loading 방식 (첫 로딩에 렌더링 하지않고 해당 라우터가 동작할 때 컴포넌트를 렌더링 한다.)
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/hello/:userName",
    name: "hello",
    component: HelloView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    // 로그인이 되 있으면 home으로 이동
    beforeEnter(to, from, next) {
      if (isLoggedIn) {
        next({ name: "home" });
      } else {
        next();
      }
    },
  },  {
    path: "/404",
    name: "NotFount404",
    component: NotFount404,
  }, {
    path: "*",
    redirect:'/404',
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// URL이 변경되어 화면이 전환되기 전 router.beforeEach()가 호출됨
router.beforeEach((to, from, next) => {
  // to = 이동할 URL 정보가 담긴 route 객체
  // from = 현재 URL 정보가 담긴 route 객체
  // next = 지정한  URL 로 이동하기 위해 호출하는 함수
  //       콜백 함수 내에서 반드시 한 번만 호출되어야함
  //       기본적으로 to 에 해당하는 URL로 이동

  //로그인 여부
  const isLoggedIn = false;

  //로그인이 필요한 페이지인지
  const autoPages = ["hello", "home"];

  //로그인이 안되어있으면 로그인페이지로, 되있으면 원하는데로
  const isAuthRequired = autoPages.includes(to.name);
  if (isAuthRequired && !isLoggedIn) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
