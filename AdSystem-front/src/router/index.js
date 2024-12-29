import {createRouter, createWebHistory} from "vue-router";
import BackstageLayout from "../layout/AdministratorLayout.vue";
import ReceptionLayout from "../layout/WebsiteOperatorLayout.vue";
import CustomerLayout from "@/layout/AdvertiserLayout.vue";

// Import all your view components here (as you had them before)


import CustomerUserInfo from "@/views/Advertiser/CustomerUserInfo.vue";

import SystemLog from "@/views/Administrator/SystemLog.vue";
import AdministratorRegister from "@/views/Register/AdministratorRegister.vue";
import AdvertiserRegister from "@/views/Register/AdvertiserRegister.vue";
import websiteOperatorRegister from "@/views/Register/websiteOperatorRegister.vue";
import Login from "@/views/Login.vue";
import AdministratorLayout from "@/layout/AdministratorLayout.vue";
import DashBoard from "@/views/Administrator/DashBoard.vue";
import UserManagement from "@/views/Administrator/UserManagement.vue";
import AdManagement from "@/views/Administrator/AdManagement.vue";
import Administrators from "@/views/Administrator/Administrators.vue";
import Advertisers from "@/views/Administrator/Advertisers.vue";
import WebsiteOperators from "@/views/Administrator/WebsiteOperators.vue";
import AdminUserInfo from "@/views/Administrator/AdminUserInfo.vue";
import AdvertiserLayout from "@/layout/AdvertiserLayout.vue";
import AdDelivery from "@/views/Advertiser/AdDelivery.vue";

// 定义路由规则
const routes = [
    // 默认重定向
    {
        path: "/",
        redirect: "/login", // 默认跳转到登录
    },

    // 带导航栏和侧边栏的页面
    {
        path: "/admin",
        component:AdministratorLayout, // 带导航栏和侧边栏的布局
        meta: {requiresAuth: true},// meta requiresAuth字段表示该路由需要登录,但是现在导航守卫用的是排除方法
        children: [
            {path: "dash-board", name: "DashBoard", component: DashBoard},
            {path: "ad-management", name: "AdManagement", component: AdManagement},
            {path: "user-management", name: "UserManagement", component: UserManagement},
            {path: "administrator-management", name: "Administrators", component: Administrators},
            {path: "advertisers-management", name: "Advertisers", component: Advertisers},
            {path: "website-operator-management", name: "WebsiteOperators", component: WebsiteOperators},
            {path: "admin-user-info", name: "AdminUserInfo", component: AdminUserInfo},
            {path: "system-log", name: SystemLog, component: SystemLog}
        ],
    },
    {
        path: "/advertiser",
        component: AdvertiserLayout, // 带导航栏和侧边栏的布局
        meta: {requiresAuth: true},// meta requiresAuth字段表示该路由需要登录,但是现在导航守卫用的是排除方法
        children: [
            {path: "ad-delivery", name: "AdDelivery", component: AdDelivery},

        ],
    },
    {
        path: "/customer",
        component: CustomerLayout,
        meta: {requiresAuth: true},// meta requiresAuth字段表示该路由需要登录,但是现在导航守卫用的是排除方法
        children: [
            // {path: "order-dishes", name: "OrderDishes", component: OrderDishes},
            // {path: "customer-user", name: "CustomerUserInfo", component: CustomerUserInfo},
        ],
    },
    // 不需要导航栏和侧边栏的页面
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/administrator-register",
        name: AdministratorRegister,
        component: AdministratorRegister,
    },
    {
        path: "/advertiser-register",
        name: AdvertiserRegister,
        component: AdvertiserRegister,
    },
    {
        path: "/websiteOperator-register",
        name: websiteOperatorRegister,
        component: websiteOperatorRegister,
    },


    // // 404 页面
    // {
    //   path: "/:catchAll(.*)", // 捕获所有未定义的路径
    //   name: "NotFound",
    //   component: () => import("@/views/NotFound.vue"), // 需要创建 NotFound.vue 页面
    // },
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 导航守卫
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/administrator-register', '/advertiser-register', '/websiteOperator-register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('jwt');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
});

export default router;

