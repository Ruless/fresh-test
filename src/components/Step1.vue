<template>
    <div> 
        <div class="form-grp">
            <label>Сумма</label>
            <input type="text" v-model="post.suma" >
        </div>
        <div class="form-grp">
            <label>Срок</label>
            <input type="text" v-model="post.term" >
        </div>
        
        <div class="btn" @click="nextStep"> Далее </div>
    </div>
</template>

<script>


export default {
    data() {
        return {
            post: {
                suma: '',
                term: ''
            }

        }
    },
    methods: {
        validation() {

            if ( this.post.suma == '' || this.post.term == '') {
                
                this.$notify({
                    type: 'error',
                    text: "Поля не должны быть пустыми!",
                    duration: 3000
                });
				return false
            } else if ( !Number(this.post.suma) || !Number(this.post.term) ) {

                
                this.$notify({
                    type: 'error',
                    text: "Поля должны содержать только числа!",
                    duration: 3000
                });
				return false
            } else if ( this.post.suma.indexOf(".") > 0 ) {
                
                this.$notify({
                    type: 'error',
                    text: "Поле сумма должно содержать целочисельное значение!",
                    duration: 3000
                });
				return false
				
            } else if ( this.post.term.indexOf(".") > 0 ) {

                this.$notify({
                    type: 'error',
                    text: "Поле сроки должно содержать целочисельное значение!",
                    duration: 3000
                });
				return false
            } else if ( (this.post.suma < 1) || (this.post.suma > 10000) ) {

                this.$notify({
                    type: 'error',
                    text: "Поле сумма должно быть в диапазоне от 1 до 10000!",
                    duration: 3000
                });
				return false
            } else if ( (this.post.term < 1) || (this.post.term > 12) ) {

                
                this.$notify({
                    type: 'error',
                    text: "Поле сроки должно быть в диапазоне от 1 до 12!",
                    duration: 3000
                });
				return false
            }

            return true
        },
        nextStep() {
            if ( this.validation() ) {
                this.$emit('step', 2)
                localStorage.setItem('step1', JSON.stringify(this.post))
                this.$router.push({ name: 'step2' });
            }
        }
    },
    created() {
        if ( localStorage.getItem('step1') ) {
            let data = JSON.parse( localStorage.step1 )
            this.post.suma = data.suma
            this.post.term = data.term
        }
    }
}
</script>