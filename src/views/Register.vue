<template>
  <div class="register">
    <h1>註冊</h1>
    <BFormGroup
      id="input-group-1"
      label="電子郵件:"
      label-for="input-1"
    >
      <BFormInput
        id="input-1"
        type="email"
      />
    </BFormGroup>
    <BFormGroup
      id="input-group-2"
      label="密碼:"
      label-for="input-2"
    >
      <BFormInput
        id="input-2"
        type="password"
      />
    </BFormGroup>
    <BFormGroup
      id="input-group-3"
      label="姓名:"
      label-for="input-3"
    >
      <BFormInput
        id="input-3"
        type="text"
      />
    </BFormGroup>
    <BFormGroup
      id="input-group-4"
      label="電話:"
      label-for="input-4"
    >
      <BFormInput
        id="input-3"
        type="telephone"
      />
    </BFormGroup>
    <BButton
      variant="outline-primary"
      class="mt-4 float-end"
    >
      確定註冊
    </BButton>

  </div>
</template>

<script setup>

import {BFormInput} from "bootstrap-vue-next";
</script>

<style scoped>
.register {
  position: relative;
  top: 100px;
  left: 400px;
  border-style:outset;
  box-shadow: 5px 5px 5px darkgrey;
  padding: 40px;
  height: 500px;
  width: 500px;
  border-radius: 20px;

}
</style>
