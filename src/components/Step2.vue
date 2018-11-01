<template>
    <div> 
        <div class="form-grp">
            <label>ИНН</label>
            <input type="text" v-model="idTetxt" >
        </div>
        <div class="form-grp">
            <label>Фамилия</label>
            <input type="text" v-model="surname" >
        </div>
        <div class="form-grp">
            <label>Имя</label>
            <input type="text" v-model="name" >
        </div>
        <div class="form-grp">
            <label>Город</label>
            <input type="text" v-model="city" @keydown="autocomplite">
        </div>
        {{ file }}
        <div class="btn" @click="nextStep"> Далее </div>
    </div>
</template>

<script>
import axios from 'axios'
// let file = require('@/assets/koatuu.xml');

export default {
    data() {
        return {
            idTetxt: '',
            surname: '',
            name: '',
            city: '',
            file: file
        }
    },
    methods: {
        validation() {

            if ( this.idTetxt == '' || this.surname == '' || this.name == '') {
                
                this.$notify({
                    type: 'error',
                    text: "Поля не должны быть пустыми!",
                    duration: 3000
                });
				return false
            } else if ( this.idTetxt.length != 10 ) {
                this.$notify({
                    type: 'error',
                    text: "Длинна поля ИНН должна быть 10 символов!",
                    duration: 3000
                });
				return false
            } else if ( !Number(this.idTetxt) ) {
                this.$notify({
                    type: 'error',
                    text: "Поле ИНН должны содержать только числа!",
                    duration: 3000
                });
				return false
            }
        },
        autocomplite() {

        },
        nextStep() {
            this.validation()
        }
    },
    created() {
        axios.get('https://api.hh.ru/areas/5').then( (response) => {
            console.log(response.data.areas)
        })
    }
}
</script>