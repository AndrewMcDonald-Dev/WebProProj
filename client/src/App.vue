<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavVue from './components/Nav.vue';
import FooterVue from './components/Footer.vue';
</script>

<template>
    <div class="wrap">
        <header>
            <NavVue />
        </header>

        <div class="take-up-space">
            <RouterView />
        </div>

        <FooterVue />
    </div>
</template>

<style scoped lang="scss">
.take-up-space {
    flex: 1 0 auto;
}
.wrap {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
</style>
