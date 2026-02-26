<template>
   <div class="container py-4">
      <div class="register rounded-5 shadow-sm p-3 p-md-4">
         <div class="row g-4 align-items-center">

            <!-- Left: Image -->
            <div class="col-12 col-md-6 text-center">
               <img src="../../../src/assets/image/logo_register.png" alt="Register" class="img-fluid"
                  style="max-width: 500px;" />
            </div>

            <!-- Right: Form -->
            <div class="col-12 col-md-6">
               <div class="px-0 px-md-3">
                  <h1 class="h3 mb-3 text-center text-md-start">Create Account</h1>

                  <form @submit.prevent="handleregister" class="mx-auto" style="max-width: 420px;">
                     <!-- Email -->
                     <div class="mb-3">
                        <label class="form-label mb-1">Email</label>
                        <input type="email" class="form-control" placeholder="Enter your Email" v-model="form.email" />
                        <p v-if="error.email" class="text-danger small mb-0 mt-1">{{ error.email }}</p>
                     </div>

                     <!-- Name -->
                     <div class="mb-3">
                        <label class="form-label mb-1">Name</label>
                        <input type="text" class="form-control" placeholder="Enter your Name" v-model="form.name" />
                        <p v-if="error.name" class="text-danger small mb-0 mt-1">{{ error.name }}</p>
                     </div>

                     <!-- Password -->

                     <div class="mb-3">
                        <label class="form-label mb-1">Password</label>

                        <div class="position-relative">
                           <input :type="showPassword ? 'text' : 'password'" class="form-control pe-5"
                              placeholder="Enter your password" v-model="form.password" />

                           <!-- Clickable Eye Icon -->
                           <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
                              class="position-absolute top-50 end-0 translate-middle-y me-3 password-icon"
                              @click="togglePassword"></i>
                        </div>

                        <p v-if="error.password" class="text-danger small mb-0 mt-1">
                           {{ error.password }}
                        </p>
                     </div>

                     <!-- Confirm Password -->
                     <div class="mb-4">
                        <label class="form-label mb-1">Confirm Password</label>
                        <input type="password" class="form-control" placeholder="Confirm Password"
                           v-model="form.password_confirmation" />
                        <p v-if="error.password_confirmation" class="text-danger small mb-0 mt-1">
                           {{ error.password_confirmation }}
                        </p>
                     </div>

                     <!-- Button -->
                     <button type="submit" :disabled="isloading" class="btn btn-primary w-100">
                        <span v-if="isloading" class="spinner-border spinner-border-sm text-light me-2"
                           role="status"></span>
                        <span>{{ isloading ? "Loading..." : "Sign Up" }}</span>
                     </button>

                     <!-- Link -->
                     <p class="mt-3 mb-0 text-center">
                        Already have account?
                        <router-link to="/login">Sign In</router-link>
                     </p>
                  </form>

               </div>
            </div>

         </div>
      </div>
   </div>
</template>

<script setup>
import { UseAuthStore } from "@/stores/auth";
import { notify } from "@/util/toast";
import { isEmail, isPassword, minlength, required, validation } from "@/util/validation";
import { reactive, ref } from "vue";

const auth = UseAuthStore();
const form = reactive({
   email: "",
   name: "",
   password: "",
   password_confirmation: "",
});

const error = reactive({
   email: "",
   name: "",
   password: "",
   password_confirmation: "",
})
let isloading = ref(false);
let showPassword = ref(false)

function togglePassword() {
  showPassword.value = !showPassword.value
}
function validate() {
   error.email = validation(form.email, [
      (v) => required(v, 'Email is required'),
      (v) => isEmail(v, 'Email is wrong format')
   ])
   error.password = validation(form.password, [
      (v) => required(v, 'Email is required'),
      (v) => isPassword(v, 'Password must contain uppercase, lowercase, number and special character'),
      (v) => minlength(v, 8, "Password must be at least 8 characters")
   ])
   error.name = required(form.name, "Name is required")
   error.password_confirmation = validation(form.password_confirmation, [
      (v) => required(v, 'Confirm Password is required'),
      (v) => v === form.password ? '' : 'Password confirmation does not match',
   ]);
   return !error.email && !error.name && !error.password && !error.password_confirmation;
}

async function handleregister() {
   if (!validate()) return
   if (form.password !== form.password_confirmation) {
      notify.error("Password do not match");
      return;
   }
   isloading.value = true
   const res = await auth.register(
      form.email,
      form.name,
      form.password,
      form.password_confirmation,
   );

   if (res && res.result === true) {
      notify.sucess("Register Succcessfully", "/login");
   } else {
      notify.error(res.message || "Register failed");
      isloading.value = false
   }

}
</script>

<style scoped>
.register {
   padding: 30px;
   margin-top: 90px;
   box-shadow:
      rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
   animation: ease-in 0.5s;
}

.register:hover {
   transition: 0.5s;
   box-shadow:
      #c47be4 0px 10px 15px -3px,
      #b153d7 0px 4px 6px -2px;
}
</style>
