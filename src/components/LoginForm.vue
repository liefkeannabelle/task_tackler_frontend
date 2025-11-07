<template>
  <div class="login-form">
    <template v-if="!auth.isLoggedIn">
      <input v-model="name" placeholder="Enter username" @keyup.enter="login" />
      <button class="login-btn" @click="login" :disabled="!name">Login</button>
    </template>
    <template v-else>
      <!-- apply region-muted so text uses the muted color -->
      <span class="region-muted">Signed in as <strong>{{ auth.username }}</strong></span>
      <button class="logout-btn" @click="logout">Logout</button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();
const name = ref(auth.username ?? '');

function login() {
  if (!name.value) return;
  auth.setUsername(name.value.trim());
}

function logout() {
  auth.clear();
}
</script>

<style scoped>
.login-form { display:flex; gap:.5rem; align-items:center; }
.login-form input { padding:.25rem .5rem; }
</style>