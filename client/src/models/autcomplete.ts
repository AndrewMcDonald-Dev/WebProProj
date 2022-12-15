import { defineStore } from 'pinia';
import { useSession } from './session';
import type { User } from './user';

export const useComplete = defineStore('autocomplete', {
    state: () => ({
        list: [] as User[],
        session: useSession(),
        query: new String(),
    }),
    actions: {
        async updateQuery() {
            if (this.query.length > 0) {
                const foundUsers = await this.session.api(
                    `users/search/${this.query}`
                );
                this.list = foundUsers;
            }
        },
    },
});
