<template>
  <div class="register">
    <h2>註冊</h2>
    <div v-if="responseErrorMessage" class="alert alert-danger">
      {{ responseErrorMessage }}
    </div>
    <div v-if="isSuccess" class="alert alert-success">
      註冊成功
    </div>
    <BFormGroup
      id="input-group-1"
      label="電子郵件:"
      label-for="input-1"
    >
      <BFormInput
        id="input-1"
        type="email"
        v-model="initFormData.email"
      />
      <div v-if="responseErrors?.email">
        <span v-for="errorMsg in responseErrors.email" :key="errorMsg" class="error">{{ errorMsg }}</span>
      </div>
    </BFormGroup>
    <BFormGroup
      id="input-group-2"
      label="密碼:"
      label-for="input-2"
    >
      <BFormInput
        id="input-2"
        type="password"
        v-model="initFormData.password"
      />
      <div v-if="responseErrors?.password">
        <span v-for="errorMsg in responseErrors.password" :key="errorMsg" class="error">{{ errorMsg }}</span>
      </div>
    </BFormGroup>
    <BFormGroup
      id="input-group-3"
      label="姓名:"
      label-for="input-3"
    >
      <BFormInput
        id="input-3"
        type="text"
        v-model="initFormData.name"
      />
      <div v-if="responseErrors?.name">
        <span v-for="errorMsg in responseErrors.name" :key="errorMsg" class="error">{{ errorMsg }}</span>
      </div>
    </BFormGroup>
    <BFormGroup
      class="mt-3 d-flex justify-content-between"
    >
      <router-link to="/login"
        class="align-self-end"
      >
        已經有帳號？前往登入
      </router-link>
      <BButton
        variant="outline-primary"
        @click="register"
        :disabled="!canSubmit"
      >
        確定註冊
      </BButton>
    </BFormGroup>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { BFormInput } from "bootstrap-vue-next";
import { useAuthStore } from "@/stores/auth.js";

const authStore = useAuthStore();

const initFormData = reactive({
  email: "",
  password: "",
  name: "",
});
const canSubmit = computed(() => initFormData.email && initFormData.password && initFormData.name);
const responseErrors = ref({});
const responseErrorMessage = ref(null);
const isSuccess = ref(false);

const register = async() => {
  try {
    responseErrorMessage.value = '';
    responseErrors.value = '';

    await authStore.register({ ...initFormData })
    isSuccess.value = true;
    Object.assign(initFormData, {
      email: "",
      password: "",
      name: "",
    });
  } catch (error) {
    responseErrors.value = error.errors;
    responseErrorMessage.value = error.isValidationError ? '' : error.message;
  }
}

</script>

<style scoped>
.register {
  position: relative;
  top: 100px;
  left: 400px;
  border-style:outset;
  box-shadow: 5px 5px 5px darkgrey;
  padding: 40px;
  width: 500px;
  border-radius: 20px;
}
</style>
