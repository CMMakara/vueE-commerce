<template>
  <!-- <navbar ></navbar> -->
  <div class="profile-wrapper ">
    <!-- ── Banner ── -->
    <div class="banner">
      <div class="blob blob1"></div>
      <div class="blob blob2"></div>
      <div class="banner-icons" aria-hidden="true">
      </div>
      <div class="banner-logo">

      </div>
    </div>

    <!-- ── Profile Card ── -->
    <div class="profile-card">
      <div class="avatar-wrapper " @click="Editavatar">
        <img :src="getProfile.profile.avatar" alt="Fatimah" class="avatar" />
        <button class="avatar-edit" title="Change avatar">✏️</button>
      </div>

      <h2 class="username">{{ getProfile.profile.name ?? '' }}</h2>

      <div class="user-meta">
        <span><i class="bi bi-geo-alt"></i> {{ getProfile.profile.location }}</span>
        <span>📅 បានចូលរួម {{ new Date(getProfile.profile.created_at).toLocaleDateString('km-KH') }}</span>
      </div>

      <!-- ── Tabs Nav ── -->
      <nav class="tabs">
        <button class="tab-btn" :class="{ active: activeTab === 'home' }" @click="activeTab = 'home'">🏠 Home</button>
        <button class="tab-btn" :class="{ active: activeTab === 'favorites' }" @click="activeTab = 'favorites'"><i
            class="bi bi-bag-fill"></i>
          Product Owner</button>
        <!-- <button class="tab-btn" :class="{ active: activeTab === 'following' }" @click="activeTab = 'following'">👤 My
          Card</button> -->

        <!-- <button class="tab-btn" :class="{ active: activeTab === 'orders' }" @click="activeTab = 'orders'"><i
            class="bi bi-currency-dollar"></i>
          My Payment Check</button> -->
        <button class="tab-btn" :class="{ active: activeTab === 'tracking' }" @click="activeTab = 'tracking'">🚚 My
          Purchased</button>
        <button class="tab-btn" :class="{ active: activeTab === 'settings' }" @click="activeTab = 'settings'">⚙️
          Settings</button>
      </nav>
    </div>

    <!-- ── Tab Panes ── -->
    <div class="content-area">

      <!-- Home -->
      <div class="tab-pane" :class="{ show: activeTab === 'home' }">
        <h3>សូមស្វាគមន៍, Fatimah! 👋</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-icon">📦</span>
            <span class="stat-value">0</span>
            <span class="stat-label">ការទិញ</span>
          </div>
          <div class="stat-card">
            <span class="stat-icon">❤️</span>
            <span class="stat-value">0</span>
            <span class="stat-label">ចូលចិត្ត</span>
          </div>
          <div class="stat-card">
            <span class="stat-icon">👤</span>
            <span class="stat-value">0</span>
            <span class="stat-label">តាមដាន</span>
          </div>
          <div class="stat-card">
            <span class="stat-icon">⭐</span>
            <span class="stat-value">0</span>
            <span class="stat-label">ពិន្ទុ</span>
          </div>
        </div>
      </div>

      <!-- Product Owner -->
      <div class="tab-pane" :class="{ show: activeTab === 'favorites' }">
        <ProductOwner></ProductOwner>
        <p class="empty-state d-none">អ្នកមិនទាន់បន្ថែមមុខទំនិញចូលចិត្តណាមួយនៅឡើយទេ។</p>
      </div>

      <!-- My Card -->
      <!-- <div class="tab-pane" :class="{ show: activeTab === 'following' }">
        <h3>👤 My Card</h3>

        <Mycart></Mycart>
        <p class="empty-state d-none">អ្នកមិនទាន់តាមដានហាងណាមួយនៅឡើយទេ។</p>
      </div> -->

      <!-- Payment Check -->
      <div class="tab-pane" :class="{ show: activeTab === 'orders' }">
        <h3>📦 Payment Check</h3>
        <p class="empty-state">អ្នកមិនទាន់មានការទិញណាមួយនៅឡើយទេ។</p>
      </div>

      <!-- Purchased -->
      <div class="tab-pane" :class="{ show: activeTab === 'tracking' }">
        <h3>🚚 Purchased</h3>
        <p class="empty-state">មិនមានការបញ្ជាទិញដែលកំពុងដឹកជញ្ជូននៅឡើយទេ។</p>
      </div>

      <!-- Settings -->
      <div class="tab-pane w-100" :class="{ show: activeTab === 'settings' }">

        <div class="row g-3 p-3 mt-3 shadow rounded bg-light">
            <h6 class="fw-bold mb-4"><i class="bi bi-person-check me-2 text-primary"></i>Profile</h6>

          <div class="col-md-6">
            <label for=""  class="mb-2"><i class="bi bi-highlighter "></i>  USER NAME</label>
            <input type="text" class="form-control" disabled :value="getProfile.profile.name ?? ''"
              placeholder="username">
          </div>
          <div class="col-md-6">
            <label for="" class="mb-2"><i class="bi bi-telephone"></i>  TELL</label>
            <input type="text" class="form-control" disabled :value="getProfile.profile.phone ?? ''" placeholder="Tell">
          </div>
          <div class="col-md-12">
            <label for="" class="mb-2"><i class="bi bi-envelope"></i>  EMAIL</label>
            <input type="email" class="form-control" disabled :value="getProfile.profile.email ?? ''"
              placeholder="email">
          </div>
          <div class="col-md-12">
            <label class="mb-2"><i class="bi bi-geo-alt"></i>  LOCATION</label>
            <input type="email" class="form-control" disabled :value="getProfile.profile.location ?? ''"
              placeholder="location">
          </div>
          <div class="col-12">
            <div class="float-end">
              <button class="btn btn-warning text-light" @click="editProfile">Edit</button>
            </div>
          </div>
        </div>

        <!-- ===== Edit Profile Modal ===== -->
        <BaseModal v-if="openModal" header="Edit Profile" @close="closeModal">
          <template #content>
            <form class="m-0 p-0" @submit.prevent="saveData">

              <div class="row g-3">

                <div class="col-md-6">
                  <label class="mb-2">USER NAME</label>
                  <input type="text" v-model="form.userName" class="form-control">
                  <span class="text-danger">{{ errors.userName }}</span>
                </div>

                <div class="col-md-6">
                  <label class="mb-2">TELL</label>
                  <input type="text" v-model="form.tell" class="form-control">
                  <span class="text-danger">{{ errors.tell }}</span>
                </div>

                <div class="col-md-12">
                  <label class="mb-2">EMAIL</label>
                  <input type="email" v-model="form.email" class="form-control">
                  <span class="text-danger">{{ errors.email }}</span>
                </div>

                <div class="col-md-12">
                  <label class="mb-2">LOCATION</label>
                  <input type="text" v-model="form.location" class="form-control">
                  <span class="text-danger">{{ errors.location }}</span>
                </div>

                <!-- ✅ Buttons must be INSIDE form -->
                <div class="col-12 text-end mt-3">
                  <button type="button" class="btn btn-secondary me-2" @click="closeModal">
                    Cancel
                  </button>

                  <button type="submit" class="btn btn-primary" :disabled="isLoading">

                    <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                    <span v-else>Save</span>

                  </button>
                </div>
              </div>
            </form>
          </template>
        </BaseModal>
        <!-- Account Security -->
        <div class="row g-3 shadow mt-4 p-3 bg-light rounded mb-5">
            <h6 class="fw-bold mb-4"><i class="bi bi-shield-lock-fill me-2 text-primary"></i>Account Security</h6>
            <div class="col-md-6">
              <label for="">  PASSWORD</label>
              <input type="password" class="form-control" placeholder="..........." disabled>
            </div>
            <div class="col-md-6">
              <label for=""> NEW PASSWORD</label>
              <input type="password" class="form-control" placeholder="..........." disabled>
            </div>
            <div class="col-md-12">
              <label for=""> CONFIRM PASSWORD</label>
              <input type="password" class="form-control" placeholder="..........." disabled>
            </div>
            <div class="col-md-12">
              <div class="float-end">
                <button class="btn btn-warning text-light fw-bold">change password</button>
              </div>
            </div>
          </div>
      </div>
      <!-- -------------Edit avatar -->
      <BaseModal v-if="openModalEditProfile" header="Edit Avatar" @close="closeAvatar">
        <template #content>
          <form @submit.prevent="saveAvatar">

            <label>Image</label>
            <input type="file" class="form-control" @change="handleFile" />
            <span class="text-danger">{{ errFile }}</span>
            <div class="text-end mt-3">
              <button type="button" class="btn btn-secondary me-2" @click="closeAvatar">
                Cancel
              </button>

              <button type="submit" class="btn btn-primary" :disabled="isLoading">
                <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                <span v-else>Save</span>
              </button>
            </div>

          </form>
        </template>
      </BaseModal>

    </div>
  </div>
