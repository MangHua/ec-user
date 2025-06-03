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
  {商品: 40, 單價: 'Dickerson', 數量: 'Macdonald', 總金額: 'Macdonald'},

]
</script>

<style scoped>

</style>
