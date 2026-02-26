<template>
   <div class="container py-5 checkout-page mt-3 rounded bg-body-secondary">

      <!-- Back -->
      <RouterLink to="/cart" class="text-decoration-none text-primary fw-bold mb-4 d-inline-block">
         &lt; Back to Cart
      </RouterLink>

      <h1 class="display-5 fw-bold text-primary mb-5">Checkout</h1>

      <div class="row g-5">

         <!-- LEFT SIDE -->
         <div class="col-lg-8">

            <!-- Contact Info -->
            <div class="card shadow-sm border-0 p-4 mb-4 rounded-4">
               <h5 class="fw-bold mb-4">Contact Information</h5>

               <div class="mb-3">
                  <label class="form-label small fw-semibold">Email</label>
                  <input v-model="form.email" type="email" class="form-control"
                     :class="{ 'is-invalid': errors.email }" />
                  <div class="invalid-feedback">
                     {{ errors.email }}
                  </div>
               </div>

               <div class="mb-3">
                  <label class="form-label small fw-semibold">Phone</label>
                  <input v-model="form.phone" type="text" class="form-control"
                     :class="{ 'is-invalid': errors.phone }" />
                  <div class="invalid-feedback">
                     {{ errors.phone }}
                  </div>
               </div>
            </div>

            <!-- Shipping -->
            <div class="card shadow-sm border-0 p-4 rounded-4">
               <h5 class="fw-bold mb-4">
                  Shipping Method
                  <span class="badge bg-success ms-2">Delivery Available</span>
               </h5>

               <!-- Delivery Type -->
               <div class="mb-4">
                  <h6 class="fw-bold mb-3">Delivery Method</h6>

                  <div class="form-check">
                     <input class="form-check-input" type="radio" value="pickup" v-model="deliveryType" />
                     <label class="form-check-label">Pickup</label>
                  </div>

                  <div class="form-check">
                     <input class="form-check-input" type="radio" value="delivery" v-model="deliveryType" />
                     <label class="form-check-label">Home Delivery</label>
                  </div>
               </div>

               <!-- Name -->
               <div class="row g-3">
                  <div class="col-md-6">
                     <label class="form-label small fw-semibold">First Name</label>
                     <input v-model="form.firstName" type="text" class="form-control"
                        :class="{ 'is-invalid': errors.firstName }" />
                     <div class="invalid-feedback">
                        {{ errors.firstName }}
                     </div>
                  </div>

                  <div class="col-md-6">
                     <label class="form-label small fw-semibold">Last Name</label>
                     <input v-model="form.lastName" type="text" class="form-control"
                        :class="{ 'is-invalid': errors.lastName }" />
                     <div class="invalid-feedback">
                        {{ errors.lastName }}
                     </div>
                  </div>

                  <!-- Delivery Fields -->
                  <template v-if="deliveryType === 'delivery'">
                     <div class="col-12">
                        <label class="form-label small fw-semibold">Address</label>
                        <input v-model="form.address" type="text" class="form-control"
                           :class="{ 'is-invalid': errors.address }" />
                        <div class="invalid-feedback">
                           {{ errors.address }}
                        </div>
                     </div>

                     <div class="col-12">
                        <label class="form-label small fw-semibold">Google Map URL</label>
                        <input v-model="form.mapUrl" type="url" class="form-control"
                           :class="{ 'is-invalid': errors.mapUrl }" />
                        <div class="invalid-feedback">
                           {{ errors.mapUrl }}
                        </div>
                     </div>
                  </template>
               </div>
            </div>
         </div>

         <!-- RIGHT SIDE -->
         <div class="col-lg-4">
            <div class="card shadow-lg border-0 p-4 rounded-4">
               <h5 class="fw-bold mb-4">Order Summary</h5>

               <div v-for="item in cartStore.items" :key="item.id" class="d-flex justify-content-between mb-3">
                  <div>
                     {{ item.product?.title }}
                     <small class="text-muted">x{{ item.quantity }}</small>
                  </div>
                  <div>
                     ${{ (Number(item.product?.price || 0) * Number(item.quantity || 0)).toFixed(2) }}
                  </div>
               </div>

               <hr />

               <div class="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>${{ subtotal.toFixed(2) }}</span>
               </div>

               <div class="d-flex justify-content-between mb-2">
                  <span>Tax (10%)</span>
                  <span>${{ tax.toFixed(2) }}</span>
               </div>

               <div class="d-flex justify-content-between mb-2">
                  <span>Delivery Fee</span>
                  <span>${{ deliveryFee.toFixed(2) }}</span>
               </div>

               <hr />

               <div class="d-flex justify-content-between fw-bold mb-4">
                  <span>Total</span>
                  <span class="text-primary">${{ total.toFixed(2) }}</span>
               </div>
               <!-- QR Code -->
               <div class="text-center mb-4">
                  <h6 class="fw-bold">Scan to Pay</h6>
                  <img src="@/assets/image/QR.png" class="img-fluid rounded shadow-sm" style="max-height: 180px"
                     alt="QR Code" />
               </div>

               <!-- Upload -->
               <div class="mb-4">
                  <label class="form-label fw-semibold small">
                     Upload Payment Screenshot
                  </label>
                  <input type="file" class="form-control" accept="image/*" @change="handleFileUpload"
                     :class="{ 'is-invalid': errors.paymentImage }" />
                  <div class="invalid-feedback">
                     {{ errors.paymentImage }}
                  </div>
               </div>

               <!-- Button -->
               <button class="btn btn-primary w-100 py-3 fw-bold" @click="placeOrder">
                  Place Order
               </button>
            </div>
         </div>

      </div>

      <!-- SUCCESS MODAL -->
      <BaseModal v-if="isSuccessModalVisible" header="Success" @close="closeModalAndRedirect">
         <template #content>
            <div class="text-center py-4">
               <h4 class="fw-bold">Payment Received!</h4>
               <p class="text-muted">
                  Your order has been placed successfully.
               </p>
            </div>
         </template>

         <template #footer>
            <button class="btn btn-primary w-100" @click="closeModalAndRedirect">
               Continue Shopping
            </button>
         </template>
      </BaseModal>

   </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useCartStore } from "@/stores/cart"
