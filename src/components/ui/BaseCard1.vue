<script setup>

const product = defineProps({
   isFilter: Boolean,
   id: Number,
   title: String,
   image: String,
   creator: {
      id: Number,
      name: String,
      avatar: String,
   },
   condition: String,
   description: String,
   price: Number,
   categories: Array,
})

const emit = defineEmits(['addToCart']);

</script>

<template>
   <div class="card" style="padding: 10px;">
      <img :src="image" class="card-img" alt="...">
      <div class="card-body p-0 pt-3">
         <h5 class="card-title">{{ title }}</h5>
         <p class="card-text">{{ description.substring(0, 50) }} {{ description.length > 50 ? '...' : '' }}</p>
         <div
            class="card-footer p-0 border-0 bg-transparent d-flex flex-wrap justify-content-between align-items-center gap-3">
            <h6 class="card-price badge fw-bold mb-0 bg-success bg-opacity-10 text-success p-2 px-3 border-success rounded-5 text-nowrap"
               style="font-size: 14px;">$ <span>{{ price.toFixed(2) }}</span></h6>
            <div class="d-flex w-100 flex-wrap gap-2 justify-content-between align-items-center">
               <button @click="emit('addToCart', id)" :class="isFilter ? 'w-100' : ''" class="btn btn-sm bg-primary-subtle px-3 text-nowrap"><i class="bi bi-cart-fill"></i> Add to
                  cart</button>
               <button :class="isFilter ? 'w-100' : ''" class="btn btn-sm btn-primary px-3 text-nowrap"><i class="bi bi-bag-fill"></i> Buy now</button>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
.card {
   background-color: color-mix(in srgb, var(--bs-primary) 5%, rgb(255, 255, 255) 2%);
   clip-path: path("MZ");
}
</style>
