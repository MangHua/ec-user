<template>
  <div class="container">
    <h2>姓名：{{ userInfo.name }}</h2>
    <h2>Email：{{ userInfo.email }}</h2>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore();
const userInfo = authStore.user;

</script>

<style scoped>

</style>
