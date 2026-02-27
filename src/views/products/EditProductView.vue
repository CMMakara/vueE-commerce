<template>
  <div class="min-vh-100 bg-white py-5">
    <div class="container" style="max-width: 800px">

      <!-- Skeleton Loader -->
      <div v-if="isPageLoading">
        <div class="skeleton skeleton-title mb-4"></div>
        <div class="skeleton skeleton-image mb-4"></div>
        <div class="skeleton skeleton-input mb-3" v-for="n in 3" :key="n"></div>
      </div>

      <!-- Actual Form -->
      <div v-else>
        <div class="d-flex justify-content-between align-items-center mb-5">
          <router-link :to="{ name: 'seller' }" class="btn btn-link text-dark p-0 text-decoration-none fw-bold">← Back</router-link>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-outline-dark border-0 fw-medium" @click="resetForm">Clear Draft</button>
            <button :disabled="isloading" class="btn bg-primary text-white rounded px-4" @click="handleSubmit">
              <span v-if="isloading" class="spinner-border spinner-border-sm text-light me-2" role="status"></span>
              <span>{{ isloading ? "Loading..." : "Edit Product" }}</span>
            </button>
          </div>
        </div>

        <form @submit.prevent="handleSubmit">
          <!-- Title & Price -->
          <div class="mb-5 text-center">
            <input type="text" v-model="product.title" class="title-input" placeholder="Name your Title..." />
            <small class="text-danger" v-if="errors.title">{{ errors.title }}</small>

            <div class="d-flex justify-content-center align-items-center mt-3 gap-2">
              <span class="fs-4 text-muted">$</span>
              <input type="number" v-model.number="product.price" class="price-input" placeholder="0.00" step="0.01" />
            </div>
            <small class="text-danger" v-if="errors.price">{{ errors.price }}</small>
          </div>

          <!-- Image Upload -->
          <div class="upload-zone mb-5">
            <input type="file" @change="handleImageUpload" class="file-hidden" id="fileInput" accept="image/*" />
            <label for="fileInput" class="upload-label" :style="imagePreview ? `background-image: url(${imagePreview})` : ''">
              <div v-if="!imagePreview" class="text-center">
                <div class="upload-icon mb-2">✦</div>
                <p class="mb-0 small fw-bold text-uppercase tracking-widest">Add Primary Visual</p>
              </div>
              <div v-else class="preview-overlay">
                <span class="badge bg-white text-dark rounded-pill shadow-sm">Change Image</span>
              </div>
            </label>
            <small class="text-danger" v-if="errors.imageFile">{{ errors.imageFile }}</small>
          </div>

          <!-- Condition & Category -->
          <div class="row g-4 mb-5">
            <div class="col-md-6">
              <label class="section-label">Condition</label>
              <div class="d-flex gap-2 flex-wrap mt-2">
                <button v-for="opt in ['New', 'Vintage', 'Sample']" :key="opt" type="button" class="tag-button" :class="{ active: product.condition === opt }" @click="product.condition = opt">
                  {{ opt }}
                </button>
              </div>
              <small class="text-danger" v-if="errors.condition">{{ errors.condition }}</small>
            </div>
            <div class="col-md-6">
              <label class="section-label">Category</label>
              <select v-model="product.category_ids" class="form-select custom-select mt-2">
                <option value="" disabled>Select Category</option>
                <option v-for="category in categoryStore.categoryName" :key="category.id" :value="category.id">{{ category.name }}</option>
              </select>
              <small class="text-danger" v-if="errors.category_ids">{{ errors.category_ids }}</small>
            </div>
          </div>

          <!-- Description, Detail, Story -->
          <div class="content-block mb-4">
            <label class="section-label">Description</label>
            <textarea v-model="product.description" rows="2" class="form-control minimal-textarea mt-2" placeholder="The elevator pitch..."></textarea>
            <small class="text-danger" v-if="errors.description">{{ errors.description }}</small>
          </div>

          <div class="content-block mb-4">
            <label class="section-label">Detail</label>
            <textarea v-model="product.detail" rows="3" class="form-control minimal-textarea mt-2" placeholder="The technical details..."></textarea>
          </div>

          <div class="content-block mb-5">
            <label class="section-label">The Story</label>
            <textarea v-model="product.story" rows="5" class="form-control minimal-textarea mt-2" placeholder="Share the inspiration, the craft, and the journey..."></textarea>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/api/http";
