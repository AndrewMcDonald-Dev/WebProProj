<script setup lang="ts">
const props = defineProps<{
    pfp: string;
    firstName: string;
    lastName: string;
    handle: string;
    date: string;
    activity: string;
    pic: string;
    deletePost: (index: number) => void;
    index: number;
}>();
</script>

<template>
    <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
                <img :src="pfp" />
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <div>
                    <strong>{{ firstName }} {{ lastName }} </strong>
                    <small class="handle">&#x2022 @{{ handle }}</small>
                    <small class="date">&#x2022 {{ date }}</small>
                    <br />
                    {{ activity }}
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img :src="pic" alt="Placeholder image" />
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
            <button class="delete" @click="deletePost(index)"></button>
        </div>
    </article>
</template>

<style scoped lang="scss">
.media {
    width: 50em;
}
.handle {
    padding-left: 0.3em;
    padding-right: 0.3em;
}
</style>
