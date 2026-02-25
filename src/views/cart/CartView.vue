<template>
  <!-- Empty Cart -->
  <BaseEmpty
    v-if="items.length === 0"
    title="Your Cart is Empty"
    subtitle="Start adding products to your cart!"
    buttonText="Continue Shopping"
    link="/"
    image="/src/assets/image/empty.png"
  />

  <!-- Cart Page -->
  <div class="container py-5 bg-body-secondary rounded" v-else>
    <h2 class="fw-bold text-primary mb-5 text-center text-lg-start">Shopping Cart</h2>

    <div class="row g-4">
      <!-- Cart Items -->
      <div class="col-lg-8 col-12">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
          <div
            v-for="item in items"
            :key="item.id"
            class="d-flex align-items-center justify-content-between gap-3 mb-4 cart-item"
          >
            <div class="d-flex align-items-center gap-3 flex-grow-1">
              <img
                :src="item.product?.image"
                class="rounded-3 border"
                style="width:90px;height:90px;object-fit:cover;"
              />
              <div>
                <h6 class="mb-1 fw-semibold">{{ item.product?.title }}</h6>
                <small class="text-muted">{{ item.product?.category }}</small>
                <div class="mt-2 d-flex align-items-center gap-2">
                  <button
                    @click="decrement(item)"
                    class="btn btn-outline-danger btn-sm rounded-1 p-0"
                    style="width:32px;height:32px;"
                  >−</button>
                  <span class="px-3">{{ item.quantity }}</span>
                  <button
                    @click="increment(item)"
                    class="btn btn-outline-primary btn-sm rounded-1 p-0"
                    style="width:32px;height:32px;"
                  >+</button>
                </div>
              </div>
            </div>
            <div class="text-end">
              <div class="fw-bold mb-2">${{ (item.product?.price * item.quantity).toFixed(2) }}</div>
              <button
                @click="confirmDelete(item)"
                class="btn btn-outline-danger btn-sm rounded-1 p-2 shadow-sm"
                title="Remove Item"
              >
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
            <span>${{ subtotal }}</span>
          </div>

          <div class="d-flex justify-content-between mb-3">
            <span class="text-muted">Shipping</span>
            <span class="text-success">Free</span>
          </div>

          <div class="d-flex justify-content-between mb-3">
            <span class="text-muted">Tax</span>
            <span>${{ tax }}</span>
          </div>

          <hr class="my-3"/>

          <div class="d-flex justify-content-between fw-bold mb-4">
            <span>Total</span>
            <span>${{ total }}</span>
          </div>

          <RouterLink to="/checkout">
            <button class="btn btn-primary w-100 mb-3 fw-bold shadow-sm rounded-pill summary-btn">
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
    <BaseModal
      v-if="modalVisible"
      :header="modalHeader"
      @close="modalVisible = false"
    >
      <template #content>
        <p>Are you sure you want to remove <strong>{{ itemToDelete?.product?.title }}</strong> from your cart?</p>
      </template>
      <template #footer>
        <button class="btn btn-secondary me-2" @click="modalVisible = false">Cancel</button>
        <button class="btn btn-danger" @click="deleteItem()">Yes, Delete</button>
      </template>
    </BaseModal><BaseModal v-if="modalVisible" @close="modalVisible = false">
  <template #content>
    <div class="text-center py-4">
      <div class="delete-icon-wrapper mb-4">
        <i class="bi bi-trash3 text-danger"></i>
      </div>
      
      <h3 class="modal-title-bold mb-2">Remove from Cart?</h3>
      <p class="text-muted px-4">
        Are you sure you want to remove <strong>{{ itemToDelete?.product?.title }}</strong>? 
        This action cannot be undone.
      </p>
    </div>
  </template>

  <template #footer>
    <div class="d-flex w-100 gap-3">
      <button class="btn btn-light flex-grow-1 py-2" @click="modalVisible = false">
        Cancel
      </button>
      <button class="btn btn-dark-delete flex-grow-1 py-2" @click="deleteItem()">
        Delete Item
      </button>
    </div>
  </template>
</BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "@/stores/cart";
import BaseEmpty from "@/components/ui/BaseEmpty.vue";
import BaseModal from "@/components/ui/BaseModal.vue";

const cartStore = useCartStore();
const items = ref([]);

// Modal 
const modalVisible = ref(false);
const itemToDelete = ref(null);
const modalHeader = ref("Confirm Deletion");

// Fetch cart 
onMounted(async () => {
  await cartStore.fetchCart();
  items.value = cartStore.items.map(item => ({
    ...item,
    quantity: item.quantity || 1
  }));
});

// Incremen
function increment(item) {
  item.quantity++;
}

// Decrement 
function decrement(item) {
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    confirmDelete(item);
  }
}

// modal
function confirmDelete(item) {
  itemToDelete.value = item;
  modalVisible.value = true;
}

// Delete item
function deleteItem() {
  items.value = items.value.filter(i => i.id !== itemToDelete.value.id);
  modalVisible.value = false;
}

const subtotal = computed(() =>
  items.value.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0).toFixed(2)
);
const tax = computed(() => (parseFloat(subtotal.value) * 0.075).toFixed(2));
const total = computed(() => (parseFloat(subtotal.value) + parseFloat(tax.value)).toFixed(2));
</script>

<style scoped>
/* The Backdrop */
.modal-mask {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px); /* Modern frosted glass effect */
}

/* The Modal Container */
.modal-container {
  border-radius: 20px; /* Softer corners */
  border: none;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 1.5rem;
}

/* Delete Icon Animation */
.delete-icon-wrapper {
  width: 64px;
  height: 64px;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 1.5rem;
}

.modal-title-bold {
  font-weight: 700;
  letter-spacing: -0.5px;
  color: #1f2937;
}

/* Modern Buttons */
.btn-dark-delete {
  background: #4f4f50;
  color: white;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-dark-delete:hover {
  background: #dc2626; /* Changes to red only on hover */
  transform: translateY(-1px);
}

.btn-light {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-weight: 600;
}
</style>