<template>
    <div> 
        <div class="form-grp">
            <label>Сумма</label>
            <input type="text" v-model="suma" >
        </div>
        <div class="form-grp">
            <label>Срок</label>
            <input type="text" v-model="term" >
        </div>
        
        <div class="btn" @click="nextStep"> Далее </div>
    </div>
</template>

<script>


export default {
    data() {
        return {
            suma: '',
            term: ''
        }
    },
    methods: {
        validation() {

            if ( this.suma == '' || this.term == '') {
                
                                this.$notify({
                    type: 'error',
                    text: "Поля не должны быть пустыми!",
                    duration: 3000
                });
				return false
            } else if ( !Number(this.suma) || !Number(this.term) ) {

                
                this.$notify({
                    type: 'error',
                    text: "Поля должны содержать только числа!",
                    duration: 3000
                });
				return false
            } else if ( this.suma.indexOf(".") > 0 ) {
                
                this.$notify({
                    type: 'error',
                    text: "Поле сумма должно содержать целочисельное значение!",
                    duration: 3000
                });
				return false
				
            } else if ( this.term.indexOf(".") > 0 ) {

                this.$notify({
                    type: 'error',
                    text: "Поле сроки должно содержать целочисельное значение!",
                    duration: 3000
                });
				return false
            } else if ( (this.suma < 1) || (this.suma > 10000) ) {

                this.$notify({
                    type: 'error',
                    text: "Поле сумма должно быть в диапазоне от 1 до 10000!",
                    duration: 3000
                });
				return false
            } else if ( (this.term < 1) || (this.term > 12) ) {

                
                this.$notify({
                    type: 'error',
                    text: "Поле сроки должно быть в диапазоне от 1 до 12!",
                    duration: 3000
                });
				return false
            }
        },
        nextStep() {
            this.validation()
        }
    }
}
</script>