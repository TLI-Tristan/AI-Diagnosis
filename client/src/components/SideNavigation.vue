<template>
  <div class="h-screen secondary-background-color primary-color flex-none fixed top-0 z-50 transition-all duration-100 ease-in-out" :class="{ ['w-80'] : navBarOpened, ['w-12'] : !navBarOpened }">
    <div class="flex flex-row mt-5 items-center justify-center  cursor-pointer" v-if="!navBarOpened">
      <a class="w-6 h-6" @click="toggleSideNav"><img class="" src="../assets/menu.svg" /></a>
    </div>

    <div class="flex flex-col h-screen" v-if="navBarOpened">
      <div class="block flex flex-row items-center justify-center text-left">
        <span class="ml-8 py-5 text-2xl flex-1 cursor-default">Hoona</span>
        <span class="flex mr-2"> <a class="w-5 h-5 m-3 cursor-pointer" @click="toggleSideNav"><img class="" src="../assets/close.svg" /></a></span>
      </div>
      <hr>
      <div class="flex-grow">
        <ul class="flex flex-col text-left items-stretch">
        <li class="w-full">
          <div class="">
          <router-link to="/braintumor" class="block py-4 hover:bg-blue-700 px-6 flex flex-row items-center">
              <span class="w-8 h-8"><img class="" src="../assets/home.svg" /></span>
              <span class="ml-2">Home</span>
            </router-link>
          </div>
        </li>
        <li>
          <div class="py-3">
            <p class="text-gray-400 px-4 pt-5 cursor-default">DIAGNOSIS</p>
          </div>
        </li>
        <hr>
        <li>
          <div class="">
            <router-link to="/braintumor" class="block py-4 hover:bg-blue-700 px-6 flex flex-row items-center">
              <span class="w-8 h-8"><img class="" src="../assets/atom.svg" /></span>
              <span class="ml-2">Brain Tumor</span>
            </router-link>
          </div>
        </li>
        <li>
          <div class="">
            <router-link to="/heart" class="block py-4 hover:bg-blue-700 px-6 flex flex-row items-center">
              <span class="w-8 h-8"><img class="" src="../assets/heartbeat-solid.svg" /></span>
              <span class="ml-2">Heart</span>
            </router-link>
          </div>
        </li>
        <li>
          <div class="">
            <router-link to="/stroke" class="block py-4 hover:bg-blue-700 px-6 flex flex-row items-center">
              <span class="w-8 h-8"><img class="" src="../assets/brain.svg" /></span>
              <span class="ml-2">Stroke</span>
            </router-link>
          </div>
        </li>
      </ul>
      </div>
      <div class="">
        <hr>
        <div @click="logoutHandling" class="block py-4 hover:bg-blue-700 px-6 flex flex-row items-center cursor-pointer">
            <span class="w-8 h-8"><img class="" src="../assets/logout.svg" /></span>
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
  data() {
    return {
      navBarOpened: false,
      test: "hellllllo",
    };
  },
  methods: {
    logoutHandling() {
      console.log("logout press");
      // <router-link to="/login">Login</router-link>
      // clear data to prevent back navigation

      this.$router.push({ name: "Login" });
    },
    toggleSideNav() {
      this.navBarOpened = !this.navBarOpened;
    },

  },
};
</script>

style{}
