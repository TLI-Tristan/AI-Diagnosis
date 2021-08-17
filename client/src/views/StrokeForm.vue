<template>
  <side-navigation />
  <div class="ml-12">
    <div class="grid grid-cols-12 h-screen w-full">
      <div class="col-span-8 text-white px-8 pt-6 pb-8 mb-4 h-full justify-between">
        <div class="">

          <p class="primary-action-color text-6xl mb-10 font-bold text-left">Patient Details</p>
          <div class="text-left mb-10">
            <label class="block" for="name"> Name of patient: </label>
            <input class="w-full resize-none border rounded-md background-color primary-color" v-model="name" type="text" id="name" />
          </div>
          <div class="text-left mb-10">
            <label class="block" for="gender"> Gender of patient: </label>
            <input type="radio" id="gender_male" value="Male" v-model="gender" />
            <label for="gender_male">Male</label> <br />
            <input type="radio" id="gender_female" value="Female" v-model="gender" />
            <label for="gender_female">Female</label> <br />
            <input type="radio" id="gender_other" value="Other" v-model="gender" />
            <label for="gender_other">Other</label>
          </div>
          <div class="text-left mb-10">
            <label class="block" for="age"> Age of patient: </label>
            <input class="w-full resize-none border rounded-md background-color primary-color" v-model="age" type="text" id="age" />
          </div>
          <div class="text-left mb-10">
            <label class="block" for="hypertension"> Has the patient suffered from Hypertension? </label>
            <input v-model="hypertension" type="radio" id="hypertension_yes" />
            <label for="hypertension_yes">Yes</label> <br />
            <input v-model="hypertension" type="radio" id="hypertension_no" />
            <label for="hypertension_yes">No</label>
          </div>
          <div class="text-left mb-10">
            <label class="block" for="heart_disease">Has the patient suffered from Heart Disease? </label>
            <input v-model="heart_disease" type="radio" id="heart_disease_yes" />
            <label for="heart_disease_yes">Yes</label> <br />
            <input v-model="heart_disease" type="radio" id="heart_disease_no" />
            <label for="heart_disease_no">No</label>
          </div>
          <div class="text-left mb-10">
            <label class="block" for="ever_married"> Has the patient married? </label>
            <input v-model="ever_married" type="radio" id="ever_married_yes" />
            <label for="ever_married_yes">Yes</label> <br />
            <input v-model="ever_married" type="radio" id="ever_married_no" />
            <label for="ever_married_yes">No</label>
          </div>
          <div class="text-left mb-10">
            <label class="block" for="avg_glucose_level"> Average Glucose Level of patient: </label>
            <input class="w-full resize-none border rounded-md background-color primary-color" v-model="avg_glucose_level" type="text" id="avg_glucose_level" />
          </div>
          <div class="text-left mb-10">
            <label class="block" for="bmi"> BMI of patient: </label>
            <input class="w-full resize-none border rounded-md background-color primary-color" v-model="bmi" type="text" id="bmi" />
          </div>
          <div class="text-left mb-10">
            <label class="block" for="smoking_status"> Smoking status of patient: </label>
            <input type="radio" id="smokes" value="smokes" v-model="smoking_status" />
            <label for="smokes">Smokes</label> <br />
            <input type="radio" id="formersmoke" value="formerly Smokes" v-model="smoking_status" />
            <label for="formersmoke">Formerly Smoke</label> <br />
            <input type="radio" id="neversmoke" value="never smokes" v-model="smoking_status" />
            <label for="neversmoke">Never Smoke</label> <br />
            <input type="radio" id="unknown" value="Unknown" v-model="smoking_status" />
            <label for="unknown">Unknown</label>
          </div>
        </div>

        <div class="text-right">
          <button class="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded" @click="submitForm">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNavigation from "../components/SideNavigation.vue";

export default {
  name: "StrokeForm",
  data() {
    return {
      showError: false,
      name: "",
      gender: "",
      age: "",
      hypertension: "",
      heart_disease: "",
      ever_married: "",
      avg_glucose_level: "",
      bmi: "",
      smoking_status: "",
    };
  },
  methods: {
    submitForm() {
      if (
        !this.name ||
        !this.gender ||
        !this.age ||
        !this.hypertension ||
        !this.heart_disease ||
        !this.ever_married ||
        !this.avg_glucose_level ||
        !this.bmi ||
        !this.smoking_status
      ) {
        this.$router.push({ name: "Stroke" });
      }

    },
  },
  components: {
    SideNavigation,
  },
};
</script>
