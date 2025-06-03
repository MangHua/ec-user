<template>
  <div class="login">
    <h1>登入</h1>
    <BFormGroup
      id="input-group-1"
      label="Email:"
      label-for="input-1"
    >
      <BFormInput
        id="input-1"
        type="email"
      />
    </BFormGroup>
    <BFormGroup
      id="input-group-2"
      label="password:"
      label-for="input-2"
    >
      <BFormInput
        id="input-2"
        type="password"
      />
    </BFormGroup>
    <BButton
      variant="outline-info"
      class="mt-4 float-end"
    >
      確定
    </BButton>
    <BLink
      class="mt-4 d-inline-block"
      :to="{ name: 'register'}"
    >
      點我註冊..
    </BLink>
  </div>

</template>

<script setup>

import {BFormInput} from "bootstrap-vue-next";
</script>

<style scoped>
.login {
  position: relative;
  top: 150px;
  left: 400px;
  border-style:outset;
  box-shadow: 5px 5px 5px darkgrey;
  padding: 40px;
  height: 350px;
  width: 500px;
  border-radius: 20px;
  background-color: white;
}
</style>