import router from "@/router"
import BaseModal from "@/components/ui/BaseModal.vue"

const cartStore = useCartStore()

const isSuccessModalVisible = ref(false)
const deliveryType = ref("pickup")
const paymentImage = ref(null)

const form = ref({
   email: "",
   phone: "",
   firstName: "",
   lastName: "",
   address: "",
   mapUrl: ""
})

const errors = ref({})

onMounted(async () => {
   await cartStore.fetchCart()
})

const handleFileUpload = (event) => {
   const file = event.target.files[0]
   if (file) paymentImage.value = file
}

const subtotal = computed(() =>
   cartStore.items.reduce((total, item) => {
      const price = Number(item?.product?.price) || 0
      const qty = Number(item?.quantity) || 0
      return total + price * qty
   }, 0)
)

const tax = computed(() => subtotal.value * 0.08)
const deliveryFee = computed(() =>
   deliveryType.value === "delivery" ? 3 : 0
)
const total = computed(() =>
   subtotal.value + tax.value + deliveryFee.value
)

const validateForm = () => {
   errors.value = {}

   if (!form.value.email){
       errors.value.email = "Email is required"
   }
   if (!form.value.phone){
      errors.value.phone = "Phone is required"
   } 
   if (!form.value.firstName){
      errors.value.firstName = "First name is required"
   } 
   if (!form.value.lastName){
       errors.value.lastName = "Last name is required"
   }

   if (deliveryType.value === "delivery") {
      if (!form.value.address){
          errors.value.address = "Address is required"
      }
      if (!form.value.mapUrl){
         errors.value.mapUrl = "Map URL is required"
      } 
   }

   if (!paymentImage.value){
      errors.value.paymentImage = "Payment screenshot required"
   }
      

   return Object.keys(errors.value).length === 0
}

const placeOrder = async () => {
   if (!validateForm()) return

   const formData = new FormData()

   Object.keys(form.value).forEach((key) => {
      formData.append(key, form.value[key])
   })

   formData.append("deliveryType", deliveryType.value)
   formData.append("delivery_fee", deliveryFee.value)
   formData.append("total_amount", total.value)
   formData.append("payment_image", paymentImage.value)

   try {
      await cartStore.checkout(formData)
      isSuccessModalVisible.value = true
   } catch (error) {
      alert("Checkout failed.")
   }
}

const closeModalAndRedirect = () => {
   isSuccessModalVisible.value = false
   router.push("/")
}
</script>

<style scoped>
.checkout-page {
   min-height: 100vh;
}
</style>