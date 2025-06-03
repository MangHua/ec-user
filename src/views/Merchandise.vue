<template>
  <div class="row">
    <div class="col-5 mx-5">
      <BCarousel controls>
        <BCarouselSlide img-src="https://down-tw.img.susercontent.com/file/485cb7a5efca239ee5cde15267fda2d4.webp"/>
        <BCarouselSlide img-src="https://down-tw.img.susercontent.com/file/tw-11134207-7r98w-ltki9unelk7vd5.webp"/>
        <BCarouselSlide img-src="https://down-tw.img.susercontent.com/file/tw-11134207-7r98o-ltki9unek5nfda.webp"/>
      </BCarousel>

      <div class="d-flex my-2">
        <BCol>
          <BImg thumbnail fluid src="https://down-tw.img.susercontent.com/file/485cb7a5efca239ee5cde15267fda2d4.webp" alt="Image 1"/>
        </BCol>
        <BCol>
          <BImg thumbnail fluid src="https://down-tw.img.susercontent.com/file/tw-11134103-7quky-lk3ja58k237qbe.webp" alt="Image 1"/>
        </BCol>
        <BCol>
          <BImg thumbnail fluid src="https://down-tw.img.susercontent.com/file/tw-11134207-7r98w-ltki9unelk7vd5.webp" alt="Image 1"/>
        </BCol>
        <BCol>
          <BImg thumbnail fluid src="https://down-tw.img.susercontent.com/file/tw-11134207-7r98o-ltki9unek5nfda.webp" alt="Image 1"/>
        </BCol>
      </div>
    </div>
    <div class="col-5">
      <h2>素色棉布</h2>
      <p>100％純天然純棉，可製作衣服、抱枕、圍裙、包包內裡、桌巾、被單等…</p>

      <span style="display: block;">尺 寸：約30x140公分</span>
      <span style="display: block;">單 位：尺</span>
      <span style="display: block;">產 地：日本</span>

      <div class="h3 ml-auto my-2" style="color: #FA8072">
        <small>NT$</small>
        <strong id="product-price">135</strong>
      </div>

      <div class="row my-2">
        <h4 class="col-md-2  heading">顏色</h4>
        <div class="row col-md-10">
          <BButton variant="outline-secondary" class="col-md-2 m-1">淺紫</BButton>
          <BButton variant="outline-secondary" class="col-md-2 m-1">粉色</BButton>
          <BButton variant="outline-secondary" class="col-md-2 m-1">白色</BButton>
          <BButton variant="outline-secondary" class="col-md-2 m-1">藍色</BButton>
          <BButton variant="outline-secondary" class="col-md-2 m-1">深藍</BButton>
          <BButton variant="outline-secondary" class="col-md-2 m-1">黑色</BButton>
          <BButton variant="outline-secondary" class="col-md-2 m-1">咖啡</BButton>
        </div>
      </div>

      <div class="row my-2">
        <h4 class="col-md-2  heading">尺寸</h4>
        <div class="row col-md-10">
          <BFormSelect v-model="selected" :options="ex1Options" size="sm" class="m-1" />
        </div>
      </div>

      <div class="row my-2">
        <h4 class="col-md-2  heading">數量</h4>
        <div class="row col-md-10">
          <BFormSpinbutton id="sb-inline" inline placeholder="0"  class="m-1"/>
        </div>
      </div>

      <div class="justify-content-start">
        <BButton variant="primary" size="lg" class="button">
          <IMdiCartPlus/>
          加入購物車
        </BButton>
        <BButton size="lg" class="mx-2 my-2 button">直接購買</BButton>
      </div>

    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const ex1Options = [
  {value: null, text: '半碼 約45x110cm'},
  {value: 'a', text: '1碼 約90x110cm'}
]
const selected = ref(null)
</script>

<style scoped>
.heading {
  font-size: 16px;
  font-weight:normal;
  color: gray;
  line-height:3;
}
.button {
  color: 	#FFDAC8;
  background-color: #AD5A5A;
  border-color: transparent;
}
</style>
