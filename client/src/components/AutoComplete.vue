
<script setup lang="ts">import { ref } from 'vue';
import type { User } from '../models/user';

const props = defineProps<{
    list: User[];
    updateQuery: (newQuery: String) => void;
}>();

let newQuery = ref("")

</script>

<template>
    <div class="field">
        Enter User:
        <div class="control">
            <div class="dropdown" :class="{ 'is-active': list.length > 0 }">
                <div class="dropdown-trigger">
                    <input type="text" class="input" name="User" v-model="newQuery"
                        @input="updateQuery(newQuery)" placeholder="Enter Desired User's Name" />
                </div>
                <div class="dropdown-menu" v-if="list.length > 0">
                    <div class="dropdown-content">
                        <a v-for="(user, index) in list" class="dropdown-item" href="#" :key="index"
                            @click="newQuery = user.handle">
                            {{ `${user.firstName} ${user.lastName}` }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.field {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 3em;
}
.control {
    margin-left: 1em;
}
</style>
