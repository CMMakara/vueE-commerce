<template>
   <div class="container py-5 checkout-page mt-3 rounded bg-body-secondary">
      <RouterLink to="/cart" class="text-decoration-none text-primary fw-bold mb-4 d-inline-block">
         <i class="bi bi-arrow-left"></i> Back to Cart
      </RouterLink>

      <h1 class="display-5 fw-bold text-primary mb-5">Checkout</h1>

      <div class="row g-5">
         <div class="col-lg-8">
            <div class="card shadow-sm border-0 p-4 mb-4 rounded-4">
               <h5 class="fw-bold mb-4"><i class="bi bi-person-lines-fill me-2"></i>Contact Information</h5>
               <div v-if="pageLoading" class="row g-3">
                  <div class="col-md-6">
                     <div class="skeleton-input"></div>
                  </div>
                  <div class="col-md-6">
                     <div class="skeleton-input"></div>
                  </div>
               </div>
               <div v-else class="row g-3">
                  <div class="col-md-6">
                     <label class="form-label small fw-semibold">Email</label>
                     <input v-model="form.email" type="email" class="form-control"
                        :class="{ 'is-invalid': errors.email }" />
                     <div class="invalid-feedback">{{ errors.email }}</div>
                  </div>
                  <div class="col-md-6">
                     <label class="form-label small fw-semibold">Phone Number</label>
                     <input v-model="form.phone" type="text" class="form-control"
                        :class="{ 'is-invalid': errors.phone }" />
                     <div class="invalid-feedback">{{ errors.phone }}</div>
                  </div>
               </div>
            </div>

            <div class="card shadow-sm border-0 p-4 rounded-4">
               <h5 class="fw-bold mb-4"><i class="bi bi-truck me-2"></i>Shipping Method</h5>
               <div v-if="pageLoading">
                  <div class="skeleton-input mb-4" style="height: 100px;"></div>
               </div>
               <div v-else>
                  <div class="mb-4 p-3 bg-light rounded-3 border">
                     <h6 class="fw-bold mb-3 small text-uppercase text-secondary">Choose Delivery Type</h6>
                     <div class="d-flex gap-4">
                        <div class="form-check">
                           <input class="form-check-input" type="radio" value="pickup" v-model="deliveryType"
                              id="typePickup" />
                           <label class="form-check-label fw-semibold" for="typePickup">Pickup at Store</label>
                        </div>
                        <div class="form-check">
                           <input class="form-check-input" type="radio" value="delivery" v-model="deliveryType"
                              id="typeDelivery" />
                           <label class="form-check-label fw-semibold" for="typeDelivery">Home Delivery (+$3.00)</label>
                        </div>
                     </div>
                  </div>

                  <div class="row g-3">
                     <div class="col-md-6">
                        <label class="form-label small fw-semibold">First Name</label>
                        <input v-model="form.firstName" type="text" class="form-control"
                           :class="{ 'is-invalid': errors.firstName }" />
                     </div>
                     <div class="col-md-6">
                        <label class="form-label small fw-semibold">Last Name</label>
                        <input v-model="form.lastName" type="text" class="form-control" />
                     </div>
                     <template v-if="deliveryType === 'delivery'">
                        <div class="col-12 mt-4">
                           <label class="form-label small fw-semibold">Full Address</label>
                           <textarea v-model="form.address" class="form-control" rows="2"
                              placeholder="House No, Street, Village..."></textarea>
                        </div>
                        <div class="col-12 mt-3">
                           <label class="form-label small fw-semibold"><i class="bi bi-geo-alt-fill text-danger"></i>
                              Google Map URL</label>
                           <input v-model="form.mapUrl" type="url" class="form-control"
                              placeholder="Paste link here..." />
                        </div>
                     </template>
                  </div>
               </div>
            </div>
         </div>

         <div class="col-lg-4">
            <div class="card shadow-lg border-0 rounded-4 overflow-hidden">
               <div class="bg-primary p-3 text-white text-center">
                  <h5 class="fw-bold mb-0">Order Summary</h5>
               </div>
               <div class="p-4">
                  <div v-if="pageLoading">
                     <div class="skeleton-input mb-3" style="height: 100px;"></div>
                  </div>
                  <div v-else>
                     <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted">Sub-total:</span>
                        <span>${{ subtotal.toFixed(2) }}</span>
                     </div>
                     <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted">Tax (10%):</span>
                        <span>${{ taxAmount.toFixed(2) }}</span>
                     </div>
                     <div class="d-flex justify-content-between mb-3 text-danger">
                        <span class="text-muted">Delivery Fee:</span>
                        <span>+${{ deliveryFee.toFixed(2) }}</span>
                     </div>
                     <hr />
                     <div class="d-flex justify-content-between mb-4 mt-2">
                        <span class="fw-bold fs-5">Total Pay:</span>
                        <span class="fw-bold fs-5 text-primary">${{ total.toFixed(2) }}</span>
                     </div>

                     <div class="text-center p-3 border rounded-4 bg-light mb-4 shadow-inner">
                        <h6 class="fw-bold mb-2 small">SCAN TO PAY</h6>
                        <img src="@/assets/image/QR.png" class="img-fluid rounded-3"
                           style="width:160px; height:160px; object-fit: contain;" />
                     </div>

                     <div class="mb-4">
                        <label class="form-label fw-bold small">Upload Receipt</label>
                        <input type="file" class="form-control" @change="handleFileUpload"
                           :class="{ 'is-invalid': errors.paymentImage }" />
                        <div class="invalid-feedback">{{ errors.paymentImage }}</div>
                     </div>

                     <button class="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow" :disabled="loading"
                        @click="placeOrder">
                        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                        {{ loading ? 'Processing...' : 'Place Order Now' }}
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <BaseModal v-if="isSuccessModalVisible" header="Order Success" @close="closeModalAndRedirect">
         <template #content>
            <div class="text-center py-5 px-3">
               <div
                  class="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4 shadow-lg"
                  style="width: 70px; height: 70px;">
                  <i class="bi bi-check-lg fs-1"></i>
               </div>
               <h3 class="fw-bold">Transaction Complete!</h3>
               <div class="bg-light p-3 rounded-3 mt-3 border border-dashed">
                  <small class="text-uppercase text-secondary fw-bold">Total Paid</small>
                  <div class="fs-4 fw-bold text-primary">${{ orderTotalDisplay.toFixed(2) }}</div>
               </div>
            </div>
         </template>
         <template #footer>
            <div class="w-100 px-4 pb-4">
               <button class="btn btn-primary w-100 py-2 fw-bold shadow-sm" @click="closeModalAndRedirect">Done</button>
            </div>
         </template>
      </BaseModal>
   </div>
