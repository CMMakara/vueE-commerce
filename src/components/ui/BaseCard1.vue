<script setup>
import { UseAuthStore } from '@/stores/auth';
import BaseButton from './BaseButton.vue';
import router from '@/router';
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';

const TYPE_BUTTON = Object.freeze({
   ADD_TO_CART: 'Add to cart',
   BUY_NOW: 'Buy now',
});

const cart = useCartStore();

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
let auth= UseAuthStore()
let qty = ref(0);

async function handleButton(id, title, type) {
   if(!auth.isLogin){
      return router.push('/login');
   }
   if (type === TYPE_BUTTON.ADD_TO_CART) {
      // alert(id + ' ' + title + ' ' + type);
         // qty.value += 1
         
      try{
         const formData = new FormData()
         formData.append('product_id', id);
         formData.append('qty' , qty.value+=1)
         cart.addToCart(id, qty.value, formData)
      }
      catch(error){
         console.log(error)
      }
      
   }
   if (type === TYPE_BUTTON.BUY_NOW) {
      router.push({name : 'checkout'})
      try{
         const formData = new FormData()
         formData.append('product_id', id);
         formData.append('qty' , qty.value+=1)
         cart.addToCart(id, qty.value, formData)
      }
      catch(error){
         console.log(error)
      }
   };
}

</script>

<template>
   <div class="card" style="padding: 10px; cursor: pointer" @click="$router.push({name: 'productDetail' ,params: {id}})">
      <img :src="image" class="card-img" alt="...">
      <div class="card-body p-0 pt-3">
         <h5 class="card-title">{{ title.substring(0, 20) }} {{ title.length > 20 ? '...' : '' }} {{ !title ? 'No title' : '' }}</h5>
         <p class="card-text">{{ description.substring(0, 20) }} {{ description.length > 20 ? '...' : '' }} {{ !description ? 'No description' : '' }}</p>
         <div
            class="card-footer p-0 border-0 bg-transparent d-flex flex-wrap justify-content-between align-items-center gap-3">
            <h6 class="card-price badge fw-bold mb-0 bg-primary bg-opacity-10 text-primary p-2 px-3 border-success rounded-5 text-nowrap"
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
@import '../../assets/css/style.css'
</style>
