<template>
   <div class="container py-5 checkout-page">
      <RouterLink to="cart" class="text-decoration-none purple-text fw-bold mb-4 d-inline-block">
         &lt; Back to Cart
      </RouterLink>

      <h1 class="display-5 fw-bold purple-text mb-5">Checkout</h1>

      <div class="row g-5">
         <div class="col-lg-8">

            <div class="card shadow-sm border-0 p-4 mb-4 rounded-4">
               <h5 class="fw-bold mb-4">Contact Information</h5>
               <div class="mb-3">
                  <label class="form-label fw-semibold small">Email</label>
                  <input v-model="form.email" type="email" class="form-control custom-input"
                     placeholder="you@example.com">
               </div>
               <div class="mb-2">
                  <label class="form-label fw-semibold small">Phone Number</label>
                  <input v-model="form.phone" type="text" class="form-control custom-input"
                     placeholder="+1 (555) 000-0000">
               </div>
            </div>

            <div class="card shadow-sm border-0 p-4 rounded-4">
               <h5 class="fw-bold mb-4">Shipping Address</h5>
               <div class="row g-3">
                  <div class="col-md-6">
                     <label class="form-label fw-semibold small">First Name</label>
                     <input v-model="form.firstName" type="text" class="form-control custom-input">
                  </div>
                  <div class="col-md-6">
                     <label class="form-label fw-semibold small">Last Name</label>
                     <input v-model="form.lastName" type="text" class="form-control custom-input">
                  </div>
                  <div class="col-12">
                     <label class="form-label fw-semibold small">Address</label>
                     <input v-model="form.address" type="text" class="form-control custom-input"
                        placeholder="123 Main St">
                  </div>
               </div>
            </div>
         </div>

         <div class="col-lg-4">
            <div class="card shadow-sm border-0 p-4 rounded-4 sticky-top" style="top: 20px;">
               <h5 class="fw-bold mb-4">Order Summary</h5>

               <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold">Premium Wireless Headphones</span>
                  <span class="fw-bold">$299.99</span>
               </div>
               <p class="text-muted small">Qty: 1</p>
               <img class="card-img m-auto" src="../../assets/image/QR.png" style="width: 200px;" alt="">

               <hr class="my-4">

               <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Subtotal</span>
                  <span class="fw-semibold">$299.99</span>
               </div>
               <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Shipping</span>
                  <span class="text-success fw-bold">Free</span>
               </div>
               <div class="d-flex justify-content-between mb-4">
                  <span class="text-muted">Tax</span>
                  <span class="fw-semibold">$24.00</span>
               </div>

               <div class="d-flex justify-content-between align-items-center mb-4">
                  <h4 class="fw-bold">Total</h4>
                  <h4 class="fw-bold">$323.99</h4>
               </div>

               <button @click="placeOrder" class="btn btn-dark w-100 py-3 fw-bold rounded-3 mb-3">
                  Place Order
               </button>
               <p class="text-center text-muted x-small">
                  By placing your order, you agree to our terms and conditions
               </p>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import router from '@/router';
import { ref } from 'vue';


const form = ref({
   email: '',
   phone: '',
   firstName: '',
   lastName: '',
   address: ''
});

const placeOrder = () => {
   console.log('Order Data:', form.value);
   alert('Order placed successfully!');
   router.push('/');

};

</script>

<style scoped>
.checkout-page {
   background-color: #fdfdfd;
   min-height: 100vh;
}

.purple-text {
   color: #7d2ae8;
   /* Matching the purple in the image */
}

.custom-input {
   background-color: #f3f4f6;
   border: none;
   padding: 12px 15px;
   border-radius: 8px;
}

.custom-input:focus {
   background-color: #eceef1;
   box-shadow: 0 0 0 2px #7d2ae833;
}

.x-small {
   font-size: 0.75rem;
}

.rounded-4 {
   border-radius: 1rem !important;
}
</style>