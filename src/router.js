import Vue from 'vue'
import Router from 'vue-router'
import { localStorageSetting } from "@/util/ds.common";
Vue.use(Router)

let router = new Router({
  // mode:"history",
  routes: [{
    path: "/",
    name: "default",
    component: () => import("@/layouts/Default/Default.vue"),
    children:[{
      path: "/home",
      name: "home",
      component: () => import("./views/Home"),
      children:[{
        path:"/earthquake",
        name:"earthquake",
        component: () => import("./views/earthquake/earthquake.vue"),
        children:[{
          path:"/earthquakeMap",
          name:"earthquakeMap",
          component: () => import("./views/earthquake/earthquakeMap.vue"),
        },{
          path:"/earthquakelist",
          name:"earthquakelist",
          component: () => import("./views/earthquake/earthquakelist.vue"),
        }]
      },{
        path:"/adm",
        name:"adm",
        component: () => import("./views/adm/adm.vue")
      },{
        path:"/mailList",
        name:"mailList",
        component: () => import("./views/mailList/mailList.vue")
      },{
        path:"/personal",
        name:"personal",
        component: () => import("./views/personal/personal.vue")
      }
    ]
    },
    {
      path: "/collection",
      component: () => import("./views/earthquake/collection.vue")
    },
    // {
    //   path: "/admmanual/:title",
    //   name:"admManual",
    //   props: true,
    //   component: () => import("./views/adm/admManual.vue")
    // },
    {
      path: "/admmanual/:title",
      name:"admManual",
      props: true,
      component: () => import("./views/adm/admArticle2.vue")
    },
    {
      path: "/admarticle/:title/:id",
      name:"admArticle",
      props: true,
      component: () => import("./views/adm/admArticle.vue")
    },
    {
      path: "/admlist/:title",
      name:"admlist",
      props: true,
      component: () => import("./views/adm/admList.vue")
    },
    {
      path: "/admdetail/:title/:types",
      name:"admdetail",
      props: true,
      component: () => import("./views/adm/admDetail.vue")
    },
    {
      path: "/addCollection",
      name:"addCollection",
      component: () => import("./views/earthquake/addCollection.vue")
    },
    {
      path: "/getCenter/:lng/:lat",
      name:"getCenter",
      props:true,
      component: () => import("./views/earthquake/getCenter.vue")
    },
    {
      path: "/",
      redirect: "login"
    },
    {
      path: "/codeChange/:userid",
      props: true,
      component: () => import("./views/personal/codeChange.vue")
    },
    {
      path: "/perNewsChange",
      component: () => import("./views/personal/perNewsChange.vue") 
    }]
  },{
    path:"/login",
    name:"login",
    component: () => import("./views/Login/Login.vue")

  },
  {
    path: "*",
    name:"notFound",
    component: () => import("./_sys_components/404.vue")
  }]
})

// /** 处理路由会重复添加的问题 */
// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// }

router.beforeEach((route, redirect, next) => {
  //权限判断 
  if (localStorageSetting("userid")) {
  if(route.path == "/login" || route.path == "/") next("/earthquakeMap")
  else next()
} else {
  if(route.path == "/login" || route.path == "/") next()
  else next("/login")
}
    next()
})

router.afterEach(() => {
 
})

export default router;