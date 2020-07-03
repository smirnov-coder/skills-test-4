<template>
    <div id="app">
        <nav-bar />
        <div class="main-content">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import NavBar from '@/components/Navbar';

    export default Vue.extend({
        components: {
            NavBar,
        },
    });
</script>

<style lang="scss">
    .main-content {
        padding: 20px;
    }
</style>
