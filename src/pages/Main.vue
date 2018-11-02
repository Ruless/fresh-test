<template>
    <div class="simple-form">
        <div class="simple-form-header">
            <div class="simple-form-header__item" :class="[ idCurrent == 1 ? 'active' : '', idCurrent != 1 ? 'disable' : '']">Step 1</div>
            <div class="simple-form-header__item" :class="[ idCurrent == 2 ? 'active' : '', idCurrent != 2 ? 'disable' : '']">Step 2</div>
            <div class="simple-form-header__item" :class="[ idCurrent == 3 ? 'active' : '', idCurrent != 3 ? 'disable' : '']">Step 3</div>
        </div>
        <div class="simple-form-body">
            <router-view @step="getStep"/>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            idCurrent: 1,
            idPrev: 0,
        }
    },
    methods: {
        getStep(id) {
            this.idCurrent = id
        }
    }
}
</script>
