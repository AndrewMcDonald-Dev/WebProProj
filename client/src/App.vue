<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavVue from './components/Nav.vue';
import FooterVue from './components/Footer.vue';
</script>

<template>
    <header>
        <NavVue />
    </header>

    <div class="container take-up-space">
        <RouterView />
    </div>

    <footer>
        <FooterVue />
    </footer>
</template>
