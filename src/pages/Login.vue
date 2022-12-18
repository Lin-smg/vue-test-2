<template>
    <div class="row justify-content-center mt-5">

        <div class="card" style="width: 30rem;">

            <h5 class="card-header">Login</h5>
            <div class="card-body">
                <div class="mb-3 text-start">
                    <label for="exampleFormControlInput1" class="form-label">User Name</label>
                    <input v-model="userName" type="email" class="form-control" id="exampleFormControlInput1"
                        placeholder="Enter User Name">
                </div>

                <button class="btn btn-primary w-100" type="button" @click="login">Login</button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router';
const authStore = useAuthStore();

const router = useRouter();

const userName = ref("")

const login = () => {
    authStore.login(userName.value);
    
    router.push("/")
}


</script>