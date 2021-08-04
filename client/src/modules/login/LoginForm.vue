<template>
  <!--
  <p> this is login </p>

  <form @submit.prevent="submitForm">
    <label>Login ID:</label>
    <input type="text" required v-model="login_id">
    <label>Password:</label>
    <input type="password" required v-model="password">
    <div class="submit">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4">
      Login
      </button>
    </div>
  </form>
  <p>login_id: {{login_id}}</p>
  <p>password: {{password}}</p> -->

  <div class="w-full max-w-xs mx-auto">
    <h1 class="primary-color my-4 text-3xl text-center"> Hoona </h1>
    <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 class="mb-5 text-lg">Staff Login</h1>
      <div class="mb-4">
        <label class="text-left block text-gray-700 text-sm font-bold mb-2" for="username"> Username </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          v-model="login_id"
        />
      </div>
      <div class="mb-6">
        <label class="text-left block text-gray-700 text-sm font-bold mb-2" for="password"> Password </label>
        <input
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          v-model="password"
        />
        <p class="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <!--<div class="flex items-center justify-between">-->
      <div class="">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</button>
        <!--<a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#"> Forgot Password? </a>-->
      </div>
    </form>
    <p class="text-center text-gray-500 text-xs">&copy;2021 Hoona Group. All rights reserved.</p>
  </div>

  <p class="text-red-300 text-center">login_id: {{login_id}}</p>
  <p class="text-red-300 text-center">password: {{password}}</p>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      login_id: "",
      password: "",
    };
  },
  methods: {
    submitForm() {
      console.log("submit press");
      // <router-link to="/login">Login</router-link>
      this.$router.push({ name: "Profile" });
    },
  },
};
</script>
