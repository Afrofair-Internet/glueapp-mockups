import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'

import LandingPage from '@/pages/LandingPage.vue'
import Login from '@/pages/Login.vue'
import EntryForm from '@/pages/EntryForm.vue'
import EntryConfirmation from '@/pages/EntryConfirmation.vue'
import EntryCompletion from '@/pages/EntryCompletion.vue'
import Home from '@/pages/Home.vue'

// 下記にページを順次追加
const routes: RouteRecordRaw[] = [
   {
    path: '/landingpage',
    component: EmptyLayout,
    children: [
      { path: '', name: 'LandingPage', component: LandingPage }
    ]
  },
  {
    path: '/login',
    component: EmptyLayout,
    children: [
      { path: '', name: 'Login', component: Login }
    ]
  },
  {
    path: '/entryform',
    component: EmptyLayout,
    children: [
      { path: '', name: 'EntryForm', component: EntryForm }
    ]
  },
  {
    path: '/entryconfirmation',
    component: EmptyLayout,
    children: [
      { path: '', name: 'EntryConfilmation', component: EntryConfirmation }
    ]
  },
  {
    path: '/entrycompletion',
    component: EmptyLayout,
    children: [
      { path: '', name: 'EntryCompletion', component: EntryCompletion }
    ]
  },
  {
    path: '/home',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: Home }
    ]
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
