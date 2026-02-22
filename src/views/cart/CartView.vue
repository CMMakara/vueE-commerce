<template>
   <!-- <BaseEmpty
    title="Your cart is empty"
    subtitle="Add some products to get started"
    buttonText="Continue Shopping"
    link="/"
    image="src/assets/image/empty.png"
  /> -->
   <div class="container py-5">
      <h2 class="fw-bold text-primary mb-4">Shopping Srul Tam Jit</h2>

      <div class="row g-4">

         <div class="col-lg-8">
            <div class="card shadow-sm border-0 rounded-4">

               <div class="card-header bg-light rounded-top-4">
                  <strong>1 item in cart</strong>
               </div>

               <div class="card-body">
                  <div class="d-flex align-items-center gap-3">

                     <img src="https://carconfigurator.ferrari.com/rt-assets/data/cars/296gtb/ui/splashpage.jpg"
                        class="rounded-3" style="width:80px;height:80px;object-fit:cover;" />
                     <div class="flex-grow-1">
                        <h6 class="mb-1 fw-semibold">
                           Premium Wireless Headphones
                        </h6>
                        <small class="text-muted">Electronics</small>

                        <div class="mt-2 d-flex align-items-center gap-2">
                           <button class="btn btn-outline-danger btn-sm">−</button>
                           <span class="fw-semibold">1</span>
                           <button class="btn btn-outline-primary btn-sm">+</button>
                        </div>
                     </div>

                     <div class="text-end">
                        <div class="fw-bold">$299.99</div>
                        <small class="text-muted text-decoration-line-through">
                           $399.99
                        </small>

                        <div class="mt-2">
                           <button class="btn btn-sm btn-outline-danger">
                              <i class="bi bi-trash"></i>
                           </button>
                        </div>
                     </div>

                  </div>
               </div>

            </div>
         </div>


         <div class="col-lg-4">
            <div class="card shadow-lg border-0 rounded-4">

               <div class="card-body">

                  <h5 class="fw-bold mb-4">Order Summary</h5>

                  <div class="d-flex justify-content-between mb-2">
                     <span class="text-muted">Subtotal</span>
                     <span>$299.99</span>
                  </div>

                  <div class="d-flex justify-content-between mb-2">
                     <span class="text-muted">Shipping</span>
                     <span class="text-success">Free</span>
                  </div>

                  <div class="d-flex justify-content-between mb-3">
                     <span class="text-muted">Tax</span>
                     <span>$24.00</span>
                  </div>

                  <hr>

                  <div class="d-flex justify-content-between fw-bold mb-4">
                     <span>Total</span>
                     <span>$323.99</span>
                  </div>

                  <RouterLink to="checkout">
                     <button class="btn btn-dark w-100 mb-2">
                        Proceed to Checkout <i class="bi bi-arrow-right"></i>
                     </button>

                  </RouterLink>


                  <RouterLink to="/">
                     <button class="btn btn-outline-secondary w-100">
                        Continue Shopping
                     </button>

                  </RouterLink>
                  <div class="mt-4 small text-muted">
                     <i class="bi bi-check-circle"></i> Secure checkout<br>
                     <i class="bi bi-check-circle"></i> Free returns within 30 days<br>
                     <i class="bi bi-check-circle"></i> 1-year warranty
                  </div>

               </div>

            </div>
         </div>

      </div>
   </div>

</template>

<script setup>
// import BaseEmpty from '@/components/ui/BaseEmpty.vue'
</script>