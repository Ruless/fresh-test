<template>
    <div class="simple-form">
        <div class="simple-form-header">
            <div class="simple-form-header__item">Step 1</div>
            <div class="simple-form-header__item">Step 2</div>
            <div class="simple-form-header__item">Step 3</div>
            <br>
            <router-link tag="div" class="simple-form-header__item" to="/">Step 1</router-link>
            <router-link tag="div" class="simple-form-header__item" to="/step2">Step 2</router-link>
            <router-link tag="div" class="simple-form-header__item" to="/step3">Step 3</router-link>
        </div>
        <div class="simple-form-body">
            <router-view />
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            id: 0,
            dataSte1: [],
            dataSte2: []
        }
    },
    methods: {
        next() {
            // @step="getStep(id, data)"
            if ( this.id == 1) {
                this.$router.push({ name: 'step2', params: {step1: this.post} })
            }else if ( this.id == 2) {
                this.$router.push({ name: 'step3', params: {step1: this.post} })
            }
        },
        getStep(id, data) {
            if ( id == 1 ) {
                this.dataSte1 = data
            } else if( id == 2 ) {
                this.dataSte2 = data
            }
        }
    }
}
</script>
