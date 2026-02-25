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
   await allProducts.getAllProduct({ page: page.value, per_page: per_page.value, sortDir: sortDir.value });
})

function isFilter() {
   filter.value = !filter.value;
}

</script>

<template>

   <section>
      <div class="container-fluid px-4 mb-5">
         <div class="row bg-subtle rounded justify-content-center gap-5 py-5">
            <div class="col-4">
               <div class="d-flex gap-3">
                  <span class="badge bg-primary py-2 px-3">Tinh Luk Tam Jit</span>
                  <span class="badge bg-primary py-2 px-3"><i class="bi bi-graph-up"></i> Trending now</span>
               </div>
               <h1 class="gradient display-1 fw-bold">
                  BUY & SELL WHATEVER YOU WANT
               </h1>
               <p class="fs-5 py-3">
                  Discover curated pieces that blend comfort with contemporary design. Up to 50% off selected items.
               </p>
               <div class="d-flex">
                  <router-link :to="{ name: 'shop' }" class="btn btn-primary w-100 py-3">Shop now</router-link>
               </div>
            </div>
            <div class="col-6">
               <div class="rounded" style="width: 100%; height: 100%; background-color: #fff;">
                  <div class="gif w-100 h-100">
                     <img class=" object-cover img1"
                        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXBpaGRuenJta2h0Y2k0YTQwZDA5MzA1cGJ5c2d6dGo5NGV3MmlhOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8ccNBxbYlCE1yE73PJ/giphy.gif"
                        alt="">
                     <div class="text1">
                        <i class="bi bi-coin"></i>
                        <h4>You can sell anything you want in this website.</h4>
                     </div>
                     <img class="object-cover img2"
                        src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnh6cTJtZ2JudHc3NGwxNGZjZGhpNXJuOHg4eTl2cTcwYmF0cTB5NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fAhOtxIzrTxyE/giphy.gif"
                        alt="">
                     <div class="text2">
                        <i class="bi bi-basket"></i>
                        <h4>You can buy anything you want in this website.</h4>
                     </div>
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
      <ProductLayout :products="allProducts.allProducts.value" :filter="filter" :isFilter="isFilter" />
   </section>

   <div style="height: 1000px;"></div>
</template>

<style scoped>
.bg-subtle {
   background-color: hsl(from var(--bs-primary) h s l / 0.1);
}

.gradient {
   background: hsl(from var(--bs-primary) h s l / 1);
   background: linear-gradient(45deg, var(--bs-danger) 0%, var(--bs-primary) 100%);
   background-clip: text;
   color: transparent;
   -webkit-text-fill-color: transparent;
   -webkit-background-clip: text;
}

.gif {
   display: grid;
   grid-template-columns: repeat(50%, 2);
   align-items: center;
   gap: 10px;
   padding: 10px;
   .text1, .text2 {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      padding: 20px;
      gap: 20px;
      i {
         border-radius: 20px;
         font-size: 50px;
      }
   }
   h1, h2, h3, h4 {
      width: 80%;
      font-weight: bolder;
   }
}

.img1, .img2 {
   width: 100%;
   height: 100%;
   border-radius: 20px;
}

.img1 {
   grid-column: 2;
}

.text1 {
   grid-row: 1;
   background-color: hsl(from var(--bs-red) h s l / 0.1);
   /* border: 1px solid hsl(from var(--bs-red) h s l / 1); */
   color: hsl(from var(--bs-red) h s l / 1);
}

.img2 {
   grid-column: 1;
}

.text2 {
   grid-column: 2;
   background-color: hsl(from var(--bs-green) h s l / 0.1);
   /* border: 1px solid hsl(from var(--bs-green) h s l / 1); */
   color: hsl(from var(--bs-green) h s calc(l + 10) / 1);
   i {
      color: hsl(from var(--bs-green) h s l / 1);
   }
}
</style>