<template>
  <div class="h-screen secondary-background-color primary-color w-80 flex-none">
    <div class="flex flex-col h-screen">
      <div>
        <p class="py-5 text-2xl">Hoona</p>
      </div>
      <hr>
      <div class="flex-grow">
        <ul class="flex flex-col text-left items-stretch">
        <li class="w-full">
          <div class="">
          <router-link to="/braintumor" class="block py-4 hover:bg-blue-700 px-6 flex flex-row items-center">
              <span class="w-10 h-10"><img class="" src="../assets/home.svg" /></span>
              <span class="ml-2">Home</span>
            </router-link>
          </div>
        </li>
        <li>
          <div class="py-3">
            <p class="text-gray-400 px-4 pt-5">DIAGNOSIS</p>
          </div>
        </li>
        <hr>
        <li>
          <div class="">
            <router-link to="/braintumor" class="block py-4 hover:bg-blue-700 px-6 flex flex-row items-center">
              <span class="w-10 h-10"><img class="" src="../assets/atom.svg" /></span>
              <span class="ml-2">Brain Tumor</span>
            </router-link>
          </div>
        </li>
        <li>
          <div class="">
            <router-link to="/heart" class="block py-4 hover:bg-blue-700 px-6 flex flex-row items-center">
              <span class="w-10 h-10"><img class="" src="../assets/heartbeat-solid.svg" /></span>
              <span class="ml-2">Heart</span>
            </router-link>
          </div>
        </li>
        <li>
          <div class="">
            <router-link to="/stroke" class="block py-4 hover:bg-blue-700 px-6 flex flex-row items-center">
              <span class="w-10 h-10"><img class="" src="../assets/brain.svg" /></span>
              <span class="ml-2">Stroke</span>
            </router-link>
          </div>
        </li>
      </ul>
      </div>
      <div class="">
        <hr>
        <div @click="logoutHandling" class="block py-4 hover:bg-blue-700 px-6 flex flex-row items-center">
            <span class="w-10 h-10"><img class="" src="../assets/logout.svg" /></span>
            <span class="ml-2">Logout</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideNavigation",
  components: {},
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

style{}
