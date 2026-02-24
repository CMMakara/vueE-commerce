<template>
   <div class="container">
      <div class="login rounded-5">
         <div class="row d-flex justify-content-between">
            <div class="col-sm-12 col-md-6">
               <img src="../../../src/assets/image/login-image.png" alt="" width="500px">
            </div>
            <div class="col-sm-12 col-md-6">
               <div class="mt-2 ms-4">
                  <h1>Login Account</h1>
                  <p>Please login your account</p>
                  <form @submit.prevent="handleLogin">
                     <div class="col-md-8">
                        <label for="" class="mb-2">Email</label>
                        <input type="text" class="form-control" placeholder="Enter your Email" v-model="email">
                        <p v-if="error.email" class="text-danger small mt-1">{{ error.email }}</p>
                     </div>
                     <div class="col-md-8 mt-3">
                        <label for="" class="mb-2">Password</label>
                        <input type="text" class="form-control" placeholder="Enter your password" v-model="password">
                        <p v-if="error.password" class="text-danger small mt-1">{{ error.password }}</p>
                     </div>
                     <div class="col-md-8 mt-2 d-flex align-items-center">
                        <div class="d-flex align-items-center justify-content-between">
                           <input type="checkbox">
                           <p class="mt-3 px-2">remember me</p>
                           <div class="forget">
                              <router-link to="">Forget Password?</router-link>
                           </div>
                        </div>
                     </div>
                     <div class="col-md-8">
                        <button type="submit" class="btn btn-primary w-100">Login</button>
                     </div>
                     <div class="col-md-8 mt-3">
                        <p>Don't have account? <router-link to="/register">Sign Up</router-link></p>
                     </div>
                  </form>
               </div>

            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import { UseAuthStore } from '@/stores/auth';
import { notify } from '@/util/toast';
import { isEmail, required, validation } from '@/util/validation';
import { reactive, ref } from 'vue';

let email = ref("")
let password = ref("")
let auth = UseAuthStore();
let error = reactive({
   email: "",
   password: ""
})
let isloading = ref(false)
function validate() {
   error.email = validation(email.value, [
      (v) => required(v, 'This field is required'),
      (v) => isEmail(v, 'Email is wrong format')
   ])
   error.password = required(password.value, "Password is required");
   return !error.email && !error.password;
}
async function handleLogin() {
   if (!validate()) return
   isloading.value = true
   try {
      await auth.login(email.value, password.value)
      console.log(email.value, password.value);
      notify.sucess('login successfully', '/')

   }
   catch (err) {
      notify.error(err?.data?.message || 'Login failed');
      isloading.value = false
   }
}

</script>

<style scoped>
.login {
   padding-top: 30px;
   margin-top: 90px;
   box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
   animation: ease-in 0.5s;
}

.login:hover {
   transition: 0.5s;
   box-shadow: #C47BE4 0px 10px 15px -3px, #B153D7 0px 4px 6px -2px;
}

.forget {
   margin-left: 130px;
}
</style>