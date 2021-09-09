<template>
    <div class="container-fluid mb-5 mt-4">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card border-0 shadow rounded">
                    <div class="card-body">
                        <h4>REGISTER</h4>
                        <hr>
                        <form @submit.prevent="register">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>full name</label>
                                        <input type="text" v-model="user.name" class="form-control" placeholder="full name">
                                    </div>
                                    <div class="mt-2 alert alert-danger" v-if="validation.name">
                                        {{validation.name[0]}}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                            <label>email address</label>
                                            <input type="email" v-model="user.email" class="form-control" placeholder="email address">
                                    </div>
                                    <div class="mt-2 alert alert-danger" v-if="validation.email">
                                        {{validation.email[0]}}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>password</label>
                                        <input type="password" v-model="user.password" class="form-control" placeholder="password">
                                    </div>
                                    <div class="mt-2 alert alert-danger" v-if="validation.password">
                                        {{validation.password[0]}}
                                    </div>
                                </div>
                                 <div class="col-md-6">
                                    <div class="form-group">
                                        <label>konfirmasi password</label>
                                        <input type="password" v-model="user.password_confirmation" class="form-control" placeholder="konfirmasi password">
                                    </div>
                                </div>
                            </div>
                            <button type="submit" class="btn bnt-primary btn-block">REGISTER</button>
                        </form>
                    </div>
                </div>
                <div class="register mt-3 text-center">
                    <p>sudah punya akun ? <router-link :to="{name: 'login'}">Login Disini !</router-link></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ref, reactive} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
export default {
    setup() {
        const user = reactive ({
            name: '',
            email: '',
            password: '',
            password_confimation: ''
        })

        const validation = ref([])

        const store = useStore()

        const router = useRouter()

        function register(){
            let name = user.name
            let email = user.email
            let password = user.password
            let password_confimation = user.password_confimation

            store.dispatch('auth/register', {
                name,
                email,
                password,
                password_confimation
            })
            .then(() => {
                router.push({name: 'dashboard'})
            }).catch(error => {
                validation.value = error
            })
        }
        return {
            user,
            validation,
            register
        }
    }
}
</script>