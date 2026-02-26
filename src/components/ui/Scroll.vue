<script setup></script>

<template>
   <div class="scroll w-100 bg-primary">
      <div class="scroller w-100">
         <div class="box">a</div>
         <div class="box">b</div>
         <div class="box">c</div>

         <div aria-hidden="true" class="box">a</div>
         <div aria-hidden="true" class="box">b</div>
         <div aria-hidden="true" class="box">c</div>
      </div>
   </div>
</template>

<style scoped>

.scroll {
   display: flex;
   gap: 20px;
}

.scroller {
   display: flex;
   gap: 20px;
   will-change: transform;
   animation: scrolling 5s linear infinite;
}

.box {
   width: 100px;
   height: 100px;
   background-color: red;
}

@keyframes scrolling {
   0% {
      transform: translateX(0);
   }
   100% {
      transform: translateX(-100%);
   }
}



</style>