<template>
    <div>
        {{ step1 }}
        <div class="form-grp">
            <label>ИНН</label>
            <input type="text" v-model="post.idTetxt" >
        </div>
        <div class="form-grp">
            <label>Фамилия</label>
            <input type="text" v-model="post.surname" >
        </div>
        <div class="form-grp">
            <label>Имя</label>
            <input type="text" v-model="post.name" >
        </div>
        <div class="form-grp">
            <label>Город</label>
            <input type="text" v-model="post.city" @input="autocomplite">
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
        <div class="btn btn-back" @click="prevStep"> Назад </div>
        <div class="btn" @click="nextStep"> Далее </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['step1'],
    data() {
        return {
            isOpen: false,
            post: {

                idTetxt: '',
                surname: '',
                name: '',
                city: ''
            },
            cityArr: [],
            findArr: []
        }
    },
    methods: {
        validation() {

            if ( this.post.idTetxt == '' || this.post.surname == '' || this.post.name == '' || this.post.city == '') {

                this.$notify({
                    type: 'error',
                    text: "Поля не должны быть пустыми!",
                    duration: 3000
                });
				return false
            } else if ( this.post.idTetxt.length != 10 ) {
                this.$notify({
                    type: 'error',
                    text: "Длинна поля ИНН должна быть 10 символов!",
                    duration: 3000
                });
				return false
            } else if ( !Number(this.post.idTetxt) ) {
                this.$notify({
                    type: 'error',
                    text: "Поле ИНН должны содержать только числа!",
                    duration: 3000
                });
				return false
            }

            return true
        },
        autocomplite() {
            this.findArr = this.cityArr.filter(item => item.toLowerCase().indexOf(this.post.city.toLowerCase()) > -1);
            if ( this.findArr.length != 0 ) {
                this.isOpen = true
            }
        },
        setResult(result) {
            this.post.city = result;
            this.isOpen = false;
        },
        prevStep() {
            if ( this.validation() ) {
                this.$router.push({ name: 'step1' });
            }
        },
        nextStep() {
            if ( this.validation() ) {
                localStorage.setItem('step2', JSON.stringify(this.post))
                this.$router.push({ name: 'step3' });
            }
        },
        clickOutside(evt) {
            if (!this.$el.contains(evt.target)) {
                this.isOpen = false;
            }
        }
    },
    created() {
        if ( localStorage.getItem('step2') ) {
            let data = JSON.parse( localStorage.step2 )
            this.post.idTetxt = data.idTetxt
            this.post.surname = data.surname
            this.post.name = data.name
            this.post.city = data.city
        }

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
