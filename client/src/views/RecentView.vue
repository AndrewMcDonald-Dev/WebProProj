<script setup lang="ts">
import Posts from '../components/Posts.vue';
import { usePosts } from '../models/post';
import { useSession } from '../models/session';
import AddWorkoutButton from '../components/AddWorkoutButton.vue';
import { onMounted } from 'vue';

const session = useSession();

const posts = usePosts();
onMounted(async () => {
    await posts.fetchPosts();
});
</script>

<template>
    <div class="container">
        <AddWorkoutButton />
        <Posts
            v-for="(post, index) in posts.grabMyPosts()"
            :key="index"
            :pfp="(post.owner?.pic as string)"
            :activity="post.acitivity"
            :date="new Date(post.timeCreated).toDateString()"
            :pic="post.pic"
            :delete-post="posts.deletePost"
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
    margin-top: 3em;
}
</style>
