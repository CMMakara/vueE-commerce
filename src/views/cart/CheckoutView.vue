<template>
   <div class="container py-5 checkout-page mt-3 rounded bg-body-secondary
 ">

      <!-- Back -->
      <RouterLink to="/cart" class="text-decoration-none text-primary fw-bold mb-4 d-inline-block">
         &lt; Back to Cart
      </RouterLink>

      <h1 class="display-5 fw-bold text-primary mb-5">
         Checkout
      </h1>

      <div class="row g-5">

         <!-- Contact & Shipping -->
         <div class="col-lg-8">
            <!-- Contact Information -->
            <div class="card shadow-sm border-0 p-4 mb-4 rounded-4">
               <h5 class="fw-bold mb-4">Contact Information</h5>

               <div class="mb-3">
                  <label class="form-label small fw-semibold">Email</label>
                  <input v-model="form.email" type="email" class="form-control custom-input"
                     placeholder="you@example.com">
               </div>

               <div class="mb-3">
                  <label class="form-label small fw-semibold">Phone</label>
                  <input v-model="form.phone" type="text" class="form-control custom-input"
                     placeholder="+1 555 123 4567">
               </div>
            </div>

            <!-- Shipping Method & Address -->
            <div class="card shadow-sm border-0 p-4 rounded-4">

               <h5 class="fw-bold mb-4">
                  Shipping Method
                  <span v-if="cartQty < 2" class="badge bg-warning ms-2">Pickup Only</span>
                  <span v-else class="badge bg-success ms-2">Delivery Available</span>
               </h5>

               <!-- Delivery Options -->
               <div class="mb-4">
                  <h6 class="fw-bold mb-3">Delivery Method</h6>

                  <div v-if="cartQty >= 2" class="d-flex flex-column gap-2">
                     <div class="form-check">
                        <input class="form-check-input" type="radio" id="pickup" value="pickup" v-model="deliveryType">
                        <label class="form-check-label" for="pickup">
                           for not delivery
                        </label>
                     </div>

                     <div class="form-check">
                        <input class="form-check-input" type="radio" id="delivery" value="delivery"
                           v-model="deliveryType">
                        <label class="form-check-label" for="delivery">
                           for delivery </label>
                     </div>
                  </div>

                  <div v-else class="badge bg-warning mt-2">
                     Pickup Only
                  </div>
               </div>

               <!-- Shipping Form -->
               <div class="row g-3">
                  <div class="col-md-6">
                     <label class="form-label small fw-semibold">First Name</label>
                     <input v-model="form.firstName" type="text" class="form-control custom-input"
                        placeholder="firstname">
                  </div>

                  <div class="col-md-6">
                     <label class="form-label small fw-semibold">Last Name</label>
                     <input v-model="form.lastName" type="text" class="form-control custom-input"
                        placeholder="lastname">
                  </div>

                  <div class="col-12">
                     <label class="form-label small fw-semibold">Address</label>
                     <input v-model="form.address" type="text" class="form-control custom-input"
                        :disabled="deliveryType === 'pickup'" placeholder="Enter delivery address">
                  </div>
               </div>

            </div>
         </div>

         <!-- RIGHT SIDE: Order Summary & Payment -->
         <div class="col-lg-4">
            <div class="card shadow-lg border-0 p-4 rounded" style="top:20px">

               <h5 class="fw-bold mb-4">Order Summary</h5>

               <!-- Items -->
               <div v-for="item in cartStore.items" :key="item.id"
                  class="d-flex justify-content-between align-items-center mb-3">
                  <div class="d-flex align-items-center gap-2">
                     <img :src="item.product?.image || '/placeholder.png'" alt="item" class="img-thumbnail rounded"
                        style="width:50px; height:50px; object-fit:cover;">
                     <span class="fw-semibold">{{ item.product?.title }} (x{{ item.quantity || item.qty || 0 }})</span>
                  </div>
                  <span class="fw-bold">${{ ((item.product?.price || 0) * (item.quantity || item.qty || 0)).toFixed(2)
                     }}</span>
               </div>

               <hr>

               <!-- Subtotal & Tax -->
               <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Subtotal</span>
                  <span class="fw-semibold">${{ subtotal }}</span>
               </div>
               <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Tax (8%)</span>
                  <span class="fw-semibold">${{ tax }}</span>
               </div>

               <hr class="my-3">

               <!-- Total -->
               <div class="d-flex justify-content-between align-items-center mb-4">
                  <h5 class="mb-0">Total</h5>
                  <h5 class="mb-0 text-primary">${{ total }}</h5>
               </div>

               <!-- QR Payment -->
               <div class="text-center mb-4">
                  <h6 class="fw-bold mb-2">Scan to Pay</h6>
                  <img src="@/assets/image/QR.png" alt="Payment QR" class="img-fluid rounded shadow-sm"
                     style="max-height: 180px;">
               </div>

               <!-- Upload Payment (No Preview) -->
               <div class="mb-4">
                  <label class="form-label fw-semibold small">Upload Payment Screenshot</label>
                  <input type="file" class="form-control" accept="image/*" @change="handleFileUpload">
               </div>

               <!-- Place Order Button -->
               <button class="btn btn-primary w-100 py-3 fw-bold" :disabled="cartStore.loading || !paymentImage"
                  @click="placeOrder">
                  {{ cartStore.loading ? "Processing..." : "Place Order" }}
               </button>

            </div>
         </div>

      </div>
   </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useCartStore } from "@/stores/cart"
import router from "@/router"

const cartStore = useCartStore()

onMounted(async () => {
   await cartStore.fetchCart()
})

const form = ref({
   email: "",
   phone: "",
   firstName: "",
   lastName: "",
   address: ""
})

const deliveryType = ref("pickup")
const paymentImage = ref(null)

const handleFileUpload = (event) => {
   const file = event.target.files[0]
   if (file) {
      paymentImage.value = file
   }
}

const cartQty = computed(() =>
   cartStore.items.reduce((total, item) => total + (item.quantity || item.qty || 0), 0)
)

const subtotal = computed(() =>
   cartStore.items.reduce((total, item) => {
      const price = item.product?.price || 0
      const qty = item.quantity || item.qty || 0
      return total + price * qty
   }, 0).toFixed(2)
)

const tax = computed(() => (parseFloat(subtotal.value) * 0.08).toFixed(2))

const total = computed(() => (parseFloat(subtotal.value) + parseFloat(tax.value)).toFixed(2))

const placeOrder = async () => {
   if (!paymentImage.value) {
      alert("Please upload payment screenshot")
      return
   }
   if (deliveryType.value === "delivery" && !form.value.address) {
      alert("Please enter delivery address")
      return
   }

   const formData = new FormData()
   formData.append("email", form.value.email)
   formData.append("phone", form.value.phone)
   formData.append("firstName", form.value.firstName)
   formData.append("lastName", form.value.lastName)
   formData.append("address", form.value.address)
   formData.append("deliveryType", deliveryType.value)
   formData.append("payment_image", paymentImage.value)

   try {
      await cartStore.checkout(formData)

      // Clear uploaded file after success
      paymentImage.value = null

      alert("Payment successful! Your order has been placed.")
      router.push("/")
   } catch (err) {
      alert("Something went wrong. Please try again.")
   }
}
</script>