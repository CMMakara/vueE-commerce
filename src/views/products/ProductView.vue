<script setup lang="ts">
import ProductLayout from '@/components/layout/ProductLayout.vue';
import BaseCarousel from '@/components/ui/BaseCarousel.vue';
import { allProductStore } from '@/stores/products';
import { onMounted, ref, watch } from 'vue'

let filter = ref(false);

const allProducts = allProductStore();
const src = ref([
   'https://i.pinimg.com/736x/46/5a/f8/465af86bba6ee6899f4b6f3cf0a1978d.jpg',
   'https://i.pinimg.com/736x/3a/cd/f5/3acdf58d1dad75bdc82275056dceeb8a.jpg',
   'https://i.pinimg.com/736x/04/fe/2b/04fe2baefdf95ef61493c0a361681218.jpg'
])

let page = ref(1);
let per_page = ref(12);
let sortDir = ref('desc');


onMounted(async () => {
   await allProducts.getAllProduct({page: page.value, per_page: per_page.value, sortDir: sortDir.value});
})

function isFilter() {
   filter.value = !filter.value;
}

</script>

<template>

   <section>
      <div class="container-fluid  bg-dark p-5 mt-3 mb-5">
         <div class="row justify-content-center gap-5 py-5">
            <div class="col-4">
               <div class="d-flex gap-3">
                  <span class="badge bg-primary py-2 px-3">Tinh Luk Tam Jit</span>
                  <span class="badge bg-primary py-2 px-3"><i class="bi bi-graph-up"></i> Trending now</span>
               </div>
               <h1 class="text-primary display-1 fw-bold">
                  BUY & SELL WHATEVER YOU WANT
               </h1>
               <p class="text-white fs-5 py-3">
                  Discover curated pieces that blend comfort with contemporary design. Up to 50% off selected items.
               </p>
               <router-link :to="{name: 'shop'}" class="btn btn-primary w-100 py-3">Shop now</router-link>
            </div>
            <div class="col-6">
               <div class="rounded overflow-hidden" style="width: 100%; height: 100%; background-color: #fff;">
                  <div class="position-relative w-100 h-100">
                     <img class="position-absolute top-0 start-0 w-100 h-100 object-cover" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnh6cTJtZ2JudHc3NGwxNGZjZGhpNXJuOHg4eTl2cTcwYmF0cTB5NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fAhOtxIzrTxyE/giphy.gif" alt="">
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
   
   <section>
      <div class="container">
         <div class="p-3 border shadow-sm rounded">
            <BaseCarousel :src="src" />
         </div>
      </div>
   </section>

   <section class="bg-primary-subtle p-5" style="margin-block: 100px;">
      <div class="container">
         <h3 class="text-primary m-0 fw-bold">New Products</h3>
      </div>
   </section>

   <section class="mt-4">
      <ProductLayout 
      :products="allProducts.allProducts.value"
      :filter="filter"
      :isFilter="isFilter"
      />
   </section>

   <div style="height: 1000px;"></div>
</template>

<style scoped>
</style>