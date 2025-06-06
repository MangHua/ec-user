<template>
  <div class="container d-flex justify-content-center my-5">
    <h1>商品結帳</h1>

  </div>
  <BCard header="商品結帳" class="d-flex justify-content-start">
    <div>
      <BTable striped hover :items="items" />
    </div>
  </BCard>
</template>

<script setup>

const items = [
  {age: '1', 商品: '素色棉布', 數量: '1', 尺寸:'半碼', 金額:'135'},

]
</script>

<style scoped>

</style>
