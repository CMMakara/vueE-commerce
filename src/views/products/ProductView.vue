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
      <div class="container">
         <div class="p-3 border shadow-sm" style="background-color: #f7f7f7; border-radius: 40px;">
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