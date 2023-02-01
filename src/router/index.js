import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from '../views/HomeView.vue'
import DashboardView from "../views/DashboardView.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "DashboardView",
        component: DashboardView,
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next();
            } else {
                next("/auth/login");
            }
        },
    },
    {
        path: "/roomtype",
        name: "roomtype",
        component: () =>
            import (
                /* webpackChunkName: "teacher" */
                "../views/roomtype/ListRoomType.vue"
            ),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next();
            } else {
                next("/auth/login");
            }
        },
    },
    {
        path: "/home",
        name: "home",
        component: () =>
            import (
                /* webpackChunkName: "teacher" */
                "../views/HomeView.vue"
            ),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next();
            } else {
                next("/auth/login");
            }
        },
    },
    {
        path: "/department",
        name: "department",
        component: () =>
            import (
                /* webpackChunkName: "teacher" */
                "../views/department/ListDepartment.vue"
            ),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next();
            } else {
                next("/auth/login");
            }
        },
    },
    {
        path: "/questiontype",
        name: "questiontype",
        component: () =>
            import (
                /* webpackChunkName: "listquestiontype" */
                "../views/questiontype/ListQuestionType.vue"
            ),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next();
            } else {
                next("/auth/login");
            }
        },
    },
    {
        path: "/room",
        name: "room",
        component: () =>
            import ( /* webpackChunkName: "quiz" */ "../views/room/QuizView.vue"),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next();
            } else {
                next("/auth/login");
            }
        },
    },
    {
        path: "/room/playquiz/:id",
        name: "playquiz",
        component: () =>
            import ( /* webpackChunkName: "playquiz" */ "../views/room/PlayQuiz.vue"),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next();
            } else {
                next("/auth/login");
            }
        },
    },
    {
        path: "/room/in/:id",
        name: "inroom",
        component: () =>
            import ( /* webpackChunkName: "editquiz" */ "../views/room/RoomQuiz.vue"),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next();
            } else {
                next("/auth/login");
            }
        },
    },
    {
        path: "/listteacher",
        name: "listteacher",
        component: () =>
            import (
                /* webpackChunkName: "listteacher" */
                "../views/teacher/ListTeacher.vue"
            ),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next();
            } else {
                next("/auth/login");
            }
        },
    },
    {
        path: "/listusertype",
        name: "listusertype",
        component: () =>
            import (
                /* webpackChunkName: "listusertype" */
                "../views/usertype/ListUserType.vue"
            ),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next();
            } else {
                next("/auth/login");
            }
        },
    },
    {
        path: "/changepassword",
        name: "changepassword",
        component: () =>
            import (
                /* webpackChunkName: "changepassword" */
                "../views/ChangePassword.vue"
            ),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next();
            } else {
                next("/auth/login");
            }
        },
    },
    {
        path: "/editaccount",
        name: "editaccount",
        component: () =>
            import ("../views/EditAccount.vue"),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next();
            } else {
                next("/auth/login");
            }
        },
    },
    {
        path: "/listrecordquiz",
        name: "listrecordquiz",
        component: () =>
            import (
                /* webpackChunkName: "changepassword" */
                "../views/record/ListRecordQuiz.vue"
            ),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next();
            } else {
                next("/auth/login");
            }
        },
    },
    {
        path: "/viewrecord",
        name: "viewrecord",
        component: () =>
            import (
                /* webpackChunkName: "viewrecord" */
                "../views/record/RecordPlayQuiz.vue"
            ),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next();
            } else {
                next("/auth/login");
            }
        },
    },
    {
        path: "/auth/login",
        name: "login",
        component: () =>
            import (
                /* webpackChunkName: "viewrecord" */
                "../views/auth/Login.vue"
            ),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next("/");
            } else {
                next();
            }
        },
    },
    {
        path: "/auth/forget-password",
        name: "forgetpass",
        component: () =>
            import (
                /* webpackChunkName: "viewrecord" */
                "../views/auth/ForgetPassword.vue"
            ),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next("/");
            } else {
                next();
            }
        },
    },
    {
        path: "/auth/reset-password",
        name: "resetpass",
        component: () =>
            import (
                /* webpackChunkName: "viewrecord" */
                "../views/auth/ResetPassword.vue"
            ),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next("/");
            } else {
                next();
            }
        },
    },
    {
        path: "/room/enter",
        name: "enter_room",
        component: () =>
            import (
                /* webpackChunkName: "viewrecord" */
                "../views/user/EnterRoom.vue"
            ),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next("/");
            } else {
                next();
            }
        },
    },
    {
        path: "/user/room/in/:id",
        name: "in_room",
        component: () =>
            import (
                /* webpackChunkName: "viewrecord" */
                "../views/user/InRoom.vue"
            ),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next("/");
            } else {
                next();
            }
        },
    },
    {
        path: "/user/room/in/quiz/true-false",
        name: "in_qcm",
        component: () =>
            import (
                /* webpackChunkName: "viewrecord" */
                "../views/user/QuizTrueFalse.vue"
            ),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next("/");
            } else {
                next();
            }
        },
    },
    {
        path: "/user/room/in/quiz/score-board",
        name: "in_leaderboard",
        component: () =>
            import (
                /* webpackChunkName: "viewrecord" */
                "../views/user/UserScoreBoard.vue"
            ),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next("/");
            } else {
                next();
            }
        },
    },
    {
        path: "/user/room/in/play/:id",
        name: "in_exam",
        component: () =>
            import (
                /* webpackChunkName: "viewrecord" */
                "../views/user/ExamQuiz.vue"
            ),
        beforeEnter: (to, from, next) => {
            if (isLoggedIn()) {
                next("/");
            } else {
                next();
            }
        },
    },
];

const isLoggedIn = () => {
    const token = sessionStorage.getItem("token");

    if (token) {
        return true;
    } else {
        return false;
    }
};

const router = new VueRouter({
    mode: "mode",
    routes,
});

export default router;