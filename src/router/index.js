import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'index',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },

  {
    path: '/book',
    component: Layout,
    redirect: '/book/up',
    name: 'Book',
    meta: { title: '书本管理', icon: 'book' },
    children: [
      {
        path: 'up',
        name: 'up',
        component: () => import('@/views/up/index'),
        meta: { title: '书本上下架', icon: 'up' }
      },
      {
        path: 'manage',
        name: 'manage',
        component: () => import('@/views/manage/index'),
        meta: { title: '书本种类管理', icon: 'man' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/manage',
    name: 'user',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'manage',
        name: 'manage1',
        component: () => import('@/views/user/index'),
        meta: { title: '用户信息管理', icon: 'user' }
      }
     
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/manage',
    name: 'user',
    meta: { title: '订单管理', icon: 'order' },
    children: [
      {
        path: 'manage',
        name: 'manage2',
        component: () => import('@/views/order/index'),
        meta: { title: '订单管理', icon: 'order' }
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/order/detail'),
        // meta: { title: '订单管理', icon: 'orderr' }
      },
      {
        path: 'ce',
        name: 'ce',
        component: () => import('@/views/List'),
        meta: { title: '测试', icon: 'orderr' }
      },
     
    ]
  },

 

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
