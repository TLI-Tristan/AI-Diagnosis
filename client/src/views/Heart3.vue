<template>
<SideNavigation />
<div class="m">
<p class="primary-color mt-5 text-2xl font-bold">PATIENT'S NAME: PETER PARKER</p>
<p class="primary-color mt-5 text-2xl font-bold">PATIENT'S ID No.: 217546</p>
<p class="primary-color mt-5 text-2xl font-bold">DATE AS OF ECG TEST: 1 JUNE 2021</p>
<p class="primary-color mt-5 text-2xl font-bold">PATIENT'S DATA:</p>
</div>
<div class="table">
<table>
<thead>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Age </th>
    <td> {{item.age}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Sex </th>
    <td> {{item.sex}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Chest Pain Type </th>
    <td> {{item.cp}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Resting Blood Pressure (in mmHg) </th>
    <td> {{item.trestbps}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Serum Cholesterol (in mg/dl) </th>
    <td> {{item.chol}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Fasting Blood Sugar > 120 mg/dl </th>
    <td> {{item.fbs}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Resting ECG Results </th>
    <td> {{item.restecg}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Maximum Heart-rate achieved </th>
    <td> {{item.thalach}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Exercise-induced Angina </th>
    <td> {{item.exang}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> ST Depression induced by exercise relative to rest </th>
    <td> {{item.oldpeak}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Slope of the peak exercise ST segment </th>
    <td> {{item.slope}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Number of Major Vessels colored by fluorosopy </th>
    <td> {{item.ca}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Thalassemia </th>
    <td> {{item.thal}} </td>
  </tr>
</thead>
</table>
</div>
</template>

<script>
//import HelloWorld from "@/components/HelloWorld.vue";
import SideNavigation from "@/components/SideNavigation.vue";

export default {
  name: "BrainTumor",
  components: {
    SideNavigation,
  },
  data(){
    return{
      items: [
        {age: 70, sex: "Male", cp: "Asymptomatic", trestbps: 130, chol: 322, fbs: "False", restecg: "Normal", thalach: 109, exang: "No", oldpeak: 2.4, slope: "Flat", ca: 2, thal: "Normal"} 
      ]
    }
  }
};
</script>

<style scoped>
.column {
  float: left;
  width: 25%;
  padding: 5px;
}

.row::after {
  content: "";
  clear: both;
  display: table;
}

div.m{
  text-align:left;
  margin-left:50px;
}

.linebreak {
  height: 3px;
  background: black;
  margin-top: 100px;
}

.linebreak2 {
  height: 3px;
  background: black;
  margin-top: 50px;
}

.vlinebreak {
  border-left: 6px solid black;
  height: 500px;
  position: absolute;
  left: 75%;
  margin-left: -3px;
  top: 654px;
}

div.m2{
  text-align:left;
  margin-left:50px;
}

div.m3{
  text-align:right;
  margin-right:450px;
}

.table{
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  min-width: 480px;
}

</style>
