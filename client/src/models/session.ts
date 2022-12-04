import { defineStore } from 'pinia';
import router from '../router/index';
import { api } from './myFetch';
import type { User } from './user';

export const useSession = defineStore('session', {
    state: () => ({
        user: null as User | null,
        destinationUrl: null as string | null,
    }),
    actions: {
        async Login(email: string, password: string) {
            try {
                const user = await this.api('users/login', { email, password });
                if (user) {
                    this.user = user;
                    router.push(this.destinationUrl ?? '/wall');
                    localStorage.setItem('user', user.token);
                }
            } catch (error: any) {
                console.table(error);
            }
        },

        Logout() {
            this.user = null;
            router.push('/login');
            localStorage.removeItem('user');
        },

        async Register(
            firstName: string,
            lastName: string,
            handle: string,
            email: string,
            password: string,
            pic: string
        ) {
            const user = {
                firstName,
                lastName,
                handle,
                email,
                password,
                pic,
                isAdmin: false,
            };
            try {
                const newUser = await this.api('users', user, 'POST');
                if (newUser) {
                    this.user = newUser;
                    router.push(this.destinationUrl ?? '/wall');
                    localStorage.setItem('user', newUser.token);
                }
            } catch (error: any) {
                console.table(error);
            }
        },
        async LoginByToken(token: string) {
            try {
                const user = await this.api(`users/login/${token}`);

                if (user) {
                    this.user = user;
                    router.push(this.destinationUrl ?? '/friends');
                }
            } catch (error: any) {
                console.log(error);
            }
        },
        async api(
            url: string,
            body?: any,
            method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
            headers: any = {}
        ) {
            if (this.user?.token)
                headers.Authorization = `Bearer ${this.user.token}`;

            try {
                const response = await api(url, body, method, headers);

                if (response.errors?.length)
                    throw { message: response.errors.join('') };

                if (response.error) throw { message: response.error };

                return await response.data;
            } catch (error: any) {
                console.log(error.message);
            }
        },
    },
});
