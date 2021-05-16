import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Simulink后台首页', icon: 'dashboard' }
    }]
  }]
/**
 * 动态路由
 */
export const asyncRoutes = [
  {
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    name: '权限管理',
    meta: { title: '权限管理', icon: 'chart' },
    children: [
      {
        path: 'user/list',
        name: '用户管理',
        component: () => import('@/views/acl/user/list'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role/list',
        name: '角色管理',
        component: () => import('@/views/acl/role/list'),
        meta: { title: '角色管理' }
      },
      {
        path: 'role/form',
        name: '角色添加',
        component: () => import('@/views/acl/role/form'),
        meta: { title: '角色添加' },
        hidden: true
      },
      {
        path: 'role/update/:id',
        name: '角色修改',
        component: () => import('@/views/acl/role/form'),
        meta: { title: '角色修改' },
        hidden: true
      },
      {
        path: 'role/distribution/:id',
        name: '角色权限',
        component: () => import('@/views/acl/role/roleForm'),
        meta: { title: '角色权限' },
        hidden: true
      },
      {
        path: 'menu/list',
        name: '菜单管理',
        component: () => import('@/views/acl/menu/list'),
        meta: { title: '菜单管理' }
      },
      {
        path: 'user/add',
        name: '用户添加',
        component: () => import('@/views/acl/user/form'),
        meta: { title: '用户添加' },
        hidden: true
      },
      {
        path: 'user/update/:id',
        name: '用户修改',
        component: () => import('@/views/acl/user/form'),
        meta: { title: '用户修改' },
        hidden: true
      },
      {
        path: 'user/role/:id',
        name: '用户角色',
        component: () => import('@/views/acl/user/roleForm'),
        meta: { title: '用户角色' },
        hidden: true
      },
      

    ]
  },
   // 班课管理
   {
    path: '/edu/course',
    component: Layout,
    redirect: 'edu/course/list',
    name: '班课管理',
    meta: { title: '班课管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '班课列表',
        component: () => import('@/views/edu/course/list'),
        meta: { title: '班课列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加班课',  
        component: () => import('@/views/edu/course/save'),
        meta: { title: '添加班课', icon: 'tree' }
      },
      {
        path: 'edit/:id',   
        name: '编辑班课',
        component: () => import('@/views/edu/course/save'),
        meta: { title: '编辑班课', noCache: true },
        hidden: true
      }
    ]
  },
   // 班课管理
   {
    path: '/edu/experiment',
    component: Layout,
    redirect: 'edu/experiment/list',
    name: '实验管理',
    meta: { title: '实验管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '实验列表',
        component: () => import('@/views/edu/experiment/list'),
        meta: { title: '实验列表', icon: 'table' }
      },
      {
        path: 'list/:id',
        name: '实验列表',
        component: () => import('@/views/edu/experiment/list'),
        meta: { title: '实验列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加实验',  
        component: () => import('@/views/edu/experiment/save'),
        meta: { title: '添加实验', icon: 'tree' }
      },
      {
        path: 'edit/:id',   
        name: '编辑实验',
        component: () => import('@/views/edu/experiment/save'),
        meta: { title: '编辑实验', noCache: true },
        hidden: true
      },,
      {
        path: 'detail/:id',   
        name: '实验详情',
        component: () => import('@/views/edu/experiment/detail'),
        meta: { title: '实验详情', noCache: true },
        hidden: true
      }
    ]
  },
  // 用户管理
  {
    path: '/edu/user',
    component: Layout,
    redirect: 'edu/user/list',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '用户列表',
        component: () => import('@/views/edu/user/list'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'courseuser/:id',
        name: '班课用户',
        component: () => import('@/views/edu/user/courseuer'),
        meta: { title: '班课用户', icon: 'table' },
        hidden: true
      },
    ]
  },
  // 评分管理
  {
    path: '/edu/score',
    component: Layout,
    redirect: 'edu/score/list',
    name: '评分管理',
    meta: { title: '评分管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '评分列表',
        component: () => import('@/views/edu/score/index'),
        meta: { title: '评分列表', icon: 'table' }
      },
      {
        path: 'score/:id',
        name: '评分详情',
        component: () => import('@/views/edu/score/score'),
        meta: { title: '评分详情', icon: 'table' },
        hidden: true
      },
    ]
  },  
  //地址管理
  {
   path: '/edu/xpcAttr',
   component: Layout,
   redirect: 'edu/xpcAttr/list',
   name: '地址管理',
   meta: { title: '地址管理', icon: 'example' },
   children: [
     {
       path: 'list',
       name: '地址列表',
       component: () => import('@/views/edu/xpcAttr/list'),
       meta: { title: '地址列表', icon: 'table' }
     },
     {
       path: 'save',
       name: '添加地址',  
       component: () => import('@/views/edu/xpcAttr/save'),
       meta: { title: '添加地址', icon: 'tree' }
     },
     {
       path: 'edit/:id',   
       name: '编辑地址',
       component: () => import('@/views/edu/xpcAttr/save'),
       meta: { title: '编辑地址', noCache: true },
       hidden: true
     },
   ]
 },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })

export default router
