<template>
  <Navbar />
  <div class="container">
    <router-view />
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue"
</script>

<style scoped>
.container {
  margin-top: 80px;
}
</style>
