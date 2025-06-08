<template>
  <BCarousel class="mt-3" controls indicators>
    <BCarouselSlide class="slide-img" img-src="https://images.unsplash.com/photo-1618400902169-4b230270abbb?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fERyYXBlcnl8ZW58MHx8MHx8fDA%3D" />
    <BCarouselSlide class="slide-img" img-src="https://plus.unsplash.com/premium_photo-1683141376822-6ccd2e41195c?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTZ8fERyYXBlcnl8ZW58MHx8MHx8fDA%3D" />
    <BCarouselSlide class="slide-img" img-src="https://images.unsplash.com/photo-1646060542275-de43f818878f?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fERyYXBlcnl8ZW58MHx8MHx8fDA%3D" />
  </BCarousel>

  <h1 class="mt-3">商品列表</h1>
  <div class="row">
    <div
      class="col-12 col-sm-6 col-md-4 mt-3 d-flex justify-content-center justify-content-md-start"
      v-for="product in allProducts"
      :key="product.id"
    >
      <BLink
        :to="{ name: 'merchandise', params: { id: product.id }}"
        :disabled="product.id !== 4"
      >
        <BCard
          :title="product.name"
          :img-src="product.image"
          :img-alt="product.name"
          img-top
          img-height="300px"
          tag="article"
          style="max-width: 20rem"
          class="h-100"
        >
          <BCardText v-html="product.description" />
        </BCard>
      </BLink>
    </div>
  </div>


</template>

<script setup>
import { getAllProducts as apiGetAllProducts } from '@/api/product.js';
import { onMounted, ref } from "vue";

const allProducts = ref([]);
onMounted(async () => {
  const { data } = await apiGetAllProducts();
  allProducts.value = data
    .sort(currentProduct => currentProduct.id !== 4 ? 1 : -1)
    .map(product => {
      return {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        stock: product.stock,
        description: product.description,
      }
    });
});

</script>

<style scoped>
.slide-img  {
  width: 100%;
  height: 600px;
  object-fit: contain;
  object-position: top center;
}
a {
  text-decoration: none;
}
</style>
