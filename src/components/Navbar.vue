<template>
  <BNavbar v-b-color-mode="'dark'" toggleable="lg" variant="dark-subtle">
    <BNavbarBrand>Drapery Handmade</BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavItem>
          關於我們
        </BNavItem>
        <BNavItem>
          <IMdiAccount/>會員
        </BNavItem>
        <BNavItem>
          <div class="position-relative d-inline-block">
            <IMdiCartVariant class="text-white" style="font-size: 1.5rem;" />
            <BBadge
              pill
              variant="danger"
              class="position-absolute top-0 start-100 translate-middle"
              style="font-size: .65rem;"
            >
              0
            </BBadge>
          </div>
        </BNavItem>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>

<script setup>
</script>

<style scoped>

</style>
