<template>
  <div class="flex">
    <SideNavigation />
    <div class="home flex-auto">
      <br />
      <p class="primary-color">PROFILE</p>
    </div>
  </div>
</template>

<script>
import SideNavigation from "@/components/SideNavigation.vue";

export default {
  name: "Profile",
  components: {
    SideNavigation,
  },
};
</script>

<style>
</style>
