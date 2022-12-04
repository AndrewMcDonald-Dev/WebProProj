import { defineStore } from 'pinia';
import { users, useSession } from './session';
import type { User } from './user';

export const usePosts = defineStore('post', {
    state: () => ({
        posts: posts as Post[],
        session: useSession(),
    }),
    actions: {
        addPost(owner: number, acitivity: string, pic: string, date: Date) {
            this.posts.push({
                owner,
                acitivity,
                pic,
                date,
            });
        },
        deletePost(index: number) {
            this.posts.splice(index, 1);
        },
        loadPosts() {
            this.posts = posts;
        },
        grabUser(owner: number): User | null {
            const foundUser = users.find(({ id }) => id === owner);
            if (foundUser) return foundUser;
            return null;
        },
        grabMyPosts(owner: number) {
            const temp = this.posts;
            return temp.filter((post: any) => owner === post.owner);
        },
        sortPosts(ps: Post[]) {
            return ps.sort(
                (postA, postB) => postB.date.getTime() - postA.date.getTime()
            );
        },
    },
});

export interface Post {
    owner: number;
    acitivity: string;
    pic: string;
    date: Date;
}
