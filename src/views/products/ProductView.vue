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
   console.log(allProducts.allProducts.value);
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
               <h1 class="text-light display-2 fw-bold">
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
         <div class="p-3 services d-flex justify-content-between align-items-center rounded overflow-hidden">
            <!-- <BaseCarousel :src="src" /> -->
            <!-- <Scroll/> -->
            <div class="box d-flex align-items-center gap-4">
               <i class="bi bi-truck fs-1"></i>
               <div class="d-flex gap-2 flex-column">
                  <h5>Free Delivery</h5>
                  <p>On orders over $50</p>
               </div>
            </div>
            <div class="box d-flex align-items-center gap-4">
               <i class="bi bi-arrow-repeat fs-1"></i>
               <div class="d-flex gap-2 flex-column">
                  <h5>Easy Returns</h5>
                  <p>30-day free returns</p>
               </div>
            </div>
            <div class="box d-flex align-items-center gap-4">
               <i class="bi bi-shield-check fs-1"></i>
               <div class="d-flex gap-2 flex-column">
                  <h5>Secure Payment</h5>
                  <p>100% protected checkout</p>
               </div>
            </div>
            <div class="box d-flex align-items-center gap-4">
               <i class="bi bi-headset fs-1"></i>
               <div class="d-flex gap-2 flex-column">
                  <h5>24/7 Support</h5>
                  <p>Always here to help</p>
               </div>
            </div>
         </div>
      </div>
   </section>

   <section class="px-5 mt-5">
      <div class="container-fluid">
         <div class="d-flex justify-content-between align-items-center">
            <h2 class="text-black fw-bold" style="width: fit-content;">
               <i class="bi bi-fire"></i>
               <span> New Products</span>
            </h2>
            <router-link :to="{name: 'shop'}" class="btn btn-lg rounded explore fw-medium d-flex align-items-center gap-2">
               <span>Explore All</span>
               <i class="bi bi-arrow-right"></i>
            </router-link>
         </div>
      </div>
   </section>

   <section class="my-5">
      <ProductLayout :container="'container-fluid px-5'" :products="allProducts.allProducts.value" :filter="filter" :isFilter="isFilter" />
   </section>

</template>

<style scoped>

.bi-fire {
   padding: 5px 10px;
   border-radius: 20px;
   background-color: hsl(from var(--bs-orange) calc(h - 10) s l / 0.2);
   color: hsl(from var(--bs-orange) calc(h - 10) s l);
}

.explore {
   color: var(--bs-secondary);
   background-color: hsl(from var(--bs-primary) h s 80%);
   padding: 10px 20px;
   transition: all 0.4s ease;

   span {
      transition: all 0.4s ease;
      padding: 5px 10px;
   }

   i {
      transition: all 0.4s ease;
      padding: 5px 10px;
      border-radius: 50%;
      display: none;
      opacity: 0;
      visibility: hidden;
      -webkit-text-stroke: 1px var(--bs-black);
   }
   
   &:hover {
      color: var(--bs-primary);
      background-color: hsl(from var(--bs-primary) h s 10%);
      span {
         margin-right: 50px;
      }
      i {
         opacity: 1;
         display: inline-block;
         visibility: visible;
         background-color: hsl(from var(--bs-primary) h s 100%);
         color: var(--bs-black);
         animation: rotate 0.4s ease 1;
         -webkit-text-stroke: 1px var(--bs-black);
      }
   }
}

.services {
   box-shadow: 2px 2px 10px rgb(from var(--bs-black) r g b / 0.2);
   margin-block: 120px;
}

.box {
   width: fit-content;
   padding: 20px;
   border-radius: 20px;
   cursor: default;
   border: 1px solid transparent;
   transition: all 0.4s ease;

   p {
      font-size: 14px;
   }
   
   h1, h2, h3, h4, h5, h6, p {
      padding: 0;
      margin: 0;
   }

   i {
      padding: 0 15px;
      border-radius: 10px;
   }

   &:first-child {
      i {
         background-color: hsl(from var(--bs-yellow) h s l / 0.2);
         color: hsl(from var(--bs-yellow) h s l);
      }
   }
   &:nth-child(2) {
      i {
         background-color: hsl(from var(--bs-blue) h s l / 0.2);
         color: hsl(from var(--bs-blue) h s l);
      }
   }
   &:nth-child(3) {
      i {
         background-color: hsl(from var(--bs-indigo) calc(h + 10) s l / 0.2);
         color: hsl(from var(--bs-indigo) calc(h + 10) s l);
      }
   }
   &:last-child {
      i {
         background-color: hsl(from var(--bs-info) h s l / 0.2);
         color: hsl(from var(--bs-info) h s l);
      }
   }

   &:hover {
      &:first-child {
         background-color: hsl(from var(--bs-yellow) h s l / 0.2);
         border-color: hsl(from var(--bs-yellow) h s l)
      }
      &:nth-child(2) {
         background-color: hsl(from var(--bs-blue) h s l / 0.2);
         border-color: hsl(from var(--bs-blue) h s l)
      }
      &:nth-child(3) {
         background-color: hsl(from var(--bs-indigo) calc(h + 10) s l / 0.2);
         border-color: hsl(from var(--bs-indigo) calc(h + 10) s l)
      }
      &:last-child {
         background-color: hsl(from var(--bs-info) h s l / 0.2);
         border-color: hsl(from var(--bs-info) h s l)
      }
   }
}

</style>
