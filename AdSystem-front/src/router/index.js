import {createRouter, createWebHistory} from "vue-router";
import BackstageLayout from "../layout/BackstageLayout.vue";
import ReceptionLayout from "../layout/ReceptionLayout.vue";
import CustomerLayout from "@/layout/CustomerLayout.vue";

// Import all your view components here (as you had them before)
import TableManagement from "../views/Backstage/TableManagement.vue";
import DishManagement from "../views/Backstage/DishManagement.vue";
import InternalStaff from "../views/Backstage/InternalStaff.vue";
import Customers from "../views/Backstage/Customers.vue";
import ReportDaily from "../views/Backstage/ReportDaily.vue";
import ReportMonthly from "../views/Backstage/ReportMonthly.vue";
import ReportYearly from "../views/Backstage/ReportYearly.vue";
import ManagerUserInfo from "../views/Backstage/ManagerUserInfo.vue";
import InternalStaffLogin from "../views/Login.vue";
import TableStatus from "../views/Reception/TableStatus.vue";
import DishStatus from "../views/Reception/DishStatus.vue";
import OrderStatus from "../views/Reception/OrderStatus.vue";
import WaiterUserInfo from "../views/Reception/WaiterUserInfo.vue";

import Selection from "@/views/Customer/Selection.vue";
import OrderDishes from "@/views/Customer/OrderDishes.vue";
import CustomerUserInfo from "@/views/Customer/CustomerUserInfo.vue";

import DishCategory from "@/views/Backstage/DishCategory.vue";
import SystemLog from "@/views/Backstage/SystemLog.vue";
import AdministratorRegister from "@/views/Register/AdministratorRegister.vue";
import AdvertiserRegister from "@/views/Register/AdvertiserRegister.vue";
import websiteOperatorRegister from "@/views/Register/websiteOperatorRegister.vue";
import Login from "@/views/Login.vue";

// 定义路由规则
const routes = [
    // 默认重定向
    {
        path: "/",
        redirect: "/internalStaff-login", // 默认跳转到登录
    },

    // 带导航栏和侧边栏的页面
    {
        path: "/backstage",
        component: BackstageLayout, // 带导航栏和侧边栏的布局
        meta: {requiresAuth: true},// meta requiresAuth字段表示该路由需要登录,但是现在导航守卫用的是排除方法
        children: [
            {path: "table-management", name: "TableManagement", component: TableManagement},
            {path: "dish-management", name: "DishManagement", component: DishManagement},
            {path: "user-management-internalStaff", name: "InternalStaff", component: InternalStaff},
            {path: "user-management-customers", name: "Customers", component: Customers},
            {path: "report-generation-daily", name: "ReportDaily", component: ReportDaily},
            {path: "report-generation-monthly", name: "ReportMonthly", component: ReportMonthly},
            {path: "report-generation-yearly", name: "ReportYearly", component: ReportYearly},
            {path: "manager-user", name: "ManagerUserInfo", component: ManagerUserInfo},
            // { path: "customer-detail", name: "CustomerDetail", component: CustomerDetail },
            {path: "dish-category", name: DishCategory, component: DishCategory},
            {path: "systemlog", name: SystemLog, component: SystemLog}
        ],
    },
    {
        path: "/reception",
        component: ReceptionLayout, // 带导航栏和侧边栏的布局
        meta: {requiresAuth: true},// meta requiresAuth字段表示该路由需要登录,但是现在导航守卫用的是排除方法
        children: [
            {path: "table-status", name: "TableStatus", component: TableStatus},
            {path: "dish-status", name: "DishStatus", component: DishStatus},
            {path: "order-status", name: "OrderStatus", component: OrderStatus},
            {path: "waiter-user", name: "WaiterUserInfo", component: WaiterUserInfo},
        ],
    },
    {
        path: "/customer",
        component: CustomerLayout,
        meta: {requiresAuth: true},// meta requiresAuth字段表示该路由需要登录,但是现在导航守卫用的是排除方法
        children: [
            {path: "order-dishes", name: "OrderDishes", component: OrderDishes},
            {path: "customer-user", name: "CustomerUserInfo", component: CustomerUserInfo},
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
    const publicPages = ['/internalStaff-login', '/customer-login', '/internalStaff-register', '/customer-register', '/customer-selection', '/customer-reservation'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('jwt');

    if (authRequired && !loggedIn) {
        return next('/customer-login');
    }

    next();
});

export default router;

