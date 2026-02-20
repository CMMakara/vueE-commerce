<template>
  <div class="container">
      <div class="register rounded-5">
         <div class="row d-flex justify-content-between">
            <div class="col-sm-12 col-md-6">
               <img src="../../../src/assets/image/logo_register.png" alt="" width="500px">
            </div>
            <div class="col-sm-12 col-md-6">
               <div class="mt-3 ms-4">
                  <h1>Create Account</h1>
                  <!-- <p>Please login your account</p> -->
                  <form action="">
                     <div class="col-md-8">
                        <label for="" class="mb-1">Email</label>
                        <input type="text" class="form-control" placeholder="Enter your Email">
                     </div>
                     <div class="col-md-8 mt-3">
                        <label for="" class="mb-1">Name</label>
                        <input type="text" class="form-control" placeholder="Enter your Name">
                     </div>
                     <div class="col-md-8 mt-3">
                        <label for="" class="mb-1">Password</label>
                        <input type="text" class="form-control" placeholder="Enter your password">
                     </div>
                     <div class="col-md-8 mt-3">
                        <label for="" class="mb-1">Confirm Password</label>
                        <input type="text" class="form-control" placeholder="Confirm Password">
                     </div>
                     <div class="col-md-8 mt-4">
                        <button type="submit" class="btn btn-primary w-100">Sign Up</button>
                     </div>
                     <div class="col-md-8 mt-3">
                        <p>Already have account? <router-link to="/login">Sign In</router-link></p>
                     </div>
                  </form>
               </div>

            </div>
         </div>
      </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.register {
   padding: 30px;
   margin-top: 130px;
   box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
   animation: ease-in 0.5s;
}

.register:hover {
   transition: 0.5s;
   box-shadow: #C47BE4 0px 10px 15px -3px, #B153D7 0px 4px 6px -2px;
}
</style>