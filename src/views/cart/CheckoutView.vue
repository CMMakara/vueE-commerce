<template>
   <div class="container py-5 checkout-page mt-3 rounded">

      <RouterLink
         to="cart"
         class="text-decoration-none purple-text fw-bold mb-4 d-inline-block">
         &lt; Back to Cart
      </RouterLink>
      <h1 class="display-5 fw-bold purple-text mb-5">
         Checkout
      </h1>

      <div class="row g-5">
         <div class="col-lg-8">
            <div class="card shadow-sm border-0 p-4 mb-4 rounded-4">
               <h5 class="fw-bold mb-4">
                  Contact Information
               </h5>
               <div class="mb-3">
                  <label class="form-label small fw-semibold">
                     Email
                  </label>
                  <input
                     v-model="form.email"
                     type="email"
                     class="form-control custom-input"
                     placeholder="email@example.com">
               </div>
               <div class="mb-3">
                  <label class="form-label small fw-semibold">
                     Phone
                  </label>
                  <input
                     v-model="form.phone"
                     type="text"
                     class="form-control custom-input"
                     placeholder="+855 12 345 678">
               </div>

            </div>
            <!-- Shipping -->
            <div class="card shadow-sm border-0 p-4 rounded-4">

               <h5 class="fw-bold mb-4">
                  Shipping Address
                  <span
                     v-if="cartQty == 1"
                     class="badge bg-warning ms-2">
                     Pickup only (No delivery)
                  </span>

                  <span
                     v-else
                     class="badge bg-success ms-2">
                     Delivery Available
                  </span>
               </h5>
               <!-- Pickup message -->
               <p
                  v-if="cartQty == 1"
                  class="text-warning small">
                  You can pay now and pickup at our store.
               </p>
               <div class="row g-3">
                  <div class="col-md-6">
                     <label class="form-label small fw-semibold">
                        First Name
                     </label>

                     <input
                        v-model="form.firstName"
                        type="text"
                        class="form-control custom-input">
                  </div>

                  <div class="col-md-6">
                     <label class="form-label small fw-semibold">
                        Last Name
                     </label>

                     <input
                        v-model="form.lastName"
                        type="text"
                        class="form-control custom-input">
                  </div>

                  <div class="col-12">
                     <label class="form-label small fw-semibold">
                        Address
                     </label>

                     <input
                        v-model="form.address"
                        type="text"
                        class="form-control custom-input"
                        :disabled="cartQty == 1"
                        placeholder="Enter delivery address">
                  </div>
               </div>
            </div>
         </div>
         <div class="col-lg-4">
            <div
               class="card shadow-sm border-0 p-4 rounded-4 sticky-top"
               style="top:20px">
               <h5 class="fw-bold mb-4">
                  Order Summary
               </h5>
               <!-- Product -->
               <div class="d-flex justify-content-between">
                  <span class="fw-bold">
                     Premium Wireless Headphones
                  </span>

                  <span class="fw-bold">
                     ${{ price }}
                  </span>
               </div>
               <!-- Quantity -->
               <div class="mt-3 mb-3">

                  <label class="small fw-semibold">
                     Quantity
                  </label>
                  <input
                     type="number"
                     v-model="cartQty"
                     min="1"
                     class="form-control custom-input">
               </div>
               <!-- QR -->
               <img
                  src="../../assets/image/QR.png"
                  class="img-fluid mb-3 rounded"
                  style="max-width:200px; margin:auto; display:block;">
               <!-- Upload receipt -->
               <div class="mb-3">

                  <label class="form-label small fw-semibold">
                     Upload Transaction Receipt
                  </label>

                  <input
                     type="file"
                     class="form-control custom-input"
                     accept="image/*,application/pdf"
                     @change="handleFileUpload">
               </div>
               <!-- Preview -->
               <div v-if="form.transactionFile">

                  <img
                     v-if="isImage"
                     :src="previewUrl"
                     class="img-fluid rounded mb-3"
                     style="max-height:150px">
                  <p
                     v-else
                     class="text-success small">
                     File uploaded:
                     {{ form.transactionFile.name }}
                  </p>
               </div>
               <hr>
               <!-- Subtotal -->
               <div class="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>${{ subtotal }}</span>
               </div>
               <!-- Shipping -->
               <div class="d-flex justify-content-between">
                  <span>Shipping</span>
                  <span
                     v-if="cartQty >= 2"
                     class="text-success fw-bold">
                     Delivery
                  </span>
                  <span
                     v-else
                     class="text-warning fw-bold">
                     Pickup only
                  </span>
               </div>
               <!-- Tax -->
               <div class="d-flex justify-content-between">
                  <span>Tax</span>
                  <span>${{ tax }}</span>
               </div>
               <hr>
               <!-- Total -->
               <div class="d-flex justify-content-between">
                  <h4>Total</h4>
                  <h4>${{ total }}</h4>
               </div>
               <!-- Button -->
               <button
                  class="btn btn-dark w-100 py-3 fw-bold"
                  :disabled="!form.transactionFile"
                  @click="placeOrder">
                  Place Order
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>
import router from '@/router'
import { ref, computed } from 'vue'
const price = 299.99
const cartQty = ref(1)
const form = ref({
   email: '',
   phone: '',
   firstName: '',
   lastName: '',
   address: '',
   transactionFile: null
})
const previewUrl = ref('')
const isImage = ref(false)
const handleFileUpload = (event) => {
   const file = event.target.files[0]
   if (!file) return
   form.value.transactionFile = file
   if (file.type.startsWith('image')) {
      isImage.value = true
      previewUrl.value =
         URL.createObjectURL(file)
   }
   else {
      isImage.value = false
      previewUrl.value = ''
   }
}
const subtotal = computed(() =>
   (price * cartQty.value).toFixed(2)
)
const tax = computed(() =>
   (subtotal.value * 0.08).toFixed(2)
)
const total = computed(() =>
   (
      parseFloat(subtotal.value) +
      parseFloat(tax.value)
   ).toFixed(2)
)
const placeOrder = () => {
   if (!form.value.transactionFile) {
      alert('Please upload transaction receipt')
      return
   }
   if (cartQty.value >= 2 && !form.value.address) {
      alert('Please enter delivery address')
      return
   }
   router.push('/')
}
</script>


<style scoped>
.checkout-page {
   background: #f8f9fa;
   min-height: 100vh;
}
.purple-text {
   color: #7d2ae8;
}
.custom-input {
   background: #f1f3f5;
   border: none;
   border-radius: 8px;
   padding: 10px;
}
.custom-input:focus {
   background: #e9ecef;
   box-shadow: 0 0 0 2px #7d2ae833;
}
.rounded-4 {
   border-radius: 16px;
}
</style>