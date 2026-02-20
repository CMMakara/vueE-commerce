<template>
  <div class="empty-cart-container">
    <div class="empty-cart-box">

      <div class="icon-wrapper">
        <img :src="image" alt="empty cart" class="icon-image" />
      </div>

      <h2 class="title">{{ title }}</h2>

      <p class="subtitle">
        {{ subtitle }}
      </p>

      <RouterLink :to="link" class="continue-btn">
        {{ buttonText }}
        <i class="bi bi-arrow-right ms-2"></i>
      </RouterLink>

    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Your cart is empty"
  },
  subtitle: {
    type: String,
    default: "Add some products to get started"
  },
  buttonText: {
    type: String,
    default: "Continue Shopping"
  },
  link: {
    type: String,
    default: "/"
  },
  image: {
    type: String,
    default: "/images/empty-cart.png" // default image path
  }
})
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
  margin-bottom: 20px;
}

.icon-image {
  width: 120px;
  height: auto;
  opacity: 0.7;
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