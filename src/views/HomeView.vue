<template>
  <BCarousel class="mt-3" controls indicators>
    <BCarouselSlide class="slide-img" img-src="https://images.unsplash.com/photo-1618400902169-4b230270abbb?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fERyYXBlcnl8ZW58MHx8MHx8fDA%3D" />
    <BCarouselSlide class="slide-img" img-src="https://plus.unsplash.com/premium_photo-1683141376822-6ccd2e41195c?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTZ8fERyYXBlcnl8ZW58MHx8MHx8fDA%3D" />
    <BCarouselSlide class="slide-img" img-src="https://images.unsplash.com/photo-1646060542275-de43f818878f?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fERyYXBlcnl8ZW58MHx8MHx8fDA%3D" />
  </BCarousel>

  <h1 class="mt-3">商品列表</h1>
  <div class="row">
    <div class="col-4 mt-3">
      <BLink :to="{ name: 'merchandise'}">
        <BCard
          title="素色棉布"
          img-src="https://down-tw.img.susercontent.com/file/485cb7a5efca239ee5cde15267fda2d4.webp"
          img-alt="Image"
          img-top
          img-height="300px"
          tag="article"
          style="max-width: 20rem"
        >
          <BCardText>
            可製作衣服、抱枕、圍裙、包包內裡、桌巾、被單等…
          </BCardText>
        </BCard>
      </BLink>
    </div>
  </div>


</template>

<script setup>


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
