<template>
  <div class="container py-5">

    <div class="row g-5">

      <!-- LEFT: Product Images -->
      <div class="col-lg-7">
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
                <span class="fw-semibold" v-for="category in product.categories" :key="category.id">{{category.name }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between border-0 px-0 py-2">
                <span>Location</span>
                <span class="fw-semibold">{{ product.creator?.location || 'not location' }}</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

      <!-- RIGHT: Price / Actions -->
      <div class="col-lg-5">

        <div class="position-sticky" style="top: 100px;">

          <!-- Price Card -->
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

               <BaseButton v-for="(button, index) in buttons"
                :key="index" 
                :icon="button.icon"
                :btnStyle="button.btnStyle"
                :nameBtn="button.nameBtn"
                "
                />
             </div>

            <!-- Seller Info -->
            <div class="d-flex align-items-center gap-3 mt-4">
              <img :src="product.creator?.avatar" class="rounded-circle border"
                style="width: 60px; height: 60px; object-fit: cover;" />
              <div>
                <div class="fw-semibold">{{ product.creator?.name }}</div>
                <small class="text-muted">Active seller • {{  product.creator?.location || 'not location' }}</small>
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

      </div>

    </div>

  </div>
</template>

<script setup>
import api from "@/api/http";
import BaseButton from "@/components/ui/BaseButton.vue"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router";
const TYPE_BUTTON = Object.freeze({
   ADD_TO_CART: 'Add to cart',
   BUY_NOW: 'Buy now',
});
const buttons = [
   {
      nameBtn: TYPE_BUTTON.ADD_TO_CART,
      type: TYPE_BUTTON.ADD_TO_CART,
      icon: 'bi bi-cart-fill',
      btnStyle: 'custom px-3 py-3 rounded me-3 w-100 mb-2 '
   },
   {
      nameBtn: TYPE_BUTTON.BUY_NOW,
      type: TYPE_BUTTON.BUY_NOW,
      icon: 'bi bi-bag-fill',
      btnStyle: 'btn-primary px-3 py-3 rounded w-100'
   }
];


let route = useRoute()
let product = ref([])
onMounted(async(productId)=>{
  productId = route.params.id;
  const res = await api.get(`/api/products/${productId}`)
  product.value = res.data.data;
})

const quantity = ref(1)

const increaseQty = () => {
   alert(product.value)
}
const decreaseQty = () => { 
}

</script>

<style scoped>
.custom {
   background-color: hsl(from var(--bs-primary) h s l / 0.04);
   transition: all 0.3s ease;
   &:hover {
      background-color: hsl(from var(--bs-primary) h s l / 0.07);
   }
}
</style>