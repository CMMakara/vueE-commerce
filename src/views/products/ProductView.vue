<script setup lang="ts">
import { allProductStore } from '@/stores/products';
import { onMounted, ref } from 'vue'


const allProducts = allProductStore();


onMounted(async () => {
   await allProducts.getAllProduct();
})


</script>

<template>
   
</template>

<style scoped></style>