<script setup lang="ts">
import ProductLayout from "@/components/layout/ProductLayout.vue";
import BaseCarousel from "@/components/ui/BaseCarousel.vue";
import Scroll from "@/components/ui/Scroll.vue";
import { allProductStore } from "@/stores/products";
import { onMounted, ref, watch } from "vue";

let filter = ref(false);

const allProducts = allProductStore();
const src = ref([
   "https://i.pinimg.com/736x/46/5a/f8/465af86bba6ee6899f4b6f3cf0a1978d.jpg",
   "https://i.pinimg.com/736x/3a/cd/f5/3acdf58d1dad75bdc82275056dceeb8a.jpg",
   "https://i.pinimg.com/736x/04/fe/2b/04fe2baefdf95ef61493c0a361681218.jpg",
]);

let page = ref(1);
let per_page = ref(8);
let sortDir = ref("desc");

onMounted(async () => {
   await allProducts.getAllProduct({
      page: page.value,
      per_page: per_page.value,
      sortDir: sortDir.value,
   });
});

function isFilter() {
   filter.value = !filter.value;
}
</script>

<template>
   <section>
      <div class="container-fluid px-5 mb-5">
         <div class="row bg-subtle rounded justify-content-between align-items-center py-5 px-5">
            <div class="col-4">
               <div class="d-flex gap-3 mb-4">
                  <span class="name-web">Tinh Luk Tam Jit</span>
                  <!-- <span class="badge bg-primary py-2 px-3"><i class="bi bi-graph-up"></i> Trending now</span> -->
               </div>
               <h1 class="text-light display-1 fw-bold">
                  <span class="buy-text">BUY</span> <span class="and-sign">&</span> <span class="sell-text">SELL</span> WHATEVER YOU WANT<span class="text-primary" style="scale: 1.5;">.</span>
               </h1>
               <p class="fs-5 py-3 text-light">
                  Discover curated pieces that blend comfort with contemporary
                  design. Up to 50% off selected items.
               </p>
               <div class="d-flex gap-3">
                  <router-link :to="{ name: 'shop' }" class="btn banner-btn d-flex align-items-center gap-2 fw-medium">
                     <span>Shop now</span>
                     <i class="bi bi-arrow-right"></i>
                  </router-link>
                  <router-link :to="{ name: 'shop' }" class="btn banner-btn d-flex align-items-center gap-2 fw-medium">
                     <span>Sell now</span>
                     <i class="bi bi-arrow-right"></i>
                  </router-link>
               </div>
            </div>
            <div class="col-6">
               <div class="rounded position-relative" style="width: 100%; height: 100%; background-color: #fff">
                  <div class="gif w-100 h-100">
                     <img class="object-cover img1" src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXBpaGRuenJta2h0Y2k0YTQwZDA5MzA1cGJ5c2d6dGo5NGV3MmlhOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8ccNBxbYlCE1yE73PJ/giphy.gif" alt="" />
                     <div class="text1">
                        <i class="bi bi-coin"></i>
                        <h4>You can sell anything you want in this website.</h4>
                     </div>
                     <img class="object-cover img2" src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnh6cTJtZ2JudHc3NGwxNGZjZGhpNXJuOHg4eTl2cTcwYmF0cTB5NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fAhOtxIzrTxyE/giphy.gif" alt="" />
                     <div class="text2">
                        <i class="bi bi-basket"></i>
                        <h4>You can buy anything you want in this website.</h4>
                     </div>
                  </div>
                  <div class="position-absolute top-0 end-0 w-100 h-100">
                     <!-- <img class="object-cover img3" src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWVwa2ZwZGoxczR5NzBrbTgya3BpMmw3aGRvazYzd3hnY3d2czU5byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/WlRJ5hIvwVnTfoiock/giphy.gif" alt="" /> -->
                     <img class="object-cover img4" src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDgyaGVkMHY0MWQyNjdpbGp0MDU1aDBleDI0ZTM4MGZuM2FzYTZmOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/PRtYgJzZ5OqFKRoHiM/giphy.gif" alt="" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>

   <section>
      <div class="container">
         <div class="p-3 border shadow-sm rounded overflow-hidden">
            <!-- <BaseCarousel :src="src" /> -->
            <!-- <Scroll/> -->
         </div>
      </div>
   </section>

   <section class="px-5" style="margin-top: 100px">
      <div class="container-fluid">
         <h2 class="text-black fw-bold" style="width: fit-content;">New Products</h2>
      </div>
   </section>

   <section class="mt-4">
      <ProductLayout :container="'container-fluid px-5'" :products="allProducts.allProducts.value" :filter="filter" :isFilter="isFilter" />
   </section>

   <div style="height: 1000px"></div>
</template>

<style scoped>
</style>
