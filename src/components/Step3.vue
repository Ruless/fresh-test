<template>
    <div>
        <table>
            <th>Step1</th>
            <tr>
                <td>Сума</td>
                <td> {{ dataStep1.suma }} </td>
            </tr>
            <tr>
                <td>Сроки</td>
                <td> {{ dataStep1.term }} </td>
            </tr>
            <th>Step2</th>
            <tr>
                <td>ИНН</td>
                <td> {{ dataStep2.idTetxt }} </td>
            </tr>
            <tr>
                <td>Фамилия</td>
                <td> {{ dataStep2.surname }} </td>
            </tr>
            <tr>
                <td>Имя</td>
                <td> {{ dataStep2.name }} </td>
            </tr>
            <tr>
                <td>Город</td>
                <td> {{ dataStep2.city }} </td>
            </tr>
        </table>
        <div v-if="!load">
            <div v-if="success" class="success">Данные отправлены</div>
            <div class="btn btn-back" @click="prevStep"> Назад </div>
            <div class="btn" @click="send"> Отправить </div>
        </div>
        <div v-else>
            Идет отправка...
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            dataStep1: [],
            dataStep2: [],
            load: false,
            success: false
        }
    },
    methods: {
        prevStep() {
            this.$emit('step', 2)
            this.$router.push({ name: 'step2' });
        },
        send() {
            let data = Object.assign(this.dataStep1, this.dataStep2)
            this.load = true
            axios.post('http://185.168.130.3:3000', {recipient: 123})
                .then( response => {
                    console.log( response )
                    if (response.data.success) {
                        this.success = true
                        this.load = false

                    }
                })
                .catch( error => {
                    console.log( error )
                })
        }
    },
    created() {
        this.dataStep1 = JSON.parse( localStorage.step1 )
        this.dataStep2 = JSON.parse( localStorage.step2 )
    }
}
</script>
