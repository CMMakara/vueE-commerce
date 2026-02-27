<template>
   <div class="newsletter-wrapper p-5">

      <div class="row align-items-center">

         <!-- LEFT CONTENT -->
         <div class="col-lg-7 text-white">
            <span class="newsletter-badge">
               <i class="bi bi-envelope me-2"></i> Newsletter
            </span>

            <h1 class="fw-bold mt-4 display-5">
               Get Exclusive Deals <br />
               Straight to Your Inbox
            </h1>

            <p class="mt-3 opacity-75 fs-5">
               Subscribe and be the first to know about flash sales,
               new arrivals, and exclusive member offers. No spam, ever.
            </p>

            <div class="d-flex gap-4 mt-4 flex-wrap small">
               <span><i class="bi bi-check-circle text-success me-2"></i>10% off your first order</span>
               <span><i class="bi bi-check-circle text-success me-2"></i>Early access to sales</span>
               <span><i class="bi bi-check-circle text-success me-2"></i>Free shipping vouchers</span>
            </div>
         </div>

         <!-- RIGHT FORM -->
         <div class="col-lg-5 mt-4 mt-lg-0">
            <div class="subscribe-card p-4">

               <h5 class="fw-semibold text-white mb-4">
                  Subscribe Now
               </h5>

               <input type="text" class="form-control custom-input mb-3" placeholder="Your full name" />

               <input type="email" class="form-control custom-input mb-3" placeholder="Your email address" />

               <button class="btn subscribe-btn w-100 fw-semibold">
                  Get 10% Off Now
               </button>

               <p class="text-light small mt-3 mb-0">
                  By subscribing, you agree to our Privacy Policy.
                  Unsubscribe anytime.
               </p>

            </div>
         </div>

      </div>
   </div>
</template>

<style scoped>
.newsletter-wrapper {
   background: linear-gradient(135deg, hsl(from var(--bs-black) calc(h + 100) 50% l), hsl(from var(--bs-black) h s 10%));
   border-radius: 28px;
   color: white;
}

/* Badge */
.newsletter-badge {
   background: hsl(from var(--bs-orange) h s 20% / 0.5);
   color: var(--bs-orange);
   padding: 6px 16px;
   border-radius: 50px;
   font-size: 14px;
   display: inline-block;
}

/* Glass Form Card */
.subscribe-card {
   background: rgba(255, 255, 255, 0.05);
   backdrop-filter: blur(12px);
   border-radius: 20px;
   border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Custom Input */
.custom-input {
   background: rgba(255, 255, 255, 0.08);
   border: none;
   color: white;
   border-radius: 12px;
   padding: 12px;
}

.custom-input::placeholder {
   color: rgba(255, 255, 255, 0.5);
}

.custom-input:focus {
   background: rgba(255, 255, 255, 0.12);
   box-shadow: none;
   color: white;
}

/* Subscribe Button */
.subscribe-btn {
   background: var(--bs-primary);
   border: none;
   border-radius: 12px;
   color: var(--bs-black);
   transition: 0.3s;
   padding: 12px;
   &:hover {
      background: hsl(from var(--bs-primary) h s 10%);
      color: var(--bs-primary);
   }
}

</style>