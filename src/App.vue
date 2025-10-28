// ...existing code...
<template>
  <div id="app">
    <header>
      <LoginForm />
      <nav>
        <router-link to="/lists">Lists</router-link> |
        <router-link to="/taskbank">Task Bank</router-link> |
        <router-link to="/sessions">Sessions</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import LoginForm from './components/LoginForm.vue';
</script>

<style>
/* ...existing styles... */
header { display:flex; justify-content:space-between; align-items:center; padding:.5rem; }
</style>
// ...existing code...