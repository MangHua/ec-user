<template>
  <div>
    <BNavbar v-b-color-mode="'dark'" toggleable="lg" variant="dark-subtle" class="fixed-top">
      <BNavbarBrand :to="{ name: 'index'}">Drapery Handmade</BNavbarBrand>
      <BNavbarToggle target="nav-collapse" />
      <BCollapse id="nav-collapse" is-nav>
        <BNavbarNav class="ms-auto mb-2 mb-lg-0">
          <BNavItem
            v-if="user?.id"
            :to="{ name: 'user-profile'}"
          >
            <IMdiAccount />
          </BNavItem>
          <BNavItem
            v-if="!user?.id"
            :to="{ name: 'login'}"
          >
            <IMdiLogin />
            登入
          </BNavItem>
          <BNavItem
            v-if="user?.id"
            @click="showLogoutModal = true"
          >
            <IMdiLogout />
            登出
          </BNavItem>
          <BNavItem
            v-if="user?.id"
            :to="{ name: 'cart'}"
          >
            <div class="position-relative d-inline-block">
              <IMdiCartVariant class="text-white" style="font-size: 1.5rem;" />
              <BBadge
                pill
                variant="danger"
                class="position-absolute top-0 start-100 translate-middle"
                style="font-size: .65rem;"
              >
                {{ cartItems.length || 0 }}
              </BBadge>
            </div>
          </BNavItem>
        </BNavbarNav>
      </BCollapse>
    </BNavbar>
    <BModal
      v-model="showLogoutModal"
      title="系統訊息"
      @ok="logout"
    >
      確定要登出嗎？
    </BModal>
    <BModal
      title="系統訊息"
      v-model="logoutErrorMessage"
      ok-only
    >
      {{ logoutErrorMessage }}
    </BModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.js";
import { useCartStore } from "@/stores/cart.js";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore);
console.log('cartItemscartItemscartItems', cartItems)
const user = authStore.user;
const router = useRouter();
const showLogoutModal = ref(false);
const logoutErrorMessage = ref(null);

onMounted(async() => {
  await cartStore.initCart();
});

const logout = async() => {
  try {
    await authStore.logout();
    await router.push({name: 'login'});
  } catch (error) {
    console.log(error);
    logoutErrorMessage.value = '登出發生錯誤！';
  }
}
</script>

<style scoped>
</style>
