import { defineStore } from 'pinia';
import { api } from './myFetch';
import { useSession } from './session';
import type { User } from './user';

export const usePosts = defineStore('post', {
    state: () => ({
        posts: [] as Post[],
        session: useSession(),
    }),
    actions: {
        async addPost(acitivity: string, pic: string, date: Date) {
            if (!this.session.user)
                console.error('Current user not stored in addPost().');

            const newPost = {
                owner: this.session.user as User,
                acitivity,
                pic,
                timeCreated: date,
            };

            const post = (await this.session.api('posts', newPost, 'POST'))
                .data as Post;

            await this.fetchPosts();
        },
        async fetchPosts() {
            this.posts = (await api('post')).data as Post[];
        },
        async deletePost(index: number) {
            await api(`posts/${this.posts[index]._id}`, null, 'DELETE');
            this.posts.splice(index, 1);
        },
        grabMyPosts() {
            const temp = this.posts;
            if (!this.session.user)
                throw { message: 'No session.user detected for grabMyPosts' };
            return this.sortPosts(
                temp.filter(
                    (post: any) => this.session.user?._id === post.owner._id
                )
            );
        },
        sortPosts(posts: Post[]) {
            return this.posts.sort(
                (postA, postB) =>
                    postB.timeCreated.getTime() - postA.timeCreated.getTime()
            );
        },
    },
});

export interface Post {
    owner: User;
    acitivity: string;
    pic: string;
    timeCreated: Date;
    _id: string;
}