</template>

<script setup>

import { onMounted, ref, watch } from 'vue'
import { useProfileStore } from '@/stores/profile';
import BaseModal from '@/components/ui/BaseModal.vue';
import api from '@/api/http';
import { notify } from '@/util/toast';
import router from '@/router';
import ProductOwner from '@/components/layout/ProductOwner.vue';


// ---------------- State
const getProfile = useProfileStore()
const activeTab = ref('home')
const openModal = ref(false)
const openModalEditProfile = ref(false)
const isLoading = ref(false)
const File = ref(null)
const errFile = ref(null)
const form = ref({
  userName: '',
  tell: '',
  email: '',
  location: ''
})

const errors = ref({
  userName: '',
  tell: '',
  email: '',
  location: ''
})

onMounted(async () => {
  await getProfile.fetchProfile();
})


// ---------edit Profile
const editProfile = () => {
  const data = getProfile.profile
  form.value.userName = data.name ?? ''
  form.value.tell = data.phone ?? ''
  form.value.email = data.email ?? ''
  form.value.location = data.location ?? ''
  openModal.value = true
}
const closeModal = () => openModal.value = false

// ---------------- Avatar Modal Edit
const Editavatar = () => {
  openModalEditProfile.value = true
  errFile.value = '';
}
const closeAvatar = () => {
  openModalEditProfile.value = false
}
const handleFile = (event) => {
  const selected = event.target.files[0]
  if (selected) {
    File.value = selected;
  }
}



