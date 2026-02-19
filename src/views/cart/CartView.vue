<template>
  <div class="empty-cart-container">
    <div class="empty-cart-box">
      
      
      <div class="icon-wrapper">
        <i class="bi bi-bag"></i>
      </div>

      <h2 class="title">Your cart is empty</h2>

      <p class="subtitle">
        Add some products to get started
      </p>

      <RouterLink to="/" class="continue-btn">
        Continue Shopping
        <i class="bi bi-arrow-right ms-2"></i>
      </RouterLink>

    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.empty-cart-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
}

.empty-cart-box {
  text-align: center;
}

.icon-wrapper {
  font-size: 60px;
  color: #c4c4c4;
  margin-bottom: 20px;
}

.title {
  font-weight: 600;
  margin-bottom: 10px;
}

.subtitle {
  color: #6c757d;
  margin-bottom: 25px;
}

.continue-btn {
  background: #0d0c22;
  color: white;
  padding: 12px 25px;
  border-radius: 10px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: 0.3s;
}

.continue-btn:hover {
  background: #1c1a3a;
  color: white;
}
</style>
