<template>
  <div class="card h-100 shadow-sm border-0 product-card">
    <div class="position-relative overflow-hidden">
      <img
        src="https://png.pngtree.com/background/20250709/original/pngtree-anime-girl-cityscape-night-view-beautiful-picture-image_16695392.jpg"
        class="card-img-top product-img" alt="product" />
      <span class="badge bg-danger position-absolute top-0 start-0 m-2">
        -25%
      </span>
    </div>
    <button class="btn btn-primary position-absolute  translate-middle-x cart-btn" style="right: 0; bottom: 10px;">
      <i class="bi bi-cart-plus"></i>
    </button>
    <div class="card-body d-flex flex-column">
      <!-- Title -->
      <h6 class="card-title fw-bold mb-1">Anime Night Girl</h6>
      <!-- Description -->
      <p class="card-text text-muted small flex-grow-1">
        Beautiful anime artwork with night city background.
      </p>
      <!-- Price -->
      <div class="d-flex align-items-center gap-2">
        <span class="fw-bold text-primary fs-5">$29.99</span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.product-card {
  border-radius: 16px;
  transition: 0.3s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
}

.product-img {
  height: 250px;
  object-fit: cover;
  transition: 0.4s ease;
}

.product-card:hover .product-img {
  transform: scale(1.05);
}

.cart-btn {
  bottom: -50px;
  opacity: 0;
  transition: 0.3s ease;
}

.product-card:hover .cart-btn {
  bottom: 20px;
  opacity: 1;
}
</style>
