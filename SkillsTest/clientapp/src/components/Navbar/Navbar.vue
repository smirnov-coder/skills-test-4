<template>
    <nav class="navbar navbar-dark bg-primary justify-content-center">
        <ul class="navbar-nav nav">
            <li class="nav-item">
                <router-link to="/" exact class="nav-link" activeClass="active">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/search" class="nav-link" activeClass="active">Search</router-link>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" src="./Navbar.scss"></style>