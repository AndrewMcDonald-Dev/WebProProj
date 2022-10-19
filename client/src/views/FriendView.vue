<script setup lang="ts">
import { usePosts } from '../models/post';

const posts = usePosts();
</script>

<template>
    <div class="container">
        <article
            class="media"
            v-for="(post, index) in posts.posts"
            :key="index"
        >
            <figure class="media-left">
                <p class="image is-64x64">
                    <img :src="posts.grabUser(post.owner)?.pic" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <div>
                        <strong
                            >{{ posts.grabUser(post.owner)?.firstName }}
                            {{ posts.grabUser(post.owner)?.lastName }}</strong
                        >
                        <small>@{{ posts.grabUser(post.owner)?.handle }}</small>
                        <small>{{ post.date.toDateString() }}</small>
                        <br />
                        {{ post.acitivity }}
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img :src="post.pic" alt="Placeholder image" />
                            </figure>
                        </div>
                    </div>
                </div>
                <nav class="level is-mobile">
                    <div class="level-left">
                        <a class="level-item">
                            <span class="icon is-small"
                                ><i class="fas fa-reply"></i
                            ></span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small"
                                ><i class="fas fa-retweet"></i
                            ></span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small"
                                ><i class="fas fa-heart"></i
                            ></span>
                        </a>
                    </div>
                </nav>
            </div>
            <div class="media-right">
                <button
                    class="delete"
                    @click="posts.deletePost(index)"
                ></button>
            </div>
        </article>
    </div>
</template>

<style scoped lang="scss">
.media {
    width: 50em;
}
.container {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 3em;
    margin-top: 3em;
}
</style>
