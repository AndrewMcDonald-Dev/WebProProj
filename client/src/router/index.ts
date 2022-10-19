import { createRouter, createWebHistory } from 'vue-router';
import { useSession } from '../models/session';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RecentView from '../views/RecentView.vue';
import SignUpView from '../views/SignUpView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/edit',
            name: 'edit',
            component: () => import('../views/EditWorkoutsView.vue'),
        },
        {
            path: '/stats',
            name: 'stats',
            component: () => import('../views/StatsView.vue'),
        },
        {
            path: '/friends',
            name: 'friends',
            component: () => import('../views/FriendWorkoutsView.vue'),
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('../views/AdminView.vue'),
        },
        {
            path: '/signup',
            name: 'signun',
            component: SignUpView,
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/recent',
            name: 'recent',
            component: RecentView,
        },
    ],
    linkActiveClass: 'is-active',
});

router.beforeEach((to, _from) => {
    const session = useSession();

    const protectedUrls = ['/edit', '/stats', '/friends', '/admin', '/about'];

    if (protectedUrls.includes(to.path.toLowerCase()))
        if (!session.user) return '/login';
});

export default router;
