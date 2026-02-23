<script setup>
import BaseButton from './BaseButton.vue';

const TYPE_BUTTON = Object.freeze({
   ADD_TO_CART: 'Add to cart',
   BUY_NOW: 'Buy now',
});

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
});

const buttons = [
   {
      nameBtn: TYPE_BUTTON.ADD_TO_CART,
      type: TYPE_BUTTON.ADD_TO_CART,
      icon: 'bi bi-cart-fill',
      btnStyle: 'custom'
   },
   {
      nameBtn: TYPE_BUTTON.BUY_NOW,
      type: TYPE_BUTTON.BUY_NOW,
      icon: 'bi bi-bag-fill',
      btnStyle: 'btn-primary'
   }
];

/**
 * ! This handleButton function is handle on [Add to cart, Buy now] action
 * @param {number} id      - [Id product]
 * @param {string} title   - [Title product]
 * @param {string} type    - [Add to cart, Buy now]
 */

function handleButton(id, title, type) {
   if (type === TYPE_BUTTON.ADD_TO_CART) alert(id + ' ' + title + ' ' + type);
   if (type === TYPE_BUTTON.BUY_NOW) alert(id + ' ' + title + ' ' + type);
}

</script>

<template>
   <div class="card" style="padding: 10px;" @click="$router.push({name: 'shop'})">
      <img :src="image" class="card-img" alt="...">
      <div class="card-body p-0 pt-3">
         <h5 class="card-title">{{ title.substring(0, 20) }} {{ title.length > 20 ? '...' : '' }} {{ !title ? 'No title' : '' }}</h5>
         <p class="card-text">{{ description.substring(0, 50) }} {{ description.length > 50 ? '...' : '' }} {{ !description ? 'No description' : '' }}</p>
         <div
            class="card-footer p-0 border-0 bg-transparent d-flex flex-wrap justify-content-between align-items-center gap-3">
            <h6 class="card-price badge fw-bold mb-0 bg-success bg-opacity-10 text-success p-2 px-3 border-success rounded-5 text-nowrap"
               style="font-size: 14px;">$ <span>{{ price.toFixed(2) }}</span></h6>
            <div class="d-flex w-100 flex-wrap gap-2 justify-content-between align-items-center">
               <BaseButton v-for="(button, index) in buttons"
               :key="index" 
               :isFilter="isFilter"
               :icon="button.icon"
               :btnStyle="button.btnStyle"
               :nameBtn="button.nameBtn"
               :action="() => {handleButton(id, title, button.type)}"
               />
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>

.custom {
   background-color: hsl(from var(--bs-primary) h s l / 0.04);
   transition: all 0.3s ease;
   &:hover {
      background-color: hsl(from var(--bs-primary) h s l / 0.07);
   }
}

.card {
   background-color: color-mix(in srgb, var(--bs-primary) 5%, rgb(255, 255, 255) 2%);
   /* clip-path: path("MZ"); */
}
</style>
