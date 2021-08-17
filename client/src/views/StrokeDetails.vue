<template>
  <side-navigation/>
  <div class="ml-12">
    <div class="grid grid-cols-12 h-screen w-full">
      <div class="col-span-4 w-full flex flex-col px-8 pt-6 pb-8 mb-4">
        <div class="w-full mb-4 text-white">
          <button @click="navigateToList">&#60; Back To Patient List</button>
        </div>
        <div class="w-full flex items-center justify-center">
          <div class="w-full secondary-background-color content-center primary-color p-5">
            <p class="text-2xl mb-4">Case Information</p>
            <div class="grid grid-cols-1 divide-y divide-yellow-500" v-bind:key="StrokePatient" v-for="StrokePatient in StrokePatient">
              <p>Name: {{ StrokePatient.name }}</p>
              <p>Gender: {{ StrokePatient.gender }}</p>
              <p>Age: {{ StrokePatient.age }}</p>
              <p>History of hypertension: {{ StrokePatient.hypertension }}</p>
              <p>History of heart disease: {{ StrokePatient.heart_disease }}</p>
              <p>Martial status: {{ StrokePatient.ever_married }}</p>
              <p>Average Glucose Level: {{ StrokePatient.avg_glucose_level }}</p>
              <p>BMI: {{ StrokePatient.bmi }}</p>
              <p>Smoking status: {{ StrokePatient.smoking_status }}</p>
              <p>Allergies: {{ StrokePatient.allergies }}</p>
              <p>Chance of Stroke: {{StrokePatient.strokeChance}}</p>
            </div>
          </div>
        </div>

        <div class="w-full flex items-center justify-center mt-4">
          <div class="w-full secondary-background-color content-center primary-color p-5">
            <p class="text-2xl mb-4">Doctor Information</p>
            <div class="grid grid-cols-1 divide-y divide-yellow-500" v-bind:key="StrokeDoctor" v-for="StrokeDoctor in StrokeDoctor">
              <p>Doctor's Name: {{ StrokeDoctor.doctorName }}</p>
              <p>Doctor's Email: {{ StrokeDoctor.doctorEmail }}</p>
              <p>Doctor's Contact: {{ StrokeDoctor.doctorContact }}</p>
            </div>
          </div>
        </div>

      </div>

      <div class="col-span-8 text-white px-8 pt-6 pb-8 mb-4 h-full justify-between">
        <div class="w-full h-full flex flex-col">
          <div>
            <p class="primary-action-color text-6xl mb-5 font-bold text-left">Patient Report</p>
          </div>

          <div class="col-span-8 text-white px-8 pt-6 pb-8 mb-4 h-full justify-between">
            <div class="">
              <div class="text-left mb-10">
                <label class="block" for="details"> Details: </label>
                <textarea class="w-full resize-none border rounded-md background-color primary-color" v-model="details" rows="15" type="text" id="details"></textarea>
              </div>
              <div class="text-left mb-10">
                <label class="block" for="confirmation"> Based on what the patient has mentioned and the details, how likely is it that he will have stroke?: </label>
                <textarea class="w-full resize-none border rounded-md background-color primary-color" v-model="confirmation" type="text" id="confirmation"> </textarea>
              </div>
              <div class="text-left mb-10">
                <label class="actions" for="details"> Suggested Actions: </label>
                <textarea class="w-full resize-none border rounded-md background-color primary-color" v-model="actions" rows="5" type="text" id="actions"></textarea>
              </div>
            </div>
            <div class="text-center">
              <button class="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded" @click="SubmitDetails">Submit</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<script>
import SideNavigation from '../components/SideNavigation.vue';
export default {
  name: "StrokeDetails",

  methods:{
    navigateToList(){
    this.$router.push('/Stroke'); 
    },
    SubmitDetails(){
      this.$router.push('/Stroke')
    }
  },

  data() {
    return {
      StrokePatient: [ { name: "Alex", gender: "Male", age: "60", hypertension:"Yes", heart_disease:"No", ever_married:"Yes", avg_glucose_level:"120mg/dL", bmi:"35", smoking_status:"Never smoked", allergies:"None", strokeChance: "65%" }, ],
      StrokeDoctor: [ { doctorName: "John", doctorEmail: "JohnDoe@email.com", doctorContact: "62546578", } ]
    };
  },

  components: {
    SideNavigation
      
  },
};
</script>