</template>



<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { useCartStore } from "@/stores/cart";
import router from "@/router";
import BaseModal from "@/components/ui/BaseModal.vue";

const cartStore = useCartStore();
const loading = ref(false);
const pageLoading = ref(true);
const isSuccessModalVisible = ref(false);
const deliveryType = ref("delivery");
const orderTotalDisplay = ref(0);
const paymentImage = ref(null);

const form = reactive({ 
   email: "", 
   phone: "", 
   firstName: "", 
   lastName: "", 
   address: "", 
   mapUrl: "" 
});

const errors = reactive({});

onMounted(async () => {
   await cartStore.fetchCart();
   pageLoading.value = false;
});

const subtotal = computed(() => {
   return cartStore.items.reduce((acc, item) => {
      return acc + (parseFloat(item.product?.price || 0) * parseInt(item.qty || 0));
   }, 0);
});

const taxAmount = computed(() => subtotal.value * 0.1);
const deliveryFee = computed(() => deliveryType.value === "delivery" ? 3.00 : 0);
const total = computed(() => subtotal.value + taxAmount.value + deliveryFee.value);

function handleFileUpload(event) {
   const file = event.target.files[0];
   if (file) { 
      paymentImage.value = file; 
      errors.paymentImage = null; 
   }
}

async function placeOrder() {
   Object.keys(errors).forEach(key => delete errors[key]);

   if (!form.email || !form.phone || !form.firstName || !paymentImage.value) {
      if (!form.email) errors.email = "Required";
      if (!form.phone) errors.phone = "Required";
      if (!form.firstName) errors.firstName = "Required";
      if (!paymentImage.value) errors.paymentImage = "Receipt Required";
      return;
   }

   orderTotalDisplay.value = total.value;
   loading.value = true;

   const formData = new FormData();
   formData.append("email", form.email);
   formData.append("phone", form.phone);
   formData.append("first_name", form.firstName);
   formData.append("last_name", form.lastName || "");
   formData.append("is_delivery", deliveryType.value === 'delivery' ? "1" : "2");
   formData.append("address", deliveryType.value === 'delivery' ? form.address : 'Pickup');
   formData.append("google_map_url", deliveryType.value === 'delivery' ? form.mapUrl : '');
   formData.append("delivery_fee", deliveryFee.value);
   formData.append("total_amount", orderTotalDisplay.value.toFixed(2));
   formData.append("payment_image", paymentImage.value);

   try {
      await cartStore.checkout(formData); 
      
      isSuccessModalVisible.value = true;
   } catch (error) {
      console.error("Checkout error:", error);
      alert(error.response?.data?.message || "Checkout Failed. Please try again.");
   } finally {
      loading.value = false;
   }
}

function closeModalAndRedirect() {
   isSuccessModalVisible.value = false;
   router.push("/"); 
}
</script>

<style scoped>
.skeleton-input {
   background: #e9ecef;
   height: 38px;
   border-radius: 8px;
   animation: pulse 1.5s infinite;
}

@keyframes pulse {
   0% {
      opacity: 1;
   }

   50% {
      opacity: 0.5;
   }

   100% {
      opacity: 1;
   }
}

.border-dashed {
   border-style: dashed !important;
}

.shadow-inner {
   box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>