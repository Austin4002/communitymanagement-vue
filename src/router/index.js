import Vue from 'vue'
import VueRouter from 'vue-router'

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    component:()=> import('../views/Login')
  },
  {
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    path: '/login',
    component:()=> import('../views/Login')
  },
  {
    path: '/home',
    component:()=>import('../views/Home'),
    redirect: '/welcome',
    children:[
      { path:'/welcome',component: () => import('../views/Welcome')},
        //admin的
      { path:'/home/permission/roleList', component: ()=> import('../views/admin/permission/RoleList')},
      { path:'/home/userManagement/list', component: ()=> import('../views/admin/userManagement/UserList')},
      { path:'/home/userManagement/list/userInfo', component: ()=> import('../views/admin/userManagement/UserInfo')},
      { path:'/home/userManagement/class', component: ()=> import('../views/admin/userManagement/ClazzList')},

      // { path:'/home/userManagement/club', component: ()=> import('../views/admin/clubManagement/ClubList')},
      // { path:'/home/userManagement/club/clubInfo', component: ()=> import('../views/admin/clubManagement/ClubInfo')},

      { path:'/home/eventManagement/newEvent', component: ()=> import('../views/admin/eventManagement/NewEvent')},
      { path:'/home/eventManagement/approve', component: ()=> import('../views/admin/eventManagement/EventApprove')},
      { path:'/home/eventManagement/approve/eventInfo', component: ()=> import('../views/admin/eventManagement/EventInfo')},
      { path:'/home/clubManagement/club', component: ()=> import('../views/admin/clubManagement/ClubList')},
      { path:'/home/clubManagement/club/clubInfo', component: ()=> import('../views/admin/clubManagement/ClubInfo')},
      { path:'/home/clubManagement/clubStarSet', component: ()=> import('../views/admin/clubManagement/ClubRateSet')},
      //社长的
      { path:'/home/proprieter/personal/personalInfo', component: ()=> import('../views/proprieter/personal/personalInfo')},
      { path:'/home/proprieter/clubManagement/clubUserList', component: ()=> import('../views/proprieter/clubManagement/ClubUserList')},
      { path:'/home/proprieter/eventManagement/newEvent', component: ()=> import('../views/proprieter/eventManagement/NewEvent')},
      { path:'/home/proprieter/eventManagement/eventList', component: ()=> import('../views/proprieter/eventManagement/EventList')},
      { path:'/home/proprieter/eventManagement/eventInfo', component: ()=> import('../views/proprieter/eventManagement/EventInfo')},
      //学生的
      { path:'/home/student/personal/personalInfo', component: ()=> import('../views/proprieter/personal/personalInfo')},
      { path:'/home/student/personal/eventList', component: ()=> import('../views/student/EventList')},
      { path:'/home/student/personal/eventList/eventInfo', component: ()=> import('../views/student/EventInfo')},
      { path:'/home/student/personal/club', component: ()=> import('../views/student/ClubList')},
    ],
  }
]


const router = new VueRouter({
  mode:'history',
  routes
})



// 路由导航守卫
// router.beforeEach((to,from,next) =>{
//   if (to.path === '/login'){
//     return next()
//   }
//   const tokenStr = window.sessionStorage.getItem('token');
//   if (tokenStr == null){
//     return next('/login')
//   }
//   return next()
// })

export default router
