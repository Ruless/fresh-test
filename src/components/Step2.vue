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
            <input type="text" v-model="city" @input="autocomplite">
            <ul
                v-show="isOpen"
                class="autocomplete-results"
            >
                <li
                    v-for="(item, i) in findArr"
                    :key="i"
                    class="autocomplete-result"
                    @click="setResult(item)"
                >
                {{ item }}
                </li>
            </ul>
        </div>
        <div class="btn" @click="nextStep"> Далее </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            isOpen: false,
            idTetxt: '',
            surname: '',
            name: '',
            city: '',
            cityArr: [],
            findArr: []
        }
    },
    methods: {
        validation() {

            if ( this.idTetxt == '' || this.surname == '' || this.name == '' || this.city == '') {

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
            this.isOpen = true
            this.findArr = this.cityArr.filter(item => item.toLowerCase().indexOf(this.city.toLowerCase()) > -1);
        },
        setResult(result) {
            this.city = result;
            this.isOpen = false;
        },
        nextStep() {
            this.validation()
        },
        clickOutside(evt) {
            if (!this.$el.contains(evt.target)) {
                this.isOpen = false;
            }
        }
    },
    created() {
        axios.get('https://api.hh.ru/areas/5').then( (response) => {
            response.data.areas.forEach( (element) => {
                element.areas.forEach( (item) => {
                    this.cityArr.push(item.name)
                })
            });

        })
    },
    mounted() {
        document.addEventListener("click", this.clickOutside);
    },
    destroyed() {
        document.removeEventListener("click", this.clickOutside);
    }
}
</script>


<style lang="scss">

    .autocomplete {
        position: relative;
        width: 130px;
    }

    .autocomplete-results {
        padding: 0;
        margin: 0;
        border: 1px solid #eeeeee;
        height: 120px;
        overflow: auto;
        width: 100%;
    }

    .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
    }

    .autocomplete-result.is-active,
    .autocomplete-result:hover {
    background-color: #4aae9b;
    color: white;
    }

</style>
