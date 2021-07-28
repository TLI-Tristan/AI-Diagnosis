<template>
    <div class="h-screen bg-white w-96">
        <h1>Hoona</h1>
        <ul>
            <li>Home</li>
            <li>Brain Tumor MRI</li>
            <li>Stroke</li>
            <li>Heart</li>
            <li @click="logoutHandling">Logout</li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "SideNavigation",
  components: {
      
  },
  methods: {
    logoutHandling() {
      console.log("logout press");
      // <router-link to="/login">Login</router-link>
      // clear data to prevent back navigation

      this.$router.push({ name: "Login" });
    },
  },
};
</script>
