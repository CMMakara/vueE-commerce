<script setup>
import Footer from '@/components/layout/Footer.vue';
import Navbar from '@/components/layout/navbar.vue';


</script>

<template>
   <Navbar />
   <div style="height: 100px;"></div>
   <RouterView />
   <Footer></Footer>
</template>

<style scoped></style>