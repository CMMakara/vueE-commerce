<script setup>
import { reactive } from 'vue';

defineProps({
   src: {
      type: Array,
      required: true
   }
})

</script>

<template>
   <div id="carouselExampleDark" class="carousel slide" data-bs-ride="carousel">
      <div v-if="src.length >= 2" class="carousel-indicators">
         <button type="button" data-bs-target="#carouselExampleDark" v-for="(value, index) in src"
            :data-bs-slide-to="index" :class="index == 0 ? 'active' : ''" :aria-current="true"
            :aria-label="'slide' + index"></button>
      </div>
      <div class="carousel-inner" :style="src.length >= 2 ? 'height: calc(100% - 60px)' : 'height: 100%'">
         <div data-bs-interval="3000" class="carousel-item" :class="index === 0 ? 'active' : ''" v-for="(value, index) in src" :key="index">
            <div class="img"><img :src="value" alt="..." :style="src.length >= 2 ? 'height: calc(600px - 60px)' : 'height: 600px'"></div>
            <div class="carousel-caption">
               <slot name="caption"></slot>
            </div>
         </div>
      </div>
      <div v-if="src.length >= 2" class="carousel-control">
         <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
         </button>
         <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
         </button>
      </div>
   </div>
</template>

<style scoped>

.carousel {
   height: 600px;
   position: relative;
}

.carousel-caption {
   height: calc(600px - 60px);
   position: absolute;
   top: 0;
   bottom: 0;
   left: calc(5%);
   text-align: start;
   display: flex;
   flex-direction: column;
   justify-content: end;
}

.carousel-control-prev,
.carousel-control-next {
   width: fit-content;
   height: fit-content;
   padding: 10px 30px 5px;
   border-radius: 999px;
   position: relative;
   display: flex;
   align-items: center;
   touch-action: none;
   z-index: 2;
}

.carousel-control-prev:hover,
.carousel-control-prev:focus,
.carousel-control-next:hover,
.carousel-control-next:focus {
   background-color: hsl(from var(--bs-primary) h s l / 0.1);
}

.carousel-control {
   width: calc(100%);
   height: calc(100%);
   position: absolute;
   top: 0;
   display: flex;
   justify-content: end;
   align-items: end;
   gap: 20px;
   touch-action: none;
}

.carousel-inner {
   /* height: calc(100% - 60px); */
}

.carousel-inner img {
   width: 100%;
   aspect-ratio: 16 / 9;
   object-fit: cover;
   object-position: center;
}

@media screen and (max-width: 768px) and (min-width: 481px) {
   .carousel {
      height: 300px;
   }
}

</style>