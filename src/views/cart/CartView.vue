<template>
<<<<<<< HEAD
  <!-- Empty Cart -->
  <BaseEmpty
    v-if="cartStore.items.length === 0"
=======
   <!-- Empty Cart -->
   <!-- <BaseEmpty
    v-if="items.length === 0"
>>>>>>> 703487d9150e071191a7d24322cb5c2bc744bd59
    title="Your Cart is Empty"
    subtitle="Start adding products to your cart!"
    buttonText="Continue Shopping"
    link="/"
    image="/src/assets/image/empty.png"
  />

<<<<<<< HEAD
  <!-- Cart Page -->
  <div class="container py-5 bg-body-secondary rounded" v-else>
    <h2 class="fw-bold text-primary mb-5 text-center text-lg-start">
      Shopping Cart
    </h2>
=======
   <!-- Cart Page -->
   <div class="container py-5 bg-body-secondary rounded">
      <h2 class="fw-bold text-primary mb-5 text-center text-lg-start">
         Shopping Cart
      </h2>
>>>>>>> 703487d9150e071191a7d24322cb5c2bc744bd59

      <div class="row g-4">
         <!-- Cart Items -->
         <div class="col-lg-8 col-12">
            <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
               <div v-for="item in cartStore.items" :key="item.id"
                  class="d-flex align-items-center justify-content-between gap-3 mb-4 cart-item">
                  <div class="d-flex align-items-center gap-3 flex-grow-1">
                     <img :src="item.product?.image" class="rounded-3 border"
                        style="width: 90px; height: 90px; object-fit: cover" />
                     <div>
                        <h6 class="mb-1 fw-semibold">
                           {{ item.product?.title }}
                        </h6>
                        <small class="text-muted">{{
                           item.product?.category
                        }}</small>
                        <div class="mt-2 d-flex align-items-center gap-2">
                           <button @click="handleQTY(QTY.DECREMENT, item)" class="btn btn-outline-danger btn-sm rounded-1 p-0"
                              style="width: 32px; height: 32px">
                              −
                           </button>
                           <input type="number" name="" id="" v-model="item.qty">
                           <!-- <span class="px-3">{{ item.qty }}</span> -->
                           <button @click="handleQTY(QTY.INCREMENT, item)" class="btn btn-outline-primary btn-sm rounded-1 p-0"
                              style="width: 32px; height: 32px">
                              +
                           </button>
                        </div>
                     </div>
                  </div>
                  <div class="text-end">
                     <div class="fw-bold mb-2">
                        ${{ (item.product?.price * item.qty).toFixed(2) }}
                     </div>
                     <button @click="confirmDelete(item)"
                        class="btn btn-outline-danger btn-sm rounded-1 p-2 shadow-sm" title="Remove Item">
                        <i class="bi bi-trash"></i>
                     </button>
                  </div>
               </div>
            </div>
         </div>

         <!-- Order Summary -->
         <div class="col-lg-4 col-12">
            <div class="card border-0 shadow-lg rounded-4 p-4 bg-white summary-card">
               <h5 class="fw-bold mb-4">Order Summary</h5>

               <div class="d-flex justify-content-between mb-3">
                  <span class="text-muted">Subtotal</span>
                  <span>${{ cartStore.total.toFixed(2) }}</span>
               </div>

               <div class="d-flex justify-content-between mb-3">
                  <span class="text-muted">Shipping</span>
                  <span class="text-success">Free</span>
               </div>

               <div class="d-flex justify-content-between mb-3">
                  <span class="text-muted">Tax</span>
                  <span>${{ (cartStore.total * 0.1).toFixed(2) }}</span>
               </div>

               <hr class="my-3" />

               <div class="d-flex justify-content-between fw-bold mb-4">
                  <span>Total</span>
                  <span>${{
                     (cartStore.total + cartStore.total * 0.1).toFixed(2)
                  }}</span>
               </div>

               <RouterLink to="/checkout">
                  <button class="btn btn-primary w-100 mb-1 fw-bold shadow-sm rounded-pill summary-btn">
                     Proceed to Checkout
                  </button>
               </RouterLink>

               <RouterLink to="/">
                  <button class="btn btn-outline-secondary w-100 rounded-pill summary-btn">
                     Continue Shopping
                  </button>
               </RouterLink>
            </div>
         </div>
      </div>

      <!-- Base Modal -->
      <!-- <BaseModal v-if="modalVisible" :header="modalHeader" @close="modalVisible = false">
         <template #content>
            <p>
               Are you sure you want to remove
               <strong>{{ itemToDelete?.product?.title }}</strong> from your
               cart?
            </p>
         </template>
         <template #footer>
            <button class="btn btn-secondary me-2" @click="modalVisible = false">
               Cancel
            </button>
            <button class="btn btn-danger text-white" @click="deleteItem()">
               Yes, Delete
            </button>
         </template>
      </BaseModal> -->
      <BaseModal v-if="modalVisible" @close="modalVisible = false">
         <template #content>
            <div class="text-center py-4">
               <div class="delete-icon-wrapper mb-4">
                  <i class="bi bi-trash3 text-danger fs-1"></i>
               </div>

               <h3 class="modal-title-bold mb-2">Remove from Cart?</h3>
               <p class="text-muted px-4">
                  Are you sure you want to remove
                  <strong>{{ itemToDelete?.product?.title }}</strong>? This action cannot be undone.
               </p>
            </div>
         </template>

         <template #footer>
            <div class="d-flex w-100 gap-3">
               <button class="btn btn-light flex-grow-1 py-2" @click="modalVisible = false">
                  Cancel
               </button>
               <button class="btn btn-danger text-white fw-bold flex-grow-1 py-2" @click="deleteItem()">
                  Delete Item
               </button>
            </div>
         </template>
      </BaseModal>
   </div>

</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useCartStore } from "@/stores/cart";
import BaseEmpty from "@/components/ui/BaseEmpty.vue";
import BaseModal from "@/components/ui/BaseModal.vue";
import api from "@/api/http";
import { notify } from "@/util/toast";

const cartStore = useCartStore();
// Modal
const modalVisible = ref(false);
const itemToDelete = ref({});
const modalHeader = ref("Confirm Deletion");

// Fetch cart
onMounted(async () => {
   await cartStore.fetchCart();
});


const QTY = Object.freeze({
   INCREMENT: 'INCREMENT',
   DECREMENT: 'DECREMENT'
})


async function handleQTY(type, item) {
   if (type === QTY.INCREMENT) {
      try {
         await cartStore.addToCart(item.product.id, item.qty += 1);
      } catch(error) {
         console.log(error);
      }
      return;
   }
   if (type === QTY.DECREMENT) {

      item.qty -= 1;
      if (item.qty < 1) {
         confirmDelete(item);
         cartStore.fetchCart();
         return;
      }
      try {
         await cartStore.addToCart(item.product.id, item.qty);
      } catch (error) {
         console.error('Failed to update cart:', error.response?.data || error)
      }
      return;
   }
}

// modal
function confirmDelete(item) {
   itemToDelete.value = item;
   console.log(item);
   modalVisible.value = true;
}
function closeModal() {
   modalVisible.value = false;
}

// Delete item
async function deleteItem() {
   await api.delete(`/api/carts/${itemToDelete.value.id}`);
   closeModal();
   cartStore.fetchCart();
   notify.sucess("Delete Successful!");
}
</script>

<style scoped></style>
