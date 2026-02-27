<template>
   <div class="card" style="padding: 10px; cursor: pointer">
      <div class="skeleton skeleton-img"></div>

      <div class="card-body p-0 pt-3">
         <div class="skeleton skeleton-title"></div>
         <div class="skeleton skeleton-text"></div>
         <div class="skeleton skeleton-price"></div>

         <div class="d-flex justify-content-between mt-3">
            <div class="skeleton skeleton-btn"></div>
            <div class="skeleton skeleton-btn"></div>
         </div>
      </div>

   </div>
</template>

<style scoped>
.skeleton {
   background: linear-gradient(90deg,
         #eeeeee 25%,
         #dddddd 50%,
         #eeeeee 75%);
   background-size: 200% 100%;
   animation: shimmer 1.5s infinite;
   border-radius: 10px;
}

.skeleton-img {
   width: 100%;
   height: 300px;
   border-radius: 22px;
}

.skeleton-title {
   width: 70%;
   height: 20px;
   margin-bottom: 10px;
}

.skeleton-text {
   width: 100%;
   height: 15px;
   margin-bottom: 15px;
}

.skeleton-price {
   width: 60px;
   height: 25px;
}

.skeleton-btn {
   width: 100px;
   height: 35px;
}

@keyframes shimmer {
   0% {
      background-position: -200% 0;
   }

   100% {
      background-position: 200% 0;
   }
}
</style>