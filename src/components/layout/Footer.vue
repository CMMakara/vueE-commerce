<template>
   <footer class="footer-section text-light pt-5">

      <div class="container px-5">
         <div class="row gy-5">

            <!-- LEFT BRAND -->
            <div class="col-lg-4">

               <div class="d-flex align-items-center gap-2 mb-3">
                  <h1 class="fw-bold mb-0">Thin Luk Tam Jit</h1>
               </div>

               <p class="footer-desc">
                  Your one-stop destination for fashion, electronics,
                  and lifestyle essentials. Quality products,
                  unbeatable prices.
               </p>

               <ul class="footer-contact list-unstyled mt-4">
                  <li><i class="bi bi-geo-alt me-2 text-primary"></i>#86B Street 313, Phnom Penh</li>
                  <li><i class="bi bi-telephone me-2 text-primary"></i>+855 16 666 653</li>
                  <li><i class="bi bi-envelope me-2 text-primary"></i>support@thinhluktamjit.com</li>
               </ul>

               <div class="social-icons mt-4 d-flex gap-3">
                  <div class="icon"><i class="bi bi-instagram"></i></div>
                  <div class="icon"><i class="bi bi-twitter"></i></div>
                  <div class="icon"><i class="bi bi-facebook"></i></div>
                  <div class="icon"><i class="bi bi-youtube"></i></div>
               </div>

            </div>

            <!-- LINKS -->
            <div class="col-lg-2 col-md-6">
               <h6 class="footer-title">Shop</h6>
               <ul class="list-unstyled footer-links">
                  <li>New Arrivals</li>
                  <li>Best Sellers</li>
                  <li>Sale Items</li>
                  <li>Gift Cards</li>
                  <li>Men's Collection</li>
                  <li>Women's Collection</li>
               </ul>
            </div>

            <div class="col-lg-2 col-md-6">
               <h6 class="footer-title">Support</h6>
               <ul class="list-unstyled footer-links">
                  <li>Help Center</li>
                  <li>Track Your Order</li>
                  <li>Returns & Exchanges</li>
                  <li>Size Guide</li>
                  <li>Contact Us</li>
                  <li>Live Chat</li>
               </ul>
            </div>

            <div class="col-lg-2 col-md-6">
               <h6 class="footer-title">Company</h6>
               <ul class="list-unstyled footer-links">
                  <li>About ShopHub</li>
                  <li>Careers</li>
                  <li>Press</li>
                  <li>Blog</li>
                  <li>Affiliate Program</li>
                  <li>Sustainability</li>
               </ul>
            </div>

            <div class="col-lg-2 col-md-6">
               <h6 class="footer-title">Legal</h6>
               <ul class="list-unstyled footer-links">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Cookie Policy</li>
                  <li>Accessibility</li>
               </ul>
            </div>

         </div>

         <!-- BOTTOM BAR -->
         <div class="footer-bottom mt-5 pt-4 d-flex justify-content-between align-items-center flex-wrap">

            <p class="mb-2 mb-md-0 small">
               © 2026 ShopHub, Inc. All rights reserved.
            </p>

            <div class="payments d-flex align-items-center gap-2 flex-wrap">
               <span class="small opacity-75 me-2">We accept:</span>
               <span class="payment-badge">Visa</span>
               <span class="payment-badge">MC</span>
               <span class="payment-badge">PayPal</span>
               <span class="payment-badge">Apple Pay</span>
               <span class="payment-badge">Google Pay</span>
               <span class="payment-badge">Stripe</span>
            </div>

            <a href="#" class="back-top small">
               Back to top ↑
            </a>

         </div>

      </div>

   </footer>
</template>

<style scoped>
.footer-section {
   background-color: hsl(from var(--bs-primary) h s 10%);
   border-top-left-radius: 80px;
   border-top-right-radius: 80px;
   margin-top: 150px;
   padding-bottom: 40px;
}

.logo-circle {
   width: 38px;
   height: 38px;
   background: linear-gradient(135deg, #ff6a00, #ff0058);
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 50%;
   font-weight: bold;
   color: white;
}

.footer-desc {
   opacity: 0.75;
   font-size: 14px;
}

.footer-title {
   font-weight: 600;
   margin-bottom: 20px;
}

.footer-links li {
   margin-bottom: 10px;
   font-size: 14px;
   opacity: 0.75;
   cursor: pointer;
   transition: 0.3s;
}

.footer-links li:hover {
   opacity: 1;
   transform: translateX(4px);
}

.footer-contact li {
   font-size: 14px;
   margin-bottom: 10px;
   opacity: 0.8;
}

.social-icons .icon {
   width: 38px;
   height: 38px;
   background: rgba(255, 255, 255, 0.05);
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 50%;
   transition: 0.3s;
   cursor: pointer;
}

.social-icons .icon:hover {
   background: rgba(255, 255, 255, 0.15);
}

.footer-bottom {
   border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.payment-badge {
   background: rgba(255, 255, 255, 0.08);
   padding: 4px 10px;
   border-radius: 8px;
   font-size: 12px;
}

.back-top {
   text-decoration: none;
   color: white;
   opacity: 0.7;
}

.back-top:hover {
   opacity: 1;
}
</style>