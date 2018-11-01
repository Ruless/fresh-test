<template>
    <div class="simple-form">
        <div class="simple-form-header">
            <router-link tag="div" class="simple-form-header__item" to="/">Step 1</router-link>
            <router-link tag="div" class="simple-form-header__item" to="/step2">Step 2</router-link>
            <router-link tag="div" class="simple-form-header__item" to="/step3">Step 3</router-link>
        </div>
        <div class="simple-form-body">
            <router-view />
        </div>
    </div>
</template>
