<template>
  <div class="container">
    <h2>姓名：{{ userInfo.name }}</h2>
    <h2>Email：{{ userInfo.email }}</h2>
  </div>
</template>

<script setup>
import { onMounted, reactive} from "vue";
import { getUserInfo } from "@/api/auth.js";
const userInfo = reactive({
  email: "",
  name: "",
})

onMounted(async() => {
  const userInfoResponse = await getUserInfo();
  Object.assign(userInfo, userInfoResponse);
})
</script>

<style scoped>

</style>
