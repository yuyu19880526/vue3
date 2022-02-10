import BasicLayout  from '@/layouts/BasicLayout.vue'
import RouteView from '@/layouts/RouteView.vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    meta: { title: 'Home' },
    component: BasicLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { title: 'Dashboard', icon: 'DashboardOutlined' },
        redirect: '/dashboard/monitor',
        component: RouteView,
        children: [
          {
            path: '/dashboard/workspace',
            name: 'workspace',
            meta: { title: 'Workspace', icon: 'icon-antdesign' },
            component: () => import('@/views/Home.vue'),
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            meta: { title: 'Monitor', icon: 'icon-icon-test' },
            component: () => import('@/views/Home.vue'),
          },
        ],
      },
      {
        path: '/about',
        name: 'about',
        meta: { title: 'Form', icon: 'FormOutlined' },
        redirect: '/form/basic-form',
        component: RouteView,
        children: [
          {
            path: 'basic-form',
            name: 'basic-form',
            meta: { title: 'Basic Form' },
            component: () => import('@/views/About.vue'),
          },
          {
            path: 'description-form/:id(\\d+)?',
            name: 'description-form',
            meta: {
              title: 'Description',
              // attach `params` to `$route.params`
              params: {
                id: 2,
              },
            },
            component: () => import('@/views/About.vue'),
          },
        ],
      },
      {
        path: '/single',
        name: 'single',
        meta: { title: 'Single', icon: 'SettingOutlined' },
        component: () => import('@/views/About.vue'),
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
