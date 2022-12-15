
<script setup lang="ts">
import { useComplete } from '../models/autcomplete'
const autoComplete = useComplete()

</script>

<template>
    <div class="field">
        Enter User:
        <div class="control">
            <div class="dropdown" :class="{ 'is-active': autoComplete.list.length > 0 }">
                <div class="dropdown-trigger">
                    <input type="text" class="input" name="User" v-model="autoComplete.query"
                        @input="autoComplete.updateQuery()" placeholder="Enter Desired User's Name" />
                </div>
                <div class="dropdown-menu" v-if="autoComplete.list.length > 0">
                    <div class="dropdown-content">
                        <a v-for="(user, index) in autoComplete.list" class="dropdown-item" href="#" :key="index"
                            @click="autoComplete.query = user.handle">
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
