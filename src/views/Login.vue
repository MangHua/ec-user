<template>
  <div class="login">
    <h2>登入</h2>
    <div v-if="responseErrorMessage" class="alert alert-danger">
      {{ responseErrorMessage }}
    </div>
    <BFormGroup
      id="input-group-1"
      label="Email:"
      label-for="input-1"
    >
      <BFormInput
        id="input-1"
        type="email"
        v-model="loginFormData.email"
      />
      <div v-if="responseErrors?.email">
        <span v-for="errorMsg in responseErrors.email" :key="errorMsg" class="error">{{ errorMsg }}</span>
      </div>
    </BFormGroup>
    <BFormGroup
      id="input-group-2"
      label="password:"
      label-for="input-2"
    >
      <BFormInput
        id="input-2"
        type="password"
        v-model="loginFormData.password"
      />
      <div v-if="responseErrors?.password">
        <span v-for="errorMsg in responseErrors.password" :key="errorMsg" class="error">{{ errorMsg }}</span>
      </div>
    </BFormGroup>
    <BFormGroup
      class="mt-3 d-flex justify-content-between"
    >
      <router-link
        :to="{ name: 'register'}"
        class="align-self-end"
      >
        新朋友？立即前往註冊
      </router-link>
      <BButton
        variant="outline-primary"
        :disabled="!canSubmit"
        @click="login"
      >
        登入
      </BButton>
    </BFormGroup>
  </div>

</template>

<script setup>
import {computed, reactive, ref} from 'vue';
import { BFormInput } from "bootstrap-vue-next";
import { login as apiLogin } from "@/api/login.js";
import { useRouter } from "vue-router";
const router = useRouter();

const responseErrors = ref({});
const responseErrorMessage = ref(null);
const loginFormData = reactive({
  email: "",
  password: "",
})
const canSubmit = computed(() => loginFormData.email && loginFormData.password)
const login = async() => {
  responseErrorMessage.value = '';
  try {
    const { token } = await apiLogin({ ...loginFormData })
    localStorage.setItem("ec-token", token)
    await router.push({ name: "home" })
  } catch (error) {
    responseErrors.value = error.errors;
    responseErrorMessage.value = error.isValidationError ? '' : error.message;
  } finally {
    loginFormData.password = '';
  }
}


</script>

<style scoped>
.login {
  position: relative;
  top: 150px;
  left: 400px;
  border-style:outset;
  box-shadow: 5px 5px 5px darkgrey;
  padding: 40px;
  width: 500px;
  border-radius: 20px;
  background-color: white;
}
</style>
