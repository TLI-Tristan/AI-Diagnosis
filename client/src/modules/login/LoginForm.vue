<template>
  <p> this is login </p>

  <form @submit.prevent="submitForm">
    <label>Login ID:</label>
    <input type="text" required v-model="email">
    <label>Password:</label>
    <input type="password" required v-model="password">
    <div class="submit">
      <button>Login</button>
    </div>
  </form>
  <p>email: {{email}}</p>
  <p>password: {{password}}</p>
</template>

<script>

export default {
  name: "LoginForm",
  data() {
      return {
          email: "",
          password: ""
      }
  },
  methods: {
    submitForm(){
      console.log("submit press");
      // <router-link to="/login">Login</router-link>
      this.$router.push({ name:'Profile' });
    }
  }

};
</script>

<style>
 form{
    max-width: 420px;
    margin: 30px auto;
    background: #FFFFFF;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
 }
 label{
   color: #aaa;
   display: inline-block;
   margin: 25px 0 15px;
   font-size: 0.6em;
   text-transform: uppercase;
   letter-spacing: 1px;
   font-weight: bold;

 }
 input {
   display: block;
   padding: 10px 6px;
   width: 100%;
   box-sizing: border-box;
   border: none;
   border-bottom: 1px solid #ddd;
   color: #555
 }
 .submit {
   text-align: center;
 }
 button {
   background: #0b6dff;
   border: 0;
   padding: 10px 20px;
   margin-top: 20px;
   color: #ffffff;
   border-radius: 15px;
 }

</style>
