<template>
  <div class="min-vh-100 bg-white py-5">
    <div class="container" style="max-width: 800px">
      <div class="d-flex justify-content-between align-items-center mb-5">
        <router-link :to="{ name: 'seller' }" class="btn btn-link text-dark p-0 text-decoration-none fw-bold">←
          Back</router-link>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-dark border-0 fw-medium" @click="resetForm">
            Clear Draft
          </button>
          <button :disabled="isloading" class="btn bg-primary bg-opacity-50 text-white rounded px-4" @click="handleSubmit" >
            <span v-if="isloading" class="spinner-border spinner-border-sm text-light me-2" role="status"></span>
            <span>{{ isloading ? "Loading..." : "Add Product" }}</span>
          </button>
        </div>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-5 text-center">
          <input type="text" v-model="product.title" class="title-input" placeholder="Name your Title..." required />
          <div class="d-flex justify-content-center align-items-center mt-3 gap-2">
            <span class="fs-4 text-muted">$</span>
            <input type="number" v-model.number="product.price" class="price-input" placeholder="0.00" step="0.01"
              required />
          </div>
        </div>

        <div class="upload-zone mb-5">
          <input type="file" @change="handleImageUpload" class="file-hidden" id="fileInput" accept="image/*" />
          <label for="fileInput" class="upload-label" :style="imagePreview
            ? `background-image: url(${imagePreview})`
            : ''
            ">
            <div v-if="!imagePreview" class="text-center">
              <div class="upload-icon mb-2">✦</div>
              <p class="mb-0 small fw-bold text-uppercase tracking-widest">
                Add Primary Visual
              </p>
            </div>
            <div v-else class="preview-overlay">
              <span class="badge bg-white text-dark rounded-pill shadow-sm">Change Image</span>
            </div>
          </label>
        </div>

        <div class="row g-4 mb-5">
          <div class="col-md-6">
            <label class="section-label">Condition</label>
            <div class="d-flex gap-2 flex-wrap mt-2">
              <button v-for="opt in ['New', 'Vintage', 'Sample']" :key="opt" type="button" class="tag-button"
                :class="{ active: product.condition === opt }" @click="product.condition = opt">
                {{ opt }}
              </button>
            </div>
          </div>
          <div class="col-md-6">
            <label class="section-label">category_ids</label>
            <select v-model="product.category_ids" class="form-select custom-select mt-2">
              <option v-for="category in categoryStore.categoryName" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="content-block mb-4">
          <label class="section-label">description</label>
          <textarea v-model="product.description" rows="2" class="form-control minimal-textarea mt-2"
            placeholder="The elevator pitch..."></textarea>
        </div>

        <div class="content-block mb-4">
          <label class="section-label">detail</label>
          <textarea v-model="product.detail" rows="3" class="form-control minimal-textarea mt-2"
            placeholder="The technical details..."></textarea>
        </div>

        <div class="content-block mb-5">
          <label class="section-label">The Story</label>
          <textarea v-model="product.story" rows="5" class="form-control minimal-textarea mt-2"
            placeholder="Share the inspiration, the craft, and the journey..."></textarea>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import api from "@/api/http";
import { UseCategoryStore } from "@/stores/category";
import { notify } from "@/util/toast";
import { onMounted, reactive, ref } from "vue";

const categoryStore = UseCategoryStore();
onMounted(async () => {
  await categoryStore.fetchCategory();
});
const product = reactive({
  title: "",
  price: null,
  condition: "New",
  category_ids: [],
  description: "",
  detail: "",
  story: "",
});

const imagePreview = ref(null);
const imageFile = ref(null);
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    imageFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }

  console.log(imageFile.value);
};
const handleSubmit = async () => {

  if (!product.title) {
    notify.error("Please enter product title")
    return
  }
  if (!product.price) {
    notify.error("Please enter price")
    return
  }
  if (!imageFile.value) {
    notify.error('Please select an image')
    return;
  }
  if (!product.category_ids || product.category_ids.length === 0) {
    notify.error('Please select an category')
    return;
  }
  if (!product.description) {
    notify.error("Please enter description")
    return
  }
  if (!product.detail) {
    notify.error("Please enter detail")
    return
  }
  if (!product.story) {
    notify.error("Please enter story")
    return
  }

  if (!product.title ||
    !product.description ||
    !product.price ||
    !product.category_ids ||
    !imageFile.value ||
    !product.detail ||
    !product.story) {

    notify.error("Please fill all required fields")
    return
  }

  const fmdata = new FormData();
  fmdata.append("title", product.title);
  fmdata.append("image", imageFile.value);
  fmdata.append("description", product.description);
  fmdata.append("detail", product.detail);
  fmdata.append("condition", product.condition);
  fmdata.append("story", product.story);
  fmdata.append("price", product.price);

  if (product.category_ids) {
    fmdata.append('category_ids', JSON.stringify([product.category_ids]));
  }
  try {
    isloading.value = true
    const res = await api.post("/api/products", fmdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    notify.sucess('Product created successfully!', '/seller')
    resetForm();
  } catch (err) {
    notify.error("Error creating product")
    isloading.value = false
  }
};

const resetForm = () => {
  Object.assign(product, {
    title: "",
    price: null,
    condition: "New",
    category_ids: [],
    description: "",
    detail: "",
    story: "",
  });
  imagePreview.value = null;
  imageFile.value = null;
};
</script>

<style scoped>
.title-input {
  font-size: 3rem;
  font-weight: 700;
  border: none;
  text-align: center;
  width: 100%;
  outline: none;
  letter-spacing: -0.03em;
}

.price-input {
  font-size: 1.5rem;
  border: none;
  width: 120px;
  outline: none;
  font-weight: 500;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #adb5bd;
}

.upload-zone {
  width: 100%;
  height: 400px;
  background: #f8f9fa;
  border-radius: 24px;
  overflow: hidden;
}

.file-hidden {
  display: none;
}

.upload-label {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
}

.upload-label:hover {
  transform: scale(1.01);
}

.upload-icon {
  font-size: 2.5rem;
  color: #000;
}

.tag-button {
  border: 1px solid #dee2e6;
  background: transparent;
  padding: 6px 18px;
  border-radius: 50px;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.tag-button.active {
  background: #000;
  color: #fff;
  border-color: #000;
}

.minimal-textarea {
  border: none;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.25rem;
}

.minimal-textarea:focus {
  background: #f1f3f5;
  box-shadow: none;
}

.custom-select {
  border: none;
  background: #f8f9fa;
  border-radius: 12px;
  padding: 0.8rem;
}

.tracking-widest {
  letter-spacing: 0.2em;
}
</style>
