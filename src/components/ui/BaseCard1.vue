<script setup>

const product = defineProps({
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

</script>

<template>
   <div class="card" style="padding: 10px;">
      <img :src="image" class="card-img" alt="...">
      <div class="card-body p-0 pt-3">
         <h5 class="card-title">{{ title }}</h5>
         <p class="card-text">{{ description.substring(0, 50) }} {{ description.length > 50 ? '...' : '' }}</p>
         <div
            class="card-footer p-0 border-0 bg-transparent d-flex flex-sm-nowrap flex-md-wrap justify-content-between align-items-center gap-3">
            <h6 class="card-price badge fw-bold mb-0 bg-success bg-opacity-10 text-success p-2 px-3 border-success rounded-5 text-nowrap"
               style="font-size: 14px;">$ <span>{{ price }}</span></h6>
            <div class="d-xxs-block d-md-none bg-light bg-opacity-10 rounded-5" style="width: 3px; height: 30px;"></div>
            <div class="d-flex gap-2 w-100 justify-content-xs-end justify-content-md-between align-items-center">
               <a href="#" class="btn btn-sm bg-primary-subtle px-3 text-nowrap"><i class="bi bi-cart-fill"></i> Add to
                  cart</a>
               <a href="#" class="btn btn-sm btn-primary px-3 text-nowrap"><i class="bi bi-bag-fill"></i> Buy now</a>
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
