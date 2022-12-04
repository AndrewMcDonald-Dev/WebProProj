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
            path: '/stats',
            name: 'stats',
            component: () => import('../views/StatsView.vue'),
        },
        {
            path: '/friends',
            name: 'friends',
            component: () => import('../views/FriendView.vue'),
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

router.beforeEach(async (to, _from) => {
    const session = useSession();

    //auto login if user has jwt
    if (!session.user) {
        const userToken = localStorage.getItem('user');
        if (userToken) {
            await session.LoginByToken(userToken);
        }
    }

    const protectedUrls = ['/stats', '/friends', '/admin', '/recent'];

    if (protectedUrls.includes(to.path.toLowerCase()))
        if (!session.user) return '/login';
});

export default router;