const saveAvatar = async () => {
  if (!File.value) {
    errFile.value = 'Please select an image';
    return;
  }
  isLoading.value = true
  try {
    errFile.value = '';
    const formData = new FormData()
    formData.append('image', File.value)
    notify.sucess('Avatar updated successfully', '/profile')
    await api.post('/api/profile/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    await getProfile.fetchProfile()
    closeAvatar()
  } catch (e) {
    console.error(e)
    notify.error('Failed to upload avatar')
  } finally {
    File.value = '';
  }
  isLoading.value = false
}

// -----------------validate

const nameRegex = /^[A-Za-z\s]+$/
const tellRegex = /^[0-9]+$/
const emailRegex = /^[A-Za-z][^\s@]*@[^\s@]+\.[^\s@]+$/

function validateForm() {
  let valid = true

  // Username
  if (!form.value.userName?.trim()) {
    errors.value.userName = 'Username is required'
    valid = false
  } else if (form.value.userName.trim().length < 2) {
    errors.value.userName = 'At least 2 characters'
    valid = false
  } else if (!nameRegex.test(form.value.userName.trim())) {
    errors.value.userName = 'No numbers or special characters'
    valid = false
  } else {
    errors.value.userName = ''
  }

  // Tell
  if (!form.value.tell?.trim()) {
    errors.value.tell = 'Number is required'
    valid = false
  } else if (!tellRegex.test(form.value.tell.trim())) {
    errors.value.tell = 'Must be a number'
    valid = false
  } else if (form.value.tell.trim().length !== 9) {
    errors.value.tell = 'Must be 9 digits'
    valid = false
  } else errors.value.tell = ''

  // Email
  if (!form.value.email?.trim()) {
    errors.value.email = 'Email is required'
    valid = false
  } else if (!emailRegex.test(form.value.email.trim())) {
    errors.value.email = 'Invalid email format'
    valid = false
  } else errors.value.email = ''

  // Location
  if (!form.value.location?.trim()) {
    errors.value.location = 'Location is required'
    valid = false
  } else errors.value.location = ''

  return valid
}
// ---------put data to profile
const saveData = async () => {
  if (!validateForm()) return;
  try {
    isLoading.value = true
    if (validateForm() != false) {
      notify.sucess('Profile updated successfully', '/profile')
      await api.put('/api/profile/info', {
        name: form.value.userName,
        phone: form.value.tell,
        email: form.value.email,
        location: form.value.location
      })
    }
    await getProfile.fetchProfile()
    closeModal();
  } catch (e) {
    console.error(e)
    notify.error('Failed to update profile')
  } finally {
    isLoading.value = false
  }
}


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;500;600;700&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.profile-wrapper {
  font-family: 'Kantumruy Pro', sans-serif;
  background: #f4f5fb;
  min-height: 100vh;
  max-width: 1100px;
  margin: 0 auto;
  margin-top: 20px;
  /* margin-top: 90px; */
  border-radius: 10px;

}


/* ── Banner ── */
.banner {
  position: relative;
  height: 200px;
  overflow: hidden;
  background-color: rgb(31, 141, 250);
  border-radius: 10px;
}

.blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.22;
}

