<template>
   <div class="container-fluid py-4 py-md-5">
      <div class="container">
         <div class="bg-white rounded-5 shadow-sm overflow-hidden">
            <div class="row g-0 align-items-center">

               <!-- Image -->
               <div class="col-12 col-md-6 p-3 p-md-4 p-lg-5 text-center">
                  <img src="../../../src/assets/image/login-image.png" alt="Login" class="img-fluid"
                     style="max-width: 520px;" />
               </div>

               <!-- Form -->
               <div class="col-12 col-md-6 p-3 p-md-4 p-lg-5">
                  <div class="mx-auto" style="max-width: 420px;">
                     <h1 class="h3 mb-1">Login Account</h1>
                     <p class="text-muted mb-4">Please login your account</p>

                     <form @submit.prevent="handleLogin" class="row g-3">
                        <!-- Email -->
                        <div class="col-12">
                           <label class="form-label mb-1">Email</label>
                           <input type="text" class="form-control" placeholder="Enter your Email" v-model="email" />
                           <p v-if="error.email" class="text-danger small mt-1">
                              {{ error.email }}
                           </p>
                        </div>

                        <!-- Password -->
                        <div class="col-12">
                           <label class="form-label mb-1">Password</label>
                           <div class="position-relative">
                              <input :type="showPassword ? 'text' : 'password'" class="form-control pe-5"
                                 placeholder="Enter your password" v-model="password" />

                              <!-- Clickable Icon -->
                              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
                                 class="position-absolute top-50 end-0 translate-middle-y me-3 password-icon"
                                 @click="togglePassword"></i>
                           </div>
                           <p v-if="error.password" class="text-danger small mt-1">
                              {{ error.password }}
                           </p>
                        </div>
                        <div class="col-12">
                           <div
                              class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">
                              <div class="form-check m-0">
                                 <input class="form-check-input" type="checkbox" id="remember" />
                                 <label class="form-check-label" for="remember">Remember me</label>
                              </div>
                              <router-link to="" class="small text-decoration-none">
                                 Forget Password?
                              </router-link>
                           </div>
                        </div>

                        <!-- Button -->
                        <div class="col-12">
                           <button type="submit" :disabled="isloading" class="btn btn-primary w-100">
                              <span v-if="isloading" class="spinner-border spinner-border-sm text-light me-2"
                                 role="status"></span>
                              <span>{{ isloading ? "Loading..." : "Login" }}</span>
                           </button>
                        </div>

                        <!-- Sign up -->
                        <div class="col-12">
                           <p class="mb-0">
                              Don't have account?
                              <router-link to="/register" class="text-decoration-none">
                                 Sign Up
                              </router-link>
                           </p>
                        </div>
                     </form>
                  </div>
               </div>

            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import { UseAuthStore } from '@/stores/auth';
import { notify } from '@/util/toast';
import { isEmail, minlength, required, validation } from '@/util/validation';
import { reactive, ref } from 'vue';

let email = ref("")
let password = ref("")
let auth = UseAuthStore();
let error = reactive({
   email: "",
   password: ""
})
let isloading = ref(false)
let showPassword = ref(false);

function togglePassword() {
   showPassword.value = !showPassword.value;
}
function validate() {
   error.email = validation(email.value, [
      (v) => required(v, 'This field is required'),
      (v) => isEmail(v, 'Email is wrong format')
   ])
   error.password = validation(password.value, [
      (v) => required(v, 'Password is required'),
      (v) => minlength(v, 8, "Password must be at least 8 characters")
   ])
   return !error.email && !error.password;
}
async function handleLogin() {
   if (!validate()) return
   if (isloading.value) return
   try {
      isloading.value = true
      await auth.login(email.value, password.value)
      notify.sucess('login successfully', '/')

   }
   catch (err) {
      notify.error(err?.data?.message || 'Login failed');
   }
   finally{
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