<template>
  <div class="home">
    <div class="p-5">
      <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-2" role="alert" v-if="showError">
        <p class="font-bold">Warning</p>
        <p>{{ errorMessage }}</p>
      </div>
    </div>

    <div class="w-full max-w-xs mx-auto">
      <h1 class="primary-color my-4 text-3xl text-center">Hoona</h1>
      <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 class="mb-5 text-lg text-center">Staff Login</h1>
        <div class="mb-4">
          <label class="text-left block text-gray-700 text-sm font-bold mb-2" for="username"> Username </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': showError }"
            id="username"
            type="text"
            v-model="login_id"
          />
          <p class="text-red-500 text-xs italic" v-if="showError">{{ loginIDMessage }}</p>
        </div>
        <div class="mb-6">
          <label class="text-left block text-gray-700 text-sm font-bold mb-2" for="password"> Password </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': showError }"
            id="password"
            type="password"
            v-model="password"
          />
          <p class="text-red-500 text-xs italic" v-if="showError">{{ passwordMessage }}</p>
        </div>
        <!--<div class="flex items-center justify-between">-->
        <div class="text-center">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</button>
          <!--<a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#"> Forgot Password? </a>-->
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">&copy;2021 Hoona Group. All rights reserved.</p>
    </div>
    <!--
    <p class="text-red-300 text-center">login_id: {{ login_id }}</p>
    <p class="text-red-300 text-center">password: {{ password }}</p>-->
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login_id: "",
      password: "",
      showError: false,
      errorMessage: "",
      passwordMessage: "",
      loginIDMessage: "",
    };
  },
  methods: {
    submitForm() {
      console.log("sign in pressed");
      this.showError = false;

      if (this.login_id == "" || this.password == "") {
        this.showError = true;
        this.errorMessage = "All fields must not be empty";
        this.passwordMessage = "Password must not be empty";
        this.loginIDMessage = "Login ID must not be empty";
      } else {
        fetch("http://127.0.0.1:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login_id: this.login_id,
            password: this.password,
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            if (response.result == "success") {
              this.$router.push({ name: "Profile" });
            } else {
              this.showError = true;
              this.errorMessage = "Invalid Login Credentials";
              this.passwordMessage = "Invalid Credential";
              this.loginIDMessage = "Invalid Credential";
            }
          })
          .catch((error) => console.log("error", error));
      }
    },
  },
};
</script>

<style></style>
