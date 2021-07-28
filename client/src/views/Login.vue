<template>
  <div class="home">
    <br>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "@/modules/login/LoginForm.vue";

export default {
  name: "Login",
  components: {
      LoginForm
  }, 
};
</script>

<style>
  
</style>
