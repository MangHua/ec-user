<template>
  <Navbar />
  <div class="container pb-4">
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
