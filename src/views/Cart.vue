<template>
    <div class="alert-message-block mt-2">
      <BAlert
        :model-value="!cartItems.length > 0"
        variant="danger"
      >
        您的購物車尚未加入商品
      </BAlert>
      <BAlert
        :model-value="responseErrorMessage"
        variant="danger"
      >
        {{ responseErrorMessage }}
      </BAlert>
      <BAlert
        :model-value="isSuccess"
        variant="success"
      >
        訂單已成立，訂單編號：{{ orderInfo.order_no }}
      </BAlert>
    </div>
    <BTable
      v-if="cartItems.length > 0"
      border
      striped
      hover
      :fields="fields"
      :items="cartItems"
    >

      <template #cell(image)="data">
        <BImg
          :src="data.item.image"
          height="100"
          width="100"
        />
      </template>

      <template #cell(sub_total)="data" >
        {{ data.item.sub_total }}
        <BButton
          size="sm"
          class="mx-3"
          @click="cartdeleteCartById(data.item.id)"
        >
          刪除
        </BButton>
      </template>
    </BTable>
    <div
      v-if="cartItems.length > 0"
      class="button-group d-flex justify-content-end"
    >
      <BButton
        variant="danger"
        size="lg"
        @click="cartStore.clearCart()"
      >
        <IMdiTrash /> 清空購物車
      </BButton>
      <BButton
        variant="primary"
        size="lg"
        class="ms-1"
        @click="createOrder"
      >
        送出訂單
      </BButton>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useCartStore } from "@/stores/cart.js";
import { BImg } from "bootstrap-vue-next";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import { createOrder as apiCreateOrder } from "@/api/order.js";

const authStore = useAuthStore();
const user = authStore.user;
const responseErrors = ref(null);
const responseErrorMessage = ref(null);
const isSuccess = ref(false);
const cartStore = useCartStore();

const fields = [
  {
    key: 'sku_name',
    label: '商品名稱',
  },
  {
    key: 'image',
    label: '商品圖片',
  },
  {
    key: 'quantity',
    label: '數量',
  },
  {
    key: 'unit_price',
    label: '單價',
  },
  {
    key: 'sub_total',
    label: '小計',
  }
];
const orderInfo = ref({
  id: null,
  user_id: null,
  order_no: null,
  name: null,
  phone: null,
  email: null,
  address: null,
  status: null,
  payment_status: null,
  currency: null,
  total: null,
  order_date: null,
  order_time: null,
});

const { cartItems } = storeToRefs(cartStore);
cartItems.value = cartItems.value.map((cartItem) => {
  return {
    id: cartItem.id,
    sku_id: cartItem.sku_id,
    sku_name: cartItem.sku_name,
    image: cartItem.image,
    quantity: cartItem.quantity,
    unit_price: cartItem.unit_price,
    sub_total: cartItem.unit_price * cartItem.quantity,
  }
});

const createOrder = async() => {
  try {
    responseErrors.value = null;
    responseErrorMessage.value = null;
    const { order } = await apiCreateOrder({
      name: user.name,
      phone: '0987654321',
      email: user.email,
      address: 'test address',
      order_items: cartItems.value.map((cartItem) => {
        return {
          sku_id: cartItem.sku_id,
          quantity: cartItem.quantity,
        }
      })
    });
    isSuccess.value = true;
    Object.assign(orderInfo.value, {
      id: order.id,
      user_id: order.user_id,
      order_no: order.order_no,
      name: order.name,
      phone: order.phone,
      email: order.email,
      address: order.address,
      status: order.status,
      payment_status: order.payment_status,
      currency: order.currency,
      total: order.total,
      order_date: order.order_date,
      order_time: order.order_time,
    });
    await cartStore.initCart();
  } catch (error) {
    responseErrors.value = error.errors;
    responseErrorMessage.value = error.isValidationError ? '' : error.message;
  }
}
const cartdeleteCartById = async(cartItemId) => {
  try {
    await cartStore.deleteCartById(cartItemId);
  } catch (error) {
    responseErrors.value = error.errors;
    responseErrorMessage.value = error.isValidationError ? '' : error.message;
  }
}
</script>

<style scoped>

</style>