import { UseCategoryStore } from "@/stores/category";
import { notify } from "@/util/toast";
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const productId = route.params.id;

const categoryStore = UseCategoryStore();
const isPageLoading = ref(true);
const isloading = ref(false);

const product = reactive({
  title: "",
  price: null,
  condition: "New",
  category_ids: "",
  description: "",
  detail: "",
  story: "",
});

const imagePreview = ref(null);
const imageFile = ref(null);

const errors = reactive({});

// Fetch categories + product data
onMounted(async () => {
  try {
    await categoryStore.fetchCategory();
    const res = await api.get(`/api/products/${productId}`);
    const data = res.data.data;

    product.title = data.title;
    product.price = data.price;
    product.condition = data.condition;
    product.category_ids = data.categories?.[0]?.id ?? "";
    product.description = data.description;
    product.detail = data.detail;
    product.story = data.story;
    imagePreview.value = data.image;
  } catch (err) {
    notify.error("Failed to load product data");
  } finally {
    isPageLoading.value = false;
  }
});

// Image preview handler
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    imageFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

// Validation
const validateProduct = () => {
  errors.title = !product.title ? "Title is required" : "";
  errors.price = !product.price ? "Price is required" : "";
  errors.imageFile = !imageFile.value && !imagePreview.value ? "Product image is required" : "";
  errors.condition = !product.condition ? "Condition is required" : "";
  errors.category_ids = !product.category_ids ? "Category is required" : "";
  errors.description = !product.description ? "Description is required" : "";
  return !Object.values(errors).some(e => e);
};

// Submit
const handleSubmit = async () => {
  if (!validateProduct()) {
    notify.error("Please fix validation errors");
    return;
  }

  const fmdata = new FormData();
  fmdata.append("title", product.title);
  fmdata.append("description", product.description);
  fmdata.append("detail", product.detail);
  fmdata.append("condition", product.condition);
  fmdata.append("story", product.story);
  fmdata.append("price", product.price);
  fmdata.append("category_ids", JSON.stringify([product.category_ids]));
  if (imageFile.value instanceof File) fmdata.append("image", imageFile.value);

  try {
    isloading.value = true;
    await api.post(`/api/products/${productId}`, fmdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    notify.sucess("Product updated successfully!", "/seller");
    resetForm();
  } catch (err) {
    notify.error("Error updating product");
  } finally {
    isloading.value = false;
  }
};

// Reset form
const resetForm = () => {
  Object.assign(product, {
    title: "",
    price: null,
    condition: "New",
    category_ids: "",
    description: "",
    detail: "",
    story: "",
  });
  imagePreview.value = null;
  imageFile.value = null;
};
</script>

<style scoped>
.title-input { font-size: 3rem; font-weight: 700; border: none; text-align: center; width: 100%; outline: none; letter-spacing: -0.03em; }
.price-input { font-size: 1.5rem; border: none; width: 120px; outline: none; font-weight: 500; }
.section-label { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #adb5bd; }
.upload-zone { width: 100%; height: 400px; background: #f8f9fa; border-radius: 24px; overflow: hidden; }
.file-hidden { display: none; }
.upload-label { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; cursor: pointer; background-size: cover; background-position: center; transition: transform 0.3s ease; }
.upload-label:hover { transform: scale(1.01); }
.upload-icon { font-size: 2.5rem; color: #000; }
.tag-button { border: 1px solid #dee2e6; background: transparent; padding: 6px 18px; border-radius: 50px; font-size: 0.9rem; transition: all 0.2s; }
.tag-button.active { background: #000; color: #fff; border-color: #000; }
.minimal-textarea { border: none; background: #f8f9fa; border-radius: 12px; padding: 1.25rem; }
.minimal-textarea:focus { background: #f1f3f5; box-shadow: none; }
.custom-select { border: none; background: #f8f9fa; border-radius: 12px; padding: 0.8rem; }
.skeleton { background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 12px; }
.skeleton-title { height: 50px; margin-bottom: 20px; }
.skeleton-image { height: 400px; margin-bottom: 20px; }
.skeleton-input { height: 60px; margin-bottom: 15px; }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
</style>