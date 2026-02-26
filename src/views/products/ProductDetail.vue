<template>
  <div class="container py-5">
    <div class="row g-5">

      <!-- LEFT COLUMN -->
      <div class="col-lg-7">
        <template v-if="loading">
          <div class="skeleton skeleton-image"></div>
          <div class="skeleton skeleton-title mt-3"></div>
          <div class="skeleton skeleton-text mt-2"></div>
          <div class="skeleton skeleton-text mt-2"></div>
          <div class="skeleton skeleton-text mt-2" style="height: 60px;"></div>
        </template>
        <template v-else>
          <!-- Main Image -->
          <div class="position-relative mb-3 rounded-4 overflow-hidden shadow-sm">
            <img :src="product.image" class="w-100" style="height: 500px; object-fit: cover;" />
            <span class="badge bg-danger position-absolute top-0 start-0 m-3 px-3 py-2">
              {{ product.condition }}
            </span>
          </div>

          <!-- Description & Details -->
          <div class="mb-4">
            <div class="p-4 bg-white shadow-sm rounded-4 mb-3">
              <h5 class="fw-bold mb-2">Description</h5>
              <p class="text-muted">{{ product.description }}</p>
            </div>

            <div class="p-4 bg-white shadow-sm rounded-4">
              <h5 class="fw-bold mb-3">Product Details</h5>
              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between border-0 px-0 py-2">
                  <span>Category</span>
                  <span class="fw-semibold" v-for="category in product.categories" :key="category.id">{{ category.name
                    }}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between border-0 px-0 py-2">
                  <span>Location</span>
                  <span class="fw-semibold">{{ product.creator?.location || 'not location' }}</span>
                </li>
              </ul>
            </div>
          </div>
        </template>
      </div>

      <!-- RIGHT COLUMN -->
      <div class="col-lg-5">
        <template v-if="loading">
          <div class="skeleton skeleton-small mb-3"></div>
          <div class="skeleton skeleton-title mb-3"></div>
          <div class="skeleton skeleton-text mb-2"></div>
          <div class="skeleton skeleton-button mb-2"></div>
          <div class="skeleton skeleton-button mb-2"></div>
          <div class="skeleton skeleton-small mt-3"></div>
        </template>
        <template v-else>
          <div class="position-sticky" style="top: 100px;">
            <div class="bg-white rounded-4 shadow-sm p-4 mb-4">

              <!-- Stock & Sold -->
              <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="badge bg-success">In Stock</span>
              </div>

              <!-- Product Title -->
              <h4 class="fw-bold mb-3">{{ product.title }}</h4>

              <!-- Price Section -->
              <div class="bg-light rounded-3 p-3 mb-4">
                <div class="d-flex align-items-end gap-2">
                  <h2 class="fw-bold text-danger mb-0">$ {{ product.price }}</h2>
                </div>
              </div>

              <!-- Quantity Selector -->
              <div class="mb-4">
                <label class="fw-semibold mb-2 d-block">Quantity</label>
                <div class="d-flex align-items-center rounded-pill bg-light px-3 py-1"
                  style="width: 130px; justify-content: space-between;">
                  <button class="btn btn-sm btn-outline-dark rounded-circle p-0" style="width: 28px; height: 28px;"
                    @click="decreaseQty">−</button>
                  <span class="fw-semibold">{{ quantity }}</span>
                  <button class="btn btn-sm btn-outline-dark rounded-circle p-0" style="width: 28px; height: 28px;"
                    @click="increaseQty">+</button>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="d-flex gap-2 flex-wrap">
                <BaseButton v-for="(button, index) in buttons" :key="index" :icon="button.icon"
                  :btnStyle="button.btnStyle" :nameBtn="button.nameBtn"
                  :action="() => handleButton(product.id, product.title, button.type)" />
              </div>

              <!-- Seller Info -->
              <div class="d-flex align-items-center gap-3 mt-4">
                <img :src="product.creator?.avatar" class="rounded-circle border"
                  style="width: 60px; height: 60px; object-fit: cover;" />
                <div>
                  <div class="fw-semibold">{{ product.creator?.name }}</div>
                  <small class="text-muted">Active seller • {{ product.creator?.location || 'not location' }}</small>
                </div>
              </div>

              <!-- Extra Info -->
              <div class="mt-4 small text-muted border-top pt-3">
                ✔ Secure Payment<br>
                ✔ Fast Delivery<br>
                ✔ 7 Days Return
              </div>

            </div>
          </div>
        </template>
      </div>

    </div>

    <!-- RELATED PRODUCTS -->
    <div v-if="loading" class="row g-4 mt-5">
      <div class="col-12 col-md-6 col-lg-4" v-for="n in 6" :key="n">
        <div class="skeleton-card p-3 rounded-4">
          <div class="skeleton skeleton-image" style="height: 200px;"></div>
          <div class="skeleton skeleton-title mt-2"></div>
          <div class="skeleton skeleton-text"></div>
          <div class="skeleton skeleton-text" style="width: 60%;"></div>
          <div class="skeleton skeleton-button mt-3" style="height: 40px;"></div>
        </div>
      </div>
    </div>

    <template v-else>
      <div class="row g-4 mt-5">
        <div class="col-12 col-md-6 col-lg-4" v-for="product in productStore.allProducts.value" :key="product.id">
          <BaseCard1 :id="product.id" :title="product.title" :image="product.image" :description="product.description"
            :price="product.price"></BaseCard1>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import api from "@/api/http";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseCard1 from "@/components/ui/BaseCard1.vue";
