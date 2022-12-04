<script setup lang="ts">
import { usePosts } from '@/models/post';
import { useSession } from '@/models/session';
import { ref } from 'vue';

const posts = usePosts();

const isActive = ref(false);
const activity = ref('');
const pic = ref('');
const date = ref('');

const convertDate = (date: string) => {
    const temp = date.split('-');
    return new Date(Number(temp[0]), Number(temp[1]), Number(temp[2]));
};
</script>

<template>
    <div class="wrap">
        <button
            class="button is-primary is-full-width"
            data-toggle="modal"
            data-target="#workoutModal"
            @click="isActive = !isActive"
        >
            Add Workout
        </button>
        <div class="modal" id="workoutModal" :class="{ 'is-active': isActive }">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="field">
                    <label class="label">Activity</label>
                    <div class="control">
                        <input
                            class="input"
                            type="text"
                            placeholder="What activity did you do?"
                            v-model="activity"
                        />
                    </div>
                </div>
                <div class="field">
                    <label class="label">Picture</label>
                    <div class="control">
                        <input
                            class="input"
                            type="text"
                            placeholder="Can you send a picture?"
                            v-model="pic"
                        />
                    </div>
                </div>
                <div class="field">
                    <label class="label">Date</label>
                    <div class="control">
                        <input class="input" type="date" v-model="date" />
                    </div>
                </div>
                <div class="field is-grouped">
                    <div class="control">
                        <button
                            class="button is-link"
                            @click="
                                posts.addPost(activity, pic, convertDate(date))
                            "
                        >
                            Submit
                        </button>
                    </div>
                    <div class="control">
                        <button
                            class="button is-link is-light"
                            @click="isActive = !isActive"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            <button
                class="modal-close is-large"
                @click="isActive = !isActive"
                aria-label="close"
            ></button>
        </div>
        <hr />
    </div>
</template>

<style scoped lang="scss">
.modal-content {
    background-color: white;
    padding: 2em;
    border-radius: 10px;
}
.is-full-width {
    width: 50em;
}
</style>
