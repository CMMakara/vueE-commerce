<template>
   <div class="card p-5">
      <div class="d-flex justify-content-between">
         <div class="skeleton-left">
            <div class="skeleton skeleton-small mb-5"></div>
            <div class="skeleton skeleton-title-lg mb-5"></div>
            <div class="skeleton skeleton-text mb-2"></div>
            <div class="skeleton skeleton-text w-50 mb-5"></div>
            <div class="d-flex gap-3">
               <div class="skeleton skeleton-btn"></div>
               <div class="skeleton skeleton-btn"></div>
            </div>
         </div>
         <div class="skeleton-right w-50">
            <div class="d-flex justify-content-center gap-3 flex-wrap skeleton-bg">
               <div class="d-flex gap-3 w-100">
                  <div class="skeleton box"></div>
                  <div class="skeleton box"></div>
               </div>
               <div class="d-flex gap-3 w-100">
                  <div class="skeleton box"></div>
                  <div class="skeleton box"></div>
               </div>
            </div>
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
   border-radius: 30px;
}

.box {
   width: 100%;
   height: 200px;
}

.skeleton-left {
   width: 30%;
}

.skeleton-bg {
   border-radius: 30px;
   padding: 15px;
   background-color: #dadada;
}

.skeleton-small {
   width: 150px;
   height: 30px;
}

.skeleton-title-lg {
   width: 100%;
   height: 150px;
}

.skeleton-text {
   width: 100%;
   height: 20px;
}

.skeleton-btn {
   width: 140px;
   height: 45px;
}

.skeleton-banner {
   width: 100%;
   height: 400px;
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