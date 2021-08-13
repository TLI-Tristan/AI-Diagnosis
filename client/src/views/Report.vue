<template>
  <SideNavigation />
  <div class="ml-12">
    <div class="grid grid-cols-12 h-screen w-full">
      <div class="col-span-4 w-full flex flex-col px-8 pt-6 pb-8 mb-4">
        <div class="w-full mb-4 text-white">
          <button @click="navigateToReportList">&#60; Back To Report List</button>
        </div>
        <div class="w-full flex items-center justify-center">
          <div class="w-full secondary-background-color content-center primary-color p-5">
            <p class="text-2xl mb-4">Case Information</p>
            <div class="grid grid-cols-1 divide-y divide-yellow-500">
              <p>Patient ID: {{ patientid }}</p>
              <p>Patient Name: {{ patient_name }}</p>
              <p>NRIC: {{ NRIC }}</p>
              <p>Height: {{ height }}</p>
              <p>Weight: {{ weight }}</p>
              <p>Blood Type: {{ blood_type }}</p>
              <p>Race: {{ race }}</p>
              <p>Allergies: {{ allergies }}</p>
              <p>Medical History: {{ medical_history }}</p>
              <p>Priority: {{ priority }}</p>
              <p>Date: {{ date }}</p>
            </div>
          </div>
        </div>

        <div class="w-full flex items-center justify-center mt-4">
          <div class="w-full secondary-background-color content-center primary-color p-5">
            <p class="text-2xl mb-4">Doctor Information</p>
            <div class="grid grid-cols-1 divide-y divide-yellow-500">
              <p>Doctor's Name: {{ doctorName }}</p>
              <p>Doctor's Email: {{ doctorEmail }}</p>
              <p>Doctor's Contact: {{ doctorContact }}</p>
            </div>
          </div>
        </div>

        <div class="w-full flex items-center justify-center mt-4">
          <div class="w-full secondary-background-color content-center primary-color p-5">
            <p class="text-2xl mb-4">Report</p>
            <div class="grid grid-cols-1 divide-y divide-yellow-500">
              <p>Tumor Type: {{ tumorType }}</p>
              <p>Findings: {{ findings }}</p>
              <p>Treatment: {{ treatment }}</p>
              <p>Report written by: Alexander Fleming (Pathologist)</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-8 text-white px-8 pt-6 pb-8 mb-4 h-full justify-between">
        <div class="w-full h-full flex flex-col">
          <div>
            <p class="primary-action-color text-6xl mb-5 font-bold text-left">Clinical Report #{{ patientid }}</p>
          </div>
          <div class="mb-1 flex-grow flex items-center justify-center mb-2">
            <img class="object-contain min-h-full" :src="toggleActive ? imageOverlay : image" />
          </div>

          <div class="flex justify-around items-center w-full">
            <div class="flex items-center" @click="toggleActive = !toggleActive">
              <p class="text-sm mr-2 text-white">Toggle Highlight</p>
              <div class="w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out" :class="{ 'bg-green-400': toggleActive }">
                <div class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out" :class="{ 'translate-x-6': toggleActive }"></div>
              </div>
            </div>

            <div class="flex items-center">
              <button class="background-color border hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded" @click="decrement">&#60;</button>
              <p class="px-2 text-white">{{ currentImageIndex }} of {{ imageLength }}</p>
              <button class="background-color border hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded" @click="increment">&#62;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNavigation from "@/components/SideNavigation.vue";

export default {
  name: "Report",
  props: ["patientid"],
  data() {
    return {
      tumorType: "",
      findings: "",
      treatment: "",
      date: "",
      doctorContact: "",
      doctorEmail: "",
      doctorName: "",
      priority: "",
      NRIC: "",
      height: "",
      weight: "",
      blood_type: "",
      race: "",
      allergies: "",
      medical_history: "",
      patient_name: "",
      imageOverlay: "",
      image: "",
      currentImageIndex: 0,
      imageLength: 0,
      imageList: [],
      toggleActive: false,
    };
  },
  components: {
    SideNavigation,
  },
  methods: {
    navigateToReportList() {
      this.$router.push({
        name: "ReportList",
      });
    },
    increment() {
      if (this.currentImageIndex < this.imageLength) {
        this.currentImageIndex += 1;
        this.loaded = false;
        this.loadCurrentImage();
      }
    },
    decrement() {
      if (this.currentImageIndex > 1) {
        this.currentImageIndex -= 1;
        this.loaded = false;
        this.loadCurrentImage();
      }
    },
    loadCurrentImage() {
      var imageName = this.imageList[this.currentImageIndex - 1];

      fetch("http://127.0.0.1:3000/mri/getImageFile/" + this.patientid + "/" + imageName + ".png", {
        method: "GET",
      })
        .then((response) => response.blob())
        .then((blob) => {
          this.image = URL.createObjectURL(blob);
        });

      fetch("http://127.0.0.1:3000/mri/getOverlaySegmentation/" + this.patientid + "/" + imageName + ".png", {
        method: "GET",
      })
        .then((response) => response.blob())
        .then((blob) => {
          this.imageOverlay = URL.createObjectURL(blob);
        });
    },
  },

  mounted() {
    console.log(this.patientid);
    fetch("http://127.0.0.1:3000/mri/getReport/" + this.patientid, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.date = response.date;
        this.priority = response.priority;
        this.doctorContact = response.doctor_contact;
        this.doctorEmail = response.doctor_email;
        this.doctorName = response.doctor_name;
        this.NRIC = response.NRIC;
        this.height = response.height;
        this.weight = response.weight;
        this.blood_type = response.blood_type;
        this.race = response.race;
        this.allergies = response.allergies;
        this.medical_history = response.medical_history;
        this.patient_name = response.patient_name;
        this.currentImageIndex = 1;
        this.imageList = response.medical_image;
        this.treatment = response.treatment;
        this.findings = response.findings;
        this.imageLength = response.medical_image.length;
        this.tumorType = response.tumor_type;
      })
      .then(() => this.loadCurrentImage());
  },
};
</script>

<style></style>
