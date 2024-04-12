
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", redirect: "/login" }, 
      { path: "/login", component: () => import("pages/LoginForm.vue") }, 
      { path: "/register", component: () => import("pages/RegisterPage.vue") }, 
      {
        path: "/dashboard",
        component: () => import("pages/DashboardPage.vue"),
        meta: { requiresAuth: true },
      }, 
      {
        path: "/todo-list",
        component: () => import("pages/TodoList.vue"),
        meta: { requiresAuth: true },
      }, 
    ],
  },

 
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
