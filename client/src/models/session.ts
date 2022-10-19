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
            pic: string,
            id: number
        ) {
            users.push({
                firstName,
                lastName,
                handle,
                email,
                password,
                pic,
                isAdmin: false,
                id,
            });
        },
    },
});

export const users: User[] = [
    {
        email: 'test@yahoo.com',
        password: 'password',
        pic: 'https://randomuser.me/portraits/men/1.jpg',
        firstName: 'Andrew',
        lastName: 'McDonald',
        handle: 'coolguy10',
        isAdmin: true,
        id: 1,
    },
    {
        firstName: 'Koolaid',
        lastName: 'Guy',
        email: 'ohyeag@email.com',
        handle: 'kool',
        password: 'qwerty',
        pic: 'https://randomuser.me/portraits/men/2.jpg',
        isAdmin: false,
        id: 2,
    },
    {
        firstName: 'Type',
        lastName: 'Script',
        email: 'is@email.com',
        handle: 'awesome',
        password: 'qwerty',
        pic: 'https://randomuser.me/portraits/women/3.jpg',
        isAdmin: false,
        id: 3,
    },
];
