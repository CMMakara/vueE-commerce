<template>
   <section class="py-5 bg-light font-sans">
      <div class="container text-center">
         <p class="text-orange font-weight-bold text-uppercase small mb-1 tracking-wider">Customer Reviews</p>
         <h2 class="display-5 font-weight-bold text-dark mb-3 fw-bold">What Our Customers Say</h2>

         <div class="d-flex justify-content-center align-items-center mb-5">
            <div class="text-warning h5 mb-0 mr-2">★★★★★</div>
            <p class="mb-0 text-muted">
               <strong class="text-dark">4.9</strong> based on 24,000+ reviews
            </p>
         </div>

         <div class="row">
            <div v-for="review in reviews" :key="review.id" class="col-12 col-md-6 col-lg-3 mb-4">
               <div class="card h-100 border-0 shadow-sm p-4 text-left custom-card">

                  <div class="text-warning mb-3">
                     <span v-for="star in 5" :key="star" :class="star > review.rating ? 'text-light-gray' : ''">★</span>
                  </div>

                  <p class="text-secondary mb-4 flex-grow-1">
                     "{{ review.text }}"
                  </p>

                  <div class="mb-4">
                     <span class="badge-custom">
                        Bought: {{ review.product }}
                     </span>
                  </div>

                  <hr class="my-4 opacity-25">

                  <div class="d-flex align-items-center">
                     <div :class="['avatar-circle mr-3', review.colorClass]">
                        {{ review.initials }}
                     </div>
                     <div>
                        <h6 class="mb-0 font-weight-bold">{{ review.name }}</h6>
                        <small class="text-muted">Verified Buyer • {{ review.date }}</small>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div class="mt-5 d-flex flex-wrap justify-content-center gap-4 text-muted small">
            <span class="mx-3"><i class="text-success mr-1">✓</i> All reviews are from verified purchases</span>
            <span class="mx-3"><i class="text-success mr-1">✓</i> We never edit or remove negative feedback</span>
            <span class="mx-3"><i class="text-success mr-1">✓</i> Powered by Trustpilot</span>
         </div>
      </div>
   </section>
</template>

<script setup>
const reviews = [
   {
      id: 1,
      name: "Sarah Johnson",
      initials: "SJ",
      colorClass: "bg-pink",
      rating: 5,
      text: "Absolutely love the quality of everything I've ordered. The delivery was super fast and the packaging was beautiful.",
      product: "Wireless Headphones",
      date: "2 days ago"
   },
   {
      id: 2,
      name: "Marcus Williams",
      initials: "MW",
      colorClass: "bg-blue",
      rating: 5,
      text: "Best online shopping experience I've had. The smartwatch I ordered looks even better in person. Customer support was helpful.",
      product: "Smart Watch Series X",
      date: "1 week ago"
   },
   {
      id: 3,
      name: "Emily Chen",
      initials: "EC",
      colorClass: "bg-purple",
      rating: 5,
      text: "The sneakers fit perfectly and the quality is outstanding. I was a bit nervous ordering shoes online but the guide was spot on.",
      product: "Air Foam Sneakers",
      date: "3 days ago"
   },
   {
      id: 4,
      name: "James Rodriguez",
      initials: "JR",
      colorClass: "bg-teal",
      rating: 4,
      text: "Great selection and competitive prices. The backpack I ordered is extremely well made and fits all my gear perfectly.",
      product: "Urban Explorer Backpack",
      date: "5 days ago"
   }
];
</script>

<style scoped>
/* Matching the image's specific colors */
.text-orange {
   color: #f97316;
}

.tracking-wider {
   letter-spacing: 0.1rem;
}

/* Custom Review Card */
.custom-card {
   border-radius: 15px;
   transition: transform 0.2s;
}

/* The Orange "Bought" Badge */
.badge-custom {
   background-color: #fff7ed;
   color: #c2410c;
   padding: 6px 14px;
   border-radius: 50px;
   font-size: 0.75rem;
   font-weight: 700;
   border: 1px solid #ffedd5;
}

/* Avatar Styles */
.avatar-circle {
   width: 45px;
   height: 45px;
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   color: white;
   font-weight: bold;
}

/* Custom Avatar Colors */
.bg-pink {
   background-color: #d81b60;
}

.bg-blue {
   background-color: #1e88e5;
}

.bg-purple {
   background-color: #8e24aa;
}

.bg-teal {
   background-color: #00897b;
}

.text-light-gray {
   color: #e0e0e0;
}

.gap-4 {
   gap: 1.5rem;
}
</style>