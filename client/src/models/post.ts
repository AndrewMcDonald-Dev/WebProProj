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

const posts: Post[] = [
    {
        owner: 1,
        acitivity: 'Biked through campus',
        pic: 'https://sustainability.unl.edu/21752562_1520383038022637_6453367371362554071_o.jpg',
        date: new Date(1665209841039),
    },
    {
        owner: 1,
        acitivity: 'Swam through the gunk',
        pic: 'https://upload.wikimedia.org/wikipedia/commons/5/55/The_Gunk_at_SUNY_New_Paltz.JPG',
        date: new Date(1656229741039),
    },
    {
        owner: 3,
        acitivity: 'Ran through campus',
        pic: 'https://penntoday.upenn.edu/sites/default/files/2019-02/P-100603-Master-V1-010X_0.jpg',
        date: new Date(1664199641039),
    },
    {
        owner: 2,
        acitivity: 'Walked through campus',
        pic: 'https://images.onwardstate.com/uploads/2014/09/DSC_0059.jpg',
        date: new Date(1663189541039),
    },
];

export interface Post {
    owner: number;
    acitivity: string;
    pic: string;
    date: Date;
}
