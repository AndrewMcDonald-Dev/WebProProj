<script setup lang="ts">
import Posts from '../components/Posts.vue';
import { usePosts } from '../models/post';
import AddWorkoutButton from '../components/AddWorkoutButton.vue';

const { sortPosts, deletePost, posts } = usePosts();
</script>

<template>
    <div class="container">
        <AddWorkoutButton />
        <Posts
            v-for="(post, index) in sortPosts(posts)"
            :key="index"
            :pfp="(post.owner?.pic as string)"
            :activity="post.acitivity"
            :date="post.timeCreated.toDateString()"
            :pic="post.pic"
            :delete-post="deletePost"
            :first-name="(post.owner?.firstName as string)"
            :last-name="(post.owner?.lastName as string)"
            :index="index"
            :handle="(post.owner?.handle as string)"
        />
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 3em;
    margin-top: 1.5em;
}
</style>
