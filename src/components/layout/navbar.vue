<template>
  <header>
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light shadow-sm rounded-pill position-fixed top-0 start-50 translate-middle-x mt-3 px-4 py-2"
      style="z-index: 1000">
      <a class="navbar-brand fw-bold" href="#">Commerce_</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item"><a class="nav-link" href="#">Shop</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Collections</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Blog</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Support</a></li>
        </ul>
      </div>

      <div class="d-flex align-items-center gap-2">
        <button class="btn border-0 bg-transparent"><i class="bi bi-search"></i></button>
        <button class="btn border-0 bg-transparent"><i class="bi bi-cart"></i> <small>0</small></button>
        <button class="btn border-0 bg-transparent"><i class="bi bi-person-fill"></i></button>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn border-0 bg-transparent">login</button>
        <button class="btn border-0 bg-transparent">Logout</button>
      </div>
    </nav>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped></style>
