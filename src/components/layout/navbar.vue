<template>
  <header>
  <nav class="navbar fixed-top p-0" style="z-index:1000;">
    
    <div class="container-fluid d-flex p-0">

      <!-- LEFT SIDE (RED) -->
      <div class="d-flex align-items-center px-4 py-2 text-black  bg-danger">
        <a class="navbar-brand text-black fw-bold me-4" href="#">Commerce_</a>

        <ul class="navbar-nav flex-row gap-3">
          <li class="nav-item"><a class="nav-link text-black" href="#">Shop</a></li>
          <li class="nav-item"><a class="nav-link text-black" href="#">Collections</a></li>
          <li class="nav-item"><a class="nav-link text-black" href="#">Blog</a></li>
          <li class="nav-item"><a class="nav-link text-black" href="#">Support</a></li>
        </ul>
      </div>

      <!-- RIGHT SIDE (BLUE) -->
      <div class="d-flex align-items-center gap-3 px-4 py-2  text-black">
        <button class="btn border-0 bg-transparent text-black">
          <i class="bi bi-search"></i>
        </button>

        <button class="btn border-0 bg-transparent text-black">
          <i class="bi bi-cart"></i> <small>0</small>
        </button>

        <button class="btn border-0 bg-transparent text-black">
          <i class="bi bi-person-fill"></i>
        </button>

        <button class="btn btn-light btn-sm">Login</button>
        <button class="btn btn-warning btn-sm">Logout</button>
      </div>

    </div>

  </nav>
</header>

</template>

<script setup></script>

<style lang="scss" scoped></style>
