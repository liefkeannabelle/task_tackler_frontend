<template>
  <div id="app">
    <nav>
      <router-link to="/lists">Lists</router-link> |
      <router-link to="/taskbank">Task Bank</router-link> |
      <router-link to="/sessions">Sessions</router-link>
    </nav>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
</script>

<style>
nav { padding: .5rem; background:#f8f8f8; border-bottom:1px solid #eaeaea; }
nav a { margin-right:.5rem; text-decoration:none; color:inherit; }
main { padding:1rem; }
</style>