import router from "@/router";
import { UseAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { allProductStore } from "@/stores/products";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const TYPE_BUTTON = Object.freeze({
  ADD_TO_CART: 'Add to cart',
  BUY_NOW: 'Buy now',
});

const buttons = [
  { nameBtn: TYPE_BUTTON.ADD_TO_CART, type: TYPE_BUTTON.ADD_TO_CART, icon: 'bi bi-cart-fill', btnStyle: 'custom px-3 py-3 rounded me-3 w-100 mb-2' },
  { nameBtn: TYPE_BUTTON.BUY_NOW, type: TYPE_BUTTON.BUY_NOW, icon: 'bi bi-bag-fill', btnStyle: 'btn-primary px-3 py-3 rounded w-100' }
];

const route = useRoute();
const product = ref({});
const loading = ref(true);
const quantity = ref(1);
const productStore = allProductStore();
const auth = UseAuthStore();
const cart = useCartStore();
const productId = route.params.id;

const increaseQty = () => quantity.value++;
const decreaseQty = () => { if (quantity.value > 1) quantity.value--; };

watch(() => route.params.id, (newId) => loadProduct(newId));

onMounted(() => loadProduct(productId));

async function loadProduct(id) {
  loading.value = true;
  try {
    const res = await api.get(`/api/products/${id}`);
    product.value = res.data.data;

    await productStore.getAllProduct({ page: 1, per_page: 6, sortDir: "desc" });
    const lastPage = productStore.lastPage.value || 1;
    const randomPage = Math.floor(Math.random() * lastPage) + 1;
    await productStore.getAllProduct({ page: randomPage, per_page: 6, sortDir: "desc" });
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
}

async function handleButton(id, title, type) {
  if (!auth.isLogin) return router.push('/login');
  try {
    const formData = new FormData();
    formData.append('product_id', id);
    formData.append('qty', quantity.value);

    await cart.addToCart(id, quantity.value, formData);
    if (type === TYPE_BUTTON.BUY_NOW) router.push({ name: 'checkout' });
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.custom {
  background-color: hsl(from var(--bs-primary) h s l / 0.04);
  transition: all 0.3s ease;
}

.custom:hover {
  background-color: hsl(from var(--bs-primary) h s l / 0.07);
}

.skeleton {
  position: relative;
  overflow: hidden;
  background-color: #e2e2e2;
  border-radius: 8px;
}

.skeleton::after {
  content: '';
  position: absolute;
  top: 0;
  left: -150px;
  height: 100%;
  width: 150px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    left: -150px;
  }

  100% {
    left: 100%;
  }
}

.skeleton-image {
  height: 500px;
  border-radius: 12px;
}

.skeleton-title {
  height: 28px;
  width: 60%;
  border-radius: 6px;
}

.skeleton-subtitle {
  height: 20px;
  width: 40%;
  border-radius: 6px;
}

.skeleton-text {
  height: 15px;
  width: 100%;
  border-radius: 4px;
}

.skeleton-small {
  height: 25px;
  width: 50%;
  border-radius: 6px;
}

.skeleton-button {
  height: 50px;
  width: 100%;
  border-radius: 8px;
}

.skeleton-card {
  background-color: #f4f4f4;
  overflow: hidden;
  position: relative;
}
</style>