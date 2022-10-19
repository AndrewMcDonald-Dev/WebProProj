<script setup lang="ts">
import { useSession } from '../models/session';
const session = useSession();
</script>

<template>
    <div class="buttons" v-if="!session.user">
        <router-link class="button is-light" to="/login">Log in</router-link>
        <router-link class="button is-primary" to="/signup">
            <strong>Sign Up</strong>
        </router-link>
    </div>
    <div class="buttons" v-else>
        <div class="avatar">
            <div class="avatar-image">
                <figure class="image is-64x64">
                    <img
                        :src="session.user.pic"
                        alt="Profile"
                        class="img is-rounded"
                    />
                </figure>
            </div>
            <div class="login-tag">
                <p>
                    {{ session.user.firstName }}
                    <br />
                    {{ session.user.lastName }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.login-tag {
    display: flex;
    flex-direction: column;
    color: white;
}

.avatar {
    display: flex;
    flex-direction: row;
    margin-right: 1em;
}

.img {
    max-height: 5em;
}

.avatar-image {
    margin: 0.4em;
    margin-top: 0em;
    padding-top: 0em;
}
</style>
