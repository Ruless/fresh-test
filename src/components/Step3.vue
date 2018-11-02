<template>
    <div>
        <table>
            <th>Step1</th>
            <tr>
                <td>Сума</td>
                <td> {{ dataStep1.suma }} </td>
            </tr>
            <tr>
                <td>Сума</td>
                <td> {{ dataStep1.suma }} </td>
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

        {{ dataStep1 }} <br>
        {{ dataStep2 }} <br>

        <div class="btn btn-back" @click="prevStep"> Назад </div>
        <div class="btn" @click="send"> Отправить </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataStep1: [],
            dataStep2: []
        }
    },
    methods: {
        prevStep() {
            this.$router.push({ name: 'step2' });
        },
    },
    created() {
        this.dataStep1 = JSON.parse( localStorage.step1 )
        this.dataStep2 = JSON.parse( localStorage.step2 )
    }
}
</script>
