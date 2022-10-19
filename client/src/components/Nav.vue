<script setup lang="ts">
import { ref } from 'vue';
import LoginBadge from './LoginBadge.vue';
import { useSession } from '../models/session';
const session = useSession();

let isActive = ref(false);
</script>

<template>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <img
                    src="https://bulma.io/images/bulma-logo.png"
                    width="112"
                    height="28"
                />
            </a>

            <a
                role="button"
                :class="{ 'is-active': isActive }"
                @click="isActive = !isActive"
                clase="navbar-burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-menu" :class="{ 'is-active': isActive }">
            <div class="navbar-start">
                <router-link class="navbar-item" to="/"> Home </router-link>

                <router-link class="navbar-item" to="/friends">
                    Friends
                </router-link>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link"> More </a>

                    <div class="navbar-dropdown">
                        <router-link class="navbar-item" to="/edit">
                            Edit
                        </router-link>
                        <router-link class="navbar-item" to="/stats">
                            Statistics
                        </router-link>
                        <router-link
                            class="navbar-item"
                            to="/admin"
                            v-if="session.user?.isAdmin"
                        >
                            Admin
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="navbar-end">
                <div class="navbar-item no-padding">
                    <div class="buttons">
                        <LoginBadge />
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped lang="scss">
.no-padding {
    padding-top: 0.5em;
    padding-bottom: 1em;
}
</style>
