<template>
  <SideNavigation />
  <div class="ml-12">
    <div class="grid grid-cols-12 h-screen w-full">
      <div class="col-span-4 w-full flex flex-col px-8 pt-6 pb-8 mb-4">
        <div class="w-full mb-4 text-white">
          <button @click="navigateToPatientList">&#60; Back To Patient List</button>
        </div>
        <div>
          <div v-if="toggleActive" class="absolute font-normal text-sm pl-1" style="color: rgb(255, 0, 0)">&#9632; Meningioma</div>
          <div v-if="toggleActive" class="absolute font-normal text-sm pl-1 pt-5" style="color: rgb(0, 255, 0)">&#9632; Giloma</div>
          <div v-if="toggleActive" class="absolute font-normal text-sm pl-1 pt-10" style="color: rgb(0, 0, 255)">&#9632; Pituitary</div>
          <div class="flex items-center justify-center mb-1">
            <img class="object-contain w-full h-full" :src="toggleActive ? imageOverlay : image" />
          </div>
        </div>

        <div class="w-full col-span-2 mb-3">
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
      </div>

      <div class="col-span-8 text-white px-8 pt-6 pb-8 mb-4 h-full justify-between">
        <div class="">
          <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-2" role="alert" v-if="showError">
            <p class="font-bold">Warning</p>
            <p>{{ errorMessage }}</p>
          </div>
          <p class="primary-action-color text-6xl mb-10 font-bold text-left">Clinical Report</p>
          <div class="text-left mb-10">
            <label class="block" for="tumortype"> Tumor Type: </label>
            <input class="w-full border rounded-md background-color primary-color" v-model="tumorType" type="text" id="tumortype" />
          </div>
          <div class="text-left mb-10">
            <label class="block" for="findings"> Findings: </label>
            <textarea class="w-full resize-none border rounded-md background-color primary-color" v-model="findings" rows="10" type="text" id="findings"></textarea>
          </div>
          <div class="text-left mb-10">
            <label class="block" for="treatment"> Suggested Treatment: </label>
            <textarea class="w-full resize-none border rounded-md background-color primary-color" v-model="treatment" rows="10" type="text" id="treatment"> </textarea>
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
      showError: false,
      errorMessage: "",
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
  methods: {
    navigateToPatientList() {
      this.$router.push({
        name: "BrainTumor",
      });
    },
    handleSubmit() {
      if (this.treatment == "" || this.findings == "" || this.tumorType == "") {
        this.showError = true;
        this.errorMessage = "All fields must not be empty.";
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      } else {
        console.log(this.imageList);

        fetch("http://127.0.0.1:3000/mri/addNewReport", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patient_id: this.patientid,
            tumor_type: this.tumorType,
            findings: this.findings,
            treatment: this.treatment,
            date: this.date,
            doctor_contact: this.doctorContact,
            doctor_email: this.doctorEmail,
            doctor_name: this.doctorName,
            priority: this.priority,
            NRIC: this.NRIC,
            height: this.height,
            weight: this.weight,
            blood_type: this.blood_type,
            race: this.race,
            allergies: this.allergies,
            medical_history: this.medical_history,
            patient_name: this.patient_name,
            medical_image: this.imageList,
          }),
        })
          .then((response) => {
            console.log(response);
            this.$router.push({ name: "BrainTumor" });
          })
          .catch((error) => {
            console.log("error", error);
            this.showError = true;
          });
      }
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
    fetch("http://127.0.0.1:3000/mri/getCaseData/" + this.patientid, {
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
        this.NRIC = response.NRIC;
        this.height = response.height;
        this.weight = response.weight;
        this.blood_type = response.blood_type;
        this.race = response.race;
        this.allergies = response.allergies;
        this.medical_history = response.medical_history;
        this.patient_name = response.patient_name;
        this.currentImageIndex = 1;
        this.imageLength = response.medical_image.length;
        this.imageList = response.medical_image;
      })
      .then(() => {
        this.loadCurrentImage();
      });
  },
  components: {
    SideNavigation,
  },
};
</script>

<style></style>
