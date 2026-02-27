<template>
      <div class="row g-4">

         <!-- LEFT CARD -->
         <div class="col-md-6">
            <div class="promo-card promo-tech p-5 text-white">
               <span class="badge-custom">New Collection</span>

               <h2 class="fw-bold mt-4">
                  Tech Essentials <br />
                  Up to 40% Off
               </h2>

               <p class="mt-3 opacity-75">
                  The latest gadgets and accessories for the modern lifestyle.
                  Limited time offer.
               </p>

               <button class="btn explore">
                  <span>Explore Now</span>
                  <i class="bi bi-arrow-right"></i>
               </button>
            </div>
         </div>

         <!-- RIGHT CARD -->
         <div class="col-md-6">
            <div class="promo-card promo-fashion p-5 text-white">
               <span class="badge-custom light">Season Sale</span>

               <h2 class="fw-bold mt-4">
                  Fashion Forward <br />
                  Buy 2 Get 1 Free
               </h2>

               <p class="mt-3 opacity-75">
                  Mix and match your favourite styles. Free item
                  automatically added at checkout.
               </p>

               <button class="btn shop">
                  <span>Shop Fashion</span>
                  <i class="bi bi-arrow-right"></i>
               </button>
            </div>
         </div>

         <!-- BOTTOM CARD -->
         <div class="col-12">
            <div class="promo-card promo-member p-5 d-flex justify-content-between align-items-center flex-wrap">

               <div>
                  <span class="member-label">FREE MEMBERSHIP</span>
                  <h3 class="fw-bold mt-3">
                     Join ShopHub Plus & Save an Extra 15%
                  </h3>
               </div>
               
               <div class="text-end">
                  <p class="opacity-75 mb-3">
                     Exclusive member discounts, early access to sales,
                     and free express shipping.
                  </p>
                  
                  <button class="btn join">
                     <span>Join Free</span> 
                     <i class="bi bi-arrow-right"></i>
                  </button>
               </div>

            </div>
         </div>

      </div>
</template>

<style scoped>

.promo-card {
  border-radius: 24px;
  min-height: 260px;
  transition: all 0.3s ease;
}

.promo-card:hover {
  transform: translateY(-5px);
}

/* Tech Gradient */
.promo-tech {
  background: linear-gradient(135deg, hsl(from var(--bs-indigo) h s 10%), hsl(from var(--bs-indigo) h s 40%));
}

/* Fashion Gradient */
.promo-fashion {
  background: linear-gradient(90deg, hsl(from var(--bs-orange) calc(h - 30) s l), hsl(from var(--bs-orange) h s 60%));
}

/* Membership */
.promo-member {
  background: linear-gradient(135deg, hsl(from var(--bs-primary) h s 20%), hsl(from var(--bs-secondary) h s 50%));
  border-radius: 24px;
  color: white;
}

/* Badge */
.badge-custom {
  background: rgba(255, 255, 255, 0.15);
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 14px;
}

.badge-custom.light {
  background: rgba(255, 255, 255, 0.25);
}

.member-label {
  font-size: 13px;
  letter-spacing: 1px;
  color: hsl(from var(--bs-primary) h s 80%);
  font-weight: 600;
}

button {
   color: hsl(from var(--bs-white) h s l);
   display: flex;
   align-items: center;
   gap: 10px;
   font-weight: bold;
   transition: all 0.4s ease;

   span {
      /* margin-inline: 10px; */
      padding: 5px 20px;
      transition: all 0.4s ease;
   }
   i {
      padding: 5px 10px;
      display: none;
      visibility: hidden;
      opacity: 0;
      background-color: var(--bs-white);
      color: var(--bs-black);
      border-radius: 50%;
      -webkit-text-stroke: 1px;
      transition: all 0.4s ease;
   }

   &:hover {

      span {
         margin-right: 20px;
      }
      
      i {
         display: block;
         visibility: visible;
         opacity: 1;
         animation: rotate 0.3s ease 1;
      }
   }

   &.explore {
      background-color: hsl(from var(--bs-indigo) h s l);
   }
   &.shop {
      background-color: hsl(from var(--bs-orange) h s l);
   }
   &.join {
      background-color: hsl(from var(--bs-primary) h s 20%);
   }
}

@keyframes rotate {
   from {
      rotate: 0;
   }
   to {
      rotate: 360deg;
   }
}

</style>