.blob1 {
  width: 520px;
  height: 520px;
  background: #fff;
  top: -220px;
  left: -110px;
}

.blob2 {
  width: 420px;
  height: 420px;
  background: #ff9fe0;
  bottom: -220px;
  right: -90px;
}

.banner-icons {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 2rem;
  opacity: 0.15;
  pointer-events: none;
}

.banner-logo {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.logo-icon {
  font-size: 3.2rem;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
}

.logo-text h1 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
}

.logo-text p {
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.88rem;
  text-align: center;
}

/* ── Profile Card ── */
.profile-card {
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 18px rgba(106, 17, 203, 0.09);
}

.avatar-wrapper {
  position: relative;
  margin-top: -56px;
}

.avatar {
  width: 112px;
  height: 112px;
  border-radius: 50%;
  border: 4px solid #fff;
  object-fit: cover;
  background: #dbeafe;
  box-shadow: 0 4px 20px rgba(106, 17, 203, 0.2);
}

.avatar-edit {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.avatar-edit:hover {
  transform: scale(1.15);
}

.username {
  margin-top: 10px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
}

.user-meta {
  display: flex;
  gap: 16px;
  margin-top: 4px;
  margin-bottom: 18px;
  font-size: 0.83rem;
  color: #7c7f9e;
  flex-wrap: wrap;
  justify-content: center;
}

/* ── Tabs ── */
.tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  border-top: 1px solid #f0f0f8;
  padding: 12px 0;
  width: 100%;
}

.tab-btn {
  background: none;
  border: none;
  padding: 8px 14px;
  border-radius: 20px;
  font-family: 'Kantumruy Pro', sans-serif;
  font-size: 0.82rem;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.tab-btn:hover {
  background: #f3f0ff;
  color: #6a11cb;
}

.tab-btn.active {
  background-color:#0E6EFD;
  color: #fff;
  font-weight: 600;
}

/* ── Tab Panes (Bootstrap-style show/hide) ── */
.content-area {
  padding: 28px 24px;
}

.tab-pane {
  display: none;
  width: 100%;
}

.tab-pane.show {
  display: block;
  animation: fadeIn 0.25s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.tab-pane h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 20px;
}

/* ── Info Card ── */
.info-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 2px 12px rgba(106, 17, 203, 0.07);
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  border-bottom: 1px solid #f5f5fb;
  padding-bottom: 10px;
}

.info-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.info-label {
  color: #7c7f9e;
  font-weight: 500;
}

.info-value {
  color: #1a1a2e;
  font-weight: 600;
}

/* ── Stats ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 14px;
}

.stat-card {
  background: #fff;
  border-radius: 16px;
  padding: 22px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  box-shadow: 0 2px 12px rgba(106, 17, 203, 0.07);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(106, 17, 203, 0.14);
}

.stat-icon {
  font-size: 1.6rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #6a11cb;
}

.stat-label {
  font-size: 0.78rem;
  color: #7c7f9e;
}

.empty-state {
  color: #bbb;
  text-align: center;
  padding: 52px 0;
  font-size: 0.93rem;
}

/* ── Settings Form ── */
.settings-form {
  /* display: flex; */
  flex-direction: column;
  gap: 16px;
  /* max-width: 520px; */
  background-color: #f6dcdc8f;
  padding: 20px 20px;
  /* border-radius: 30px; */
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;

}

.settings-form label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.85rem;
  color: #444;
  font-weight: 600;
}

.settings-form label em {
  color: #e53e3e;
  font-style: normal;
}

.settings-form input {
  padding: 11px 14px;
  border: 1.5px solid #e0e0f0;
  border-radius: 10px;
  font-family: inherit;
  font-size: 0.93rem;
  outline: none;
  color: #1a1a2e;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.settings-form input:focus {
  border-color: #6a11cb;
  box-shadow: 0 0 0 3px rgba(106, 17, 203, 0.1);
}

.form-info {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.info-chip {
  background: #f0eaff;
  color: #6a11cb;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 500;
}

.save-btn {
  padding: 12px 32px;
  background: linear-gradient(135deg, #6a11cb, #c921d8);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-family: inherit;
  font-size: 0.98rem;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  transition: opacity 0.2s, transform 0.2s;

}

.btn-color {
  background-color: linear-gradient(135deg, #6a11cb, #c921d8);
}


.save-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* ── Responsive ── */
@media (max-width: 600px) {
  .banner {
    height: 150px;
  }

  .logo-text h1 {
    font-size: 1.5rem;
  }

  .logo-icon {
    font-size: 2.4rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .info-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
}
</style>