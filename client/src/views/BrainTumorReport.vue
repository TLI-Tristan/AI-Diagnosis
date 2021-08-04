<template>
  <SideNavigation />
  <div class="ml-12">
    <div class="grid grid-cols-12 h-screen w-full">
      <div class="col-span-4 w-full flex flex-col px-8 pt-6 pb-8 mb-4">
        <div class="flex items-center justify-center mb-10">
          <img class="object-contain w-full h-full" :src="image" />
        </div>
        <div class="w-full flex items-center justify-center">
          <div class="w-full secondary-background-color content-center primary-color p-5">
            <p class="text-2xl mb-4">Case Information</p>
            <div class="grid grid-cols-1 divide-y divide-yellow-500">
              <p>Patient ID: {{ patientid }}</p>
              <p>Doctor's Name: {{ doctorName }}</p>
              <p>Doctor's Email: {{ doctorEmail }}</p>
              <p>Doctor's Contact: {{ doctorContact }}</p>
              <p>Priority: {{ priority }}</p>
              <p>Date: {{ date }}</p>
            </div>
          </div>
        </div>
        <!--
        <div class="flex items-center justify-center">
            <p class="text-white">te</p>
        </div>-->
      </div>

      <div class="col-span-8 text-white px-8 pt-6 pb-8 mb-4 h-full justify-between">
        <div class="">
          <p class="primary-action-color text-6xl mb-10 font-bold text-left">Clinical Report</p>
          <div class="text-left mb-10">
            <label class="block" for="tumortype"> Tumor Type: </label>
            <input class="w-full border rounded-md background-color primary-color" v-model="tumorType" type="text" id="tumortype" />
          </div>
          <div class="text-left mb-10">
            <label class="block" for="findings"> Findings: </label>
            <textarea class="w-full resize-none border rounded-md background-color primary-color" v-model="findings" rows="8" type="text" id="findings"></textarea>
          </div>
          <div class="text-left mb-10">
            <label class="block" for="treatment"> Suggested Treatment: </label>
            <textarea class="w-full resize-none border rounded-md background-color primary-color" v-model="treatment" rows="8" type="text" id="treatment"> </textarea>
          </div>
        </div>
        <div class="text-right">
          <button class="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded" @click="handleSubmit">Submit Report</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNavigation from "@/components/SideNavigation.vue";

export default {
  name: "BrainTumorReport",
  props: ["patientid"],
  data() {
    return {
      tumorType: "",
      findings: "",
      treatment: "",
      date: "ss",
      doctorContact: "",
      doctorEmail: "",
      doctorName: "",
      priority: "",
      imageName: "",
      image: "",
    };
  },
  methods: {
    handleSubmit() {

      fetch("http://127.0.0.1:3000/addNewReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
          patientid: this.patientid,
          tumor_type: this.tumorType,
          findings: this.findings,
          treatment: this.treatment,
          
        }),
      })
      .then((response => response.json()))
      .then((response) => {
        console.log(response);
      }).catch((error) => console.log("error", error));

      this.$router.push({ name: "BrainTumor" });
    },
  },
  mounted() {
    console.log(this.patientid);
    fetch("http://127.0.0.1:3000/getCaseData/" + this.patientid, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        //console.log(response);
        this.date = response.date;
        this.priority = response.priority;
        this.doctorContact = response.doctor_contact;
        this.doctorEmail = response.doctor_email;
        this.doctorName = response.doctor_name;
        this.imageName = response.medical_image[0] + ".png";
      })
      .then(() => {
        fetch("http://127.0.0.1:3000/getImageFile/" + this.patientid + "/" + this.imageName, {
          method: "GET",
        })
          .then((response) => response.blob())
          .then((blob) => {
            this.image = URL.createObjectURL(blob);
          });
      });
  },
  components: {
    SideNavigation,
  },
};
</script>

<style></style>
