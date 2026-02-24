<template>
   <div class="container">
      <div class="register rounded-5">
         <div class="row d-flex justify-content-between">
            <div class="col-sm-12 col-md-6">
               <img src="../../../src/assets/image/logo_register.png" alt="" width="500px" />
            </div>
            <div class="col-sm-12 col-md-6">
               <div class="ms-4">
                  <h1>Create Account</h1>
                  <form @submit.prevent="handleregister">
                     <div class="col-md-8">
                        <label for="" class="mb-1">Email</label>
                        <input type="text" class="form-control" placeholder="Enter your Email" v-model="form.email" />
                        <p v-if="error.email" class="text-danger small">{{ error.email }}</p>
                     </div>
                     <div class="col-md-8 mt-3">
                        <label for="" class="mb-1">Name</label>
                        <input type="text" class="form-control" placeholder="Enter your Name" v-model="form.name" />
                        <p v-if="error.name" class="text-danger small">{{ error.name }}</p>
                     </div>
                     <div class="col-md-8 mt-3">
                        <label for="" class="mb-1">Password</label>
                        <input type="text" class="form-control" placeholder="Enter your password"
                           v-model="form.password" />
                        <p v-if="error.password" class="text-danger small">{{ error.password }}</p>
                     </div>
                     <div class="col-md-8 mt-3">
                        <label for="" class="mb-1">Confirm Password</label>
                        <input type="text" class="form-control" placeholder="Confirm Password"
                           v-model="form.password_confirmation" />
                        <p v-if="error.password_confirmation" class="text-danger small">{{ error.password_confirmation
                           }}</p>
                     </div>
                     <div class="col-md-8 mt-4">
                        <button type="submit" :disabled="isLoading" class="btn btn-primary w-100">
                           <div v-if="isLoading" class="spinner-border text-light" role="status">
                              <span class="visually-hidden">Loading...</span>
                           </div>
                           <div v-else>Sign Up</div>
                        </button>
                     </div>
                     <div class="col-md-8 mt-3">
                        <p>
                           Already have account?
                           <router-link to="/login">Sign In</router-link>
                        </p>
                     </div>
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
import { isEmail, required, validation } from "@/util/validation";
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
let isloading = ref(false)

function validate() {
   error.email = validation(form.email, [
      (v) => required(v, 'Email is required'),
      (v) => isEmail(v, 'Email is wrong format')
   ])
   error.name = required(form.name, "Name is required")
   error.password = required(form.password, "Password is required");
   error.password_confirmation = required(form.password_confirmation, "Confirm Password is required");
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
