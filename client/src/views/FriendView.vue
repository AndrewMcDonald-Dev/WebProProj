<script setup lang="ts">
import Posts from '../components/Posts.vue';
import { usePosts } from '../models/post';

const { posts, sortPosts, grabUser, deletePost } = usePosts();
</script>

<template>
    <div class="container">
        <Posts
            v-for="(post, index) in sortPosts(posts)"
            :key="index"
            :pfp="(grabUser(post.owner)?.pic as string)"
            :activity="post.acitivity"
            :date="post.date.toDateString()"
            :pic="post.pic"
            :delete-post="deletePost"
            :first-name="(grabUser(post.owner)?.firstName as string)"
            :last-name="(grabUser(post.owner)?.lastName as string)"
            :index="index"
            :handle="(grabUser(post.owner)?.handle as string)"
        />
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 3em;
    margin-top: 3em;
}
</style>
