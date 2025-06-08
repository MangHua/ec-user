<template>
  <div class="row justify-content-center product-details">
    <div class="col-12 col-md-6">
      <BCarousel
        v-if="productInfo.images.length > 0"
        controls
      >
        <BCarouselSlide
          v-for="(image, index) in productInfo.images"
          :key="index"
          :img-src="image"
        />
      </BCarousel>

      <div class="d-flex my-2">
        <BCol
          v-for="(image, index) in productInfo.images"
          :key="index"
        >
          <BImg
            thumbnail
            fluid
            :src="image"
            :alt="productInfo.name"
          />
        </BCol>
      </div>
    </div>
    <div class="col-12 col-md-6 mt-4 mt-md-0 product-info ">
      <h2>{{ productInfo.name }}</h2>
      <p v-html="productInfo.description"></p>

      <div class="h3 ml-auto my-2" style="color: #FA8072">
        <small>NT$</small>
        <template v-if="SKU.price">
          <strong id="product-price">
            {{ productInfo.min_price }}
          </strong>
        </template>
        <template v-else>
          <strong id="product-price">
            {{ productInfo.min_price }}
          </strong>
          ~
          <strong id="product-price">
            {{ productInfo.max_price }}
          </strong>
        </template>
      </div>

      <div class="row my-2">
        <template
          v-for="attribute in productInfo.attributes"
          :key="attribute.id"
        >
          <h4 class="col-4 my-2">
            {{ attribute.name }}
          </h4>
          <div class="d-flex flex-wrap">
            <BButton
              v-for="attributeValue in attribute.values"
              :key="attributeValue.id"
              :variant="selectedAttributes[attribute.id] === attributeValue.id ? 'secondary' : 'outline-secondary'"
              class="spec-btn"
              @click="selectAttribute(attribute.id, attributeValue.id)"
            >
              {{ attributeValue.value }}
            </BButton>
          </div>
        </template>
      </div>

      <div class="my-4">
        <h4 class="">數量</h4>
        <BFormSpinbutton
          id="sb-inline"
          size="lg"
          placeholder="0"
          class="w-50"
          :readonly="!SKU.stock"
          :max="SKU.stock"
          v-model="newCartItem.quantity"
        />
      </div>
      <div class="alert-message-block mt-2">
        <div v-if="responseErrorMessage" class="alert alert-danger">
          {{ responseErrorMessage }}
        </div>
        <div v-if="isSuccess" class="alert alert-success">
          加入購物車成功
        </div>
      </div>
      <div class="col-12 d-flex justify-content-sm-center justify-content-md-end footer-btn">
        <BButton
          variant="danger"
          size="lg"
          class="me-4 w-50"
          @click="addToCart"
          :disabled="!newCartItem.quantity > 0"
        >
          <IMdiCartPlus/>
          加入購物車
        </BButton>
        <BButton
          variant="danger"
          size="lg"
          class="w-50"
          @click="buyRightNow"
          :disabled="!newCartItem.quantity > 0"
        >
          直接購買
        </BButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, reactive } from 'vue';
import { useRoute } from "vue-router";
import {
  getProductById as apiGetProductById,
  getSKUByAttributeValueIds as apiGetSKUByAttributeValueIds
} from "@/api/product.js";
import { BFormSpinbutton } from "bootstrap-vue-next";
import { useCartStore } from "@/stores/cart.js";
import { useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const responseErrors = ref({});
const responseErrorMessage = ref(null);
const isSuccess = ref(false);
const cartStore = useCartStore();

const productId = route.params?.id;
const productInfo = ref({
  id: productId,
  name: null,
  attributes: [],
  min_price: null,
  max_price: null,
  stock: null,
  image: null,
  images: [],
  description: null,
});


const defaultSKU = {
  id: null,
  code: null,
  name: null,
  price: null,
  stock: null,
};

const SKU = ref({ ...defaultSKU });

const initCartItem = {
  sku_id: null,
  quantity: null,
  unit_price: null,
};

const newCartItem = reactive({ ...initCartItem });
const selectedAttributes = reactive({})
const selectAttribute = (attributeId, attributeValueId) => {
  selectedAttributes[attributeId] = attributeValueId;
}
const clearSelectedAttributes = () => {
  for (const key in selectedAttributes) {
    // 確保只刪除自身的屬性，而不是原型鏈上的
    if (Object.prototype.hasOwnProperty.call(selectedAttributes, key)) {
      delete selectedAttributes[key];
    }
  }
};
watch(selectedAttributes, async(newValue) => {
  responseErrorMessage.value = '';
  responseErrors.value = '';
  if (Object.keys(newValue).length < productInfo.value.attributes.length) {
    return;
  }

  SKU.value = { ...defaultSKU };
  Object.assign(newCartItem, { ...initCartItem });
  try {
    await apiGetSKUByAttributeValueIds(productInfo.value.id, newValue)
      .then(response => {
        SKU.value.id = response.id;
        SKU.value.code = response.code;
        SKU.value.name = response.name;
        SKU.value.price = response.price;
        SKU.value.stock = response.stock;

        newCartItem.sku_id = response.id;
        newCartItem.unit_price = response.price;
      });
  } catch (error) {
    responseErrors.value = error.errors;
    responseErrorMessage.value = error.isValidationError ? '' : error.message;
  }
});
onMounted(async() => {
  try {
    const product = await apiGetProductById(productId);
    productInfo.value.name = product.name;
    productInfo.value.attributes = product.attributes;
    productInfo.value.min_price = product.min_price;
    productInfo.value.max_price = product.max_price;
    productInfo.value.stock = product.stock;
    productInfo.value.image = product.image;
    productInfo.value.images = product.images;
    productInfo.value.description = product.description;
  } catch (error) {
    console.log(error);
  }
});

const addToCart = async() => {
  responseErrorMessage.value = '';
  responseErrors.value = '';
  isSuccess.value = false;
  try {
    if (!newCartItem.sku_id || !newCartItem.quantity || !newCartItem.unit_price) {
      responseErrorMessage.value = '欲加入購物車的商品資訊有誤！';
      return;
    }
    await cartStore.addToCart({ ...newCartItem });
    isSuccess.value = true;
    clearSelectedAttributes();
    SKU.value = { ...defaultSKU };
    Object.assign(newCartItem, { ...initCartItem });
  } catch (error) {
    responseErrors.value = error.errors;
    responseErrorMessage.value = error.isValidationError ? '' : error.message;
  }
}

const buyRightNow = async () => {
  await addToCart()
  await router.push({ name: 'cart' });
}

</script>

<style scoped>
.product-info {
  max-height: 664px;
  overflow: auto;
  margin-bottom: 16px;
}

.spec-btn {
  margin: .15rem;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;
}

.footer-btn {
  max-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;
}
</style>
