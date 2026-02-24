<template>
  <BaseEmpty
    v-if="cartStore.isEmpty && !cartStore.loading"
    title="Your cart is empty"
    subtitle="Add some products to get started"
    buttonText="Continue Shopping"
    link="/"
    image="/src/assets/image/empty.png"
  />

  <!-- Cart Page -->
  <div v-else class="container py-5">
    <h2 class="fw-bold text-primary mb-4">
      Shopping Srul Tam Jit
    </h2>

    <div class="row g-4">

      <!-- Cart Items -->
      <div class="col-lg-8">
        <div class="card shadow-sm border-0 rounded-4">

          <div class="card-header bg-light rounded-top-4">
            <strong>
              {{ cartStore.totalItems }} item(s) in cart
            </strong>
          </div>

          <div class="card-body">

            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="d-flex align-items-center gap-3 mb-4"
            >
              <img
                :src="item.image"
                class="rounded-3"
                style="width:80px;height:80px;object-fit:cover;"
              />

              <div class="flex-grow-1">
                <h6 class="mb-1 fw-semibold">
                  {{ item.name }}
                </h6>

                <small class="text-muted">
                  {{ item.category }}
                </small>

                <div class="mt-2 d-flex align-items-center gap-2">
                  <button
                    class="btn btn-outline-danger rounded-1"
                    @click="cartStore.decreaseQty(item)"
                  >
                    −
                  </button>

                  <span class="fw-semibold">
                    {{ item.quantity }}
                  </span>

                  <button
                    class="btn btn-outline-primary rounded-1"
                    @click="cartStore.increaseQty(item)"
                  >
                    +
                  </button>
                </div>
              </div>

              <div class="text-end">
                <div class="fw-bold">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </div>

                <div class="mt-2">
                  <button
                    class="btn btn-outline-danger rounded-1"
                    @click="cartStore.removeItem(item.id)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <!-- Order Summary -->
      <div class="col-lg-4">
        <div class="card shadow-lg border-0 rounded-4">
          <div class="card-body">

            <h5 class="fw-bold mb-4">
              Order Summary
            </h5>

            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Subtotal</span>
              <span>
                ${{ cartStore.subtotal.toFixed(2) }}
              </span>
            </div>

            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Shipping</span>
              <span class="text-success">Free</span>
            </div>

            <div class="d-flex justify-content-between mb-3">
              <span class="text-muted">Tax (8%)</span>
              <span>
                ${{ cartStore.tax.toFixed(2) }}
              </span>
            </div>

            <hr />

            <div class="d-flex justify-content-between fw-bold mb-4">
              <span>Total</span>
              <span>
                ${{ cartStore.total.toFixed(2) }}
              </span>
            </div>

            <RouterLink to="/checkout">
              <button class="btn btn-dark w-100 mb-2">
                Proceed to Checkout
                <i class="bi bi-arrow-right"></i>
              </button>
            </RouterLink>

            <RouterLink to="/">
              <button class="btn btn-outline-secondary w-100">
                Continue Shopping
              </button>
            </RouterLink>

            <div class="mt-4 small text-muted">
              <i class="bi bi-check-circle"></i> Secure checkout <br />
              <i class="bi bi-check-circle"></i> Free returns within 30 days <br />
              <i class="bi bi-check-circle"></i> 1-year warranty
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useCartStore } from "@/stores/cart";
import BaseEmpty from "@/components/ui/BaseEmpty.vue";

const cartStore = useCartStore();

onMounted(() => {
  cartStore.fetchCart();
});
</script>