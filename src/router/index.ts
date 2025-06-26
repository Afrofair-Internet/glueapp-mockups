import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'

import LandingPage from '@/pages/core/LandingPage.vue'
import Login from '@/pages/auth/Login.vue'
import ResetPassword from '@/pages/auth/ResetPassword.vue'
import EntryForm from '@/pages/application/EntryForm.vue'
import Home from '@/pages/core/Home.vue'
import HrList from '@/pages/hr/HrList.vue'
import HrApproval from '@/pages/hr/HrApproval.vue'
import DeptList from '@/pages/dept/DeptList.vue'
import DeptApproval from '@/pages/dept/DeptApproval.vue'
import ReconcileHistory from '@/pages/sync/ReconcileHistory.vue'
import SyncHistory from '@/pages/sync/SyncHistory.vue'
import ReconcileDiff from '@/pages/sync/ReconcileDiff.vue'
import CodeTypeList from '@/pages/master/CodeTypeList.vue'
import CodeList from '@/pages/master/CodeList.vue'
import AttendanceList from '@/pages/attendance/AttendanceList.vue'
import ExpenseList from '@/pages/expense/ExpenseList.vue'
import ChangePassword from '@/pages/auth/ChangePassword.vue'
import UserList from '@/pages/user/UserList.vue'
import MappingList from '@/pages/master/MappingList.vue'

// 下記にページを順次追加
const routes: RouteRecordRaw[] = [
  {
    path: '/',
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
    path: '/resetpassword',
    component: EmptyLayout,
    children: [
      { path: '', name: 'ResetPassword', component: ResetPassword }
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
    path: '/changepassword',
    component: EmptyLayout,
    children: [
      { path: '', name: 'ChangePassword', component: ChangePassword }
    ]
  },
  {
    path: '/home',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: Home }
    ]
  },
  {
    path: '/userlist',
    component: DefaultLayout,
    children: [
      { path: '', name: 'UserList', component: UserList }
    ]
  },
  {
    path: '/hr',
    component: DefaultLayout,
    children: [
      { path: 'list', name: 'HrList', component: HrList },
      { path: 'approval', name: 'HrApproval', component: HrApproval }
    ]
  },
  {
    path: '/dept',
    component: DefaultLayout,
    children: [
      { path: 'list', name: 'DeptList', component: DeptList },
      { path: 'approval', name: 'DeptApproval', component: DeptApproval }
    ]
  },
  {
    path: '/sync',
    component: DefaultLayout,
    children: [
      { path: 'reconcile-history', name: 'ReconcileHistory', component: ReconcileHistory },
      { path: 'sync-history', name: 'SyncHistory', component: SyncHistory },
      { path: 'diff/:serviceId', name: 'ReconcileDiff', component: ReconcileDiff }
    ]
  },
  {
    path: '/codetypelist',
    component: DefaultLayout,
    children: [
      { path: '', name: 'CodeTypeList', component: CodeTypeList }
    ]
  },
  {
    path: '/codelist',
    component: DefaultLayout,
    children: [
      { path: '', name: 'CodeList', component: CodeList }
    ]
  },
  {
    path: '/mappinglist',
    component: DefaultLayout,
    children: [
      { path: '', name: 'MappingList', component: MappingList }
    ]
  },
  {
    path: '/attendancelist',
    component: DefaultLayout,
    children: [
      { path: '', name: 'AttendanceList', component: AttendanceList }
    ]
  },
  {
    path: '/expenselist',
    component: DefaultLayout,
    children: [
      { path: '', name: 'ExpenseList', component: ExpenseList }
    ]
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
