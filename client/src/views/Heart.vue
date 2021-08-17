<template>
    <SideNavigation />
  <div class="m">
    <p class="primary-color mt-5 text-2xl font-bold">UNREVIEWED PATIENT'S REPORTS</p>
  </div>
  <div class="container" id="table">
    <table>
    <thead>
    <tr>
      <th>Date Received</th>
      <th>ID No</th>
      <th>Patient's Name</th>
      <th>Doctor's Name</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>19 May 2021</td>
      <td> 546712 </td>
      <td>George Strange</td>
      <td>John Wayne</td>
      <td><button @click="goNext" class="block py-4 hover:bg-blue-700 px-6 flex flex-row items-center">View</button> </td>
    </tr>
    <tr>
      <td>1 June 2021</td>
      <td> 217546 </td>
      <td>Peter Parker</td>
      <td>John Wayne</td>
      <td><button @click="goThird" class="block py-4 hover:bg-blue-700 px-6 flex flex-row items-center">View</button> </td>
    </tr>
    </tbody>
    </table>
</div>
</template>

<script>
//import HelloWorld from "@/components/HelloWorld.vue";
import SideNavigation from "@/components/SideNavigation.vue";
//import Heart from "@/components/Heart.vue";

export default {
  name: "Heart",
  components: {
      SideNavigation,
  },
  data(){
    return{
      items: [
        ]
    }
  },
  methods:{
    goNext(){
      this.$router.push('/heart2')
    },
    goThird(){
      this.$router.push('/heart3')
    }
  }
};
</script>

<style scoped>
table, th, td {
  border: 1px solid black;
}

table {
  border-collapse: collapse;
    margin: 50px 0;
    margin-left: 50px;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 2510px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    background-color: #009879;
}

thead, tr {
    color: #ffffff;
    text-align: left;
}

th, td {
  padding: 12px 15px;
}

tbody tr {
  border-bottom: 1px solid #dddddd;
}


tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

.button {
  transition-duration: 0.4s;
  background-color:blue;
}

</style>
