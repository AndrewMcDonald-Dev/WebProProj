import { defineStore } from 'pinia';
import router from '../router/index';
import type { User } from './user';

export const useSession = defineStore('session', {
    state: () => ({
        user: null as User | null,
    }),
    actions: {
        Login(email: string, password: string) {
            const foundUser = users.find(
                (user) => user.email.toLowerCase() === email.toLowerCase()
            );
            if (!foundUser) {
                console.error('failed to find user');
                return;
            }
            if (foundUser.password === password) {
                this.user = foundUser;
                router.push('/friends');
            }
        },

        Logout() {
            this.user = null;
            router.push('/login');
        },

        Register(
            firstName: string,
            lastName: string,
            handle: string,
            email: string,
            password: string,
            pic: string
        ) {
            users.push({
                firstName,
                lastName,
                handle,
                email,
                password,
                pic,
            });
        },
    },
});

const users: User[] = [
    {
        email: 'test@yahoo.com',
        password: 'password',
        pic: 'https://randomuser.me/portraits/men/1.jpg',
        firstName: 'Andrew',
        lastName: 'McDonald',
        handle: 'coolguy10',
    },
];
