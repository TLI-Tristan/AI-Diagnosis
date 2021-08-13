<template>
  <SideNavigation />
  <div class="ml-12">
    <div class="grid grid-cols-12 divide-x h-screen overflow-hidden">
      <div class="col-span-2">
        <!--
        <div class="flex fle-row text-white text-center divide-x border">
          <p class="flex-1">Patient</p>
          <p class="flex-1">details</p>
        </div>-->

        <div class="flex flex-col text-white divide-y h-screen">
          <p class="primary-action-color text-2xl font-bold text-center py-4 border-b-1">Unreviewed Cases</p>

          <div class="p-2 mt-2">
            <div class="bg-white flex items-center rounded-md">
              <input class="rounded-l-full w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none" v-model="searchQuery" id="search" type="text" placeholder="Search" />

              <div class="p-2">
                <span class="w-6 h-6 flex items-center justify-center"><img class="" src="../assets/loupe.svg" /></span>
              </div>
            </div>
          </div>

          <div class="overflow-y-scroll">
            <ul>
              <li
                v-bind:key="patient"
                v-for="patient in searchResultPatientList"
                class="hover:bg-blue-700 cursor-default"
                :class="{ 'bg-blue-700': patient.patient_id == selectedCase }"
                @click="patientSelect($event, patient)"
              >
                <div class="m-1 secondary-background-color">
                  <p class="text-lg p-2">{{ patient.patient_id }}</p>
                  <div class="text-sm p-2">
                    <p class="">Patient name: {{ patient.patient_name }}</p>
                    <p class="">Priority level: {{ patient.priority }}</p>
                    <p class="">Date Requested: {{ patient.date }}</p>
                  </div>
                </div>
              </li>
            </ul>
            <!--
            <a class="">
              <div class="m-1 secondary-background-color">
                <p>Jamus Lim</p>
                <p>Date Requested: 3/8/2021</p>
              </div>
            </a>-->
          </div>
        </div>
      </div>

      <div class="col-span-10 primary-color text-2xl font-bold">
        <div class="grid grid-cols-2 m-auto w-full h-full text-center">
          <div class="m-2">
            <div class="my-5">
              <p>Original #{{ currentPatientID }}</p>
            </div>
            <div>
              <img class="object-contain w-full h-full" :src="currentTumorImage" />
            </div>
          </div>
          <div class="m-2">
            <div class="my-5">
              <p>Segemented Tumor</p>
            </div>

            <div v-if="loaded" class="absolute font-normal text-sm pl-1" style="color: rgb(255, 0, 0)">&#9632; Meningioma</div>
            <div v-if="loaded" class="absolute font-normal text-sm pl-1 pt-5" style="color: rgb(0, 255, 0)">&#9632; Giloma</div>
            <div v-if="loaded" class="absolute font-normal text-sm pl-1 pt-10" style="color: rgb(0, 0, 255)">&#9632; Pituitary</div>
            <div v-if="!loaded" class="h-full w-full items-center grid justify-items-center">
              <div class="">
                <div class="breeding-rhombus-spinner">
                  <div class="rhombus child-1"></div>
                  <div class="rhombus child-2"></div>
                  <div class="rhombus child-3"></div>
                  <div class="rhombus child-4"></div>
                  <div class="rhombus child-5"></div>
                  <div class="rhombus child-6"></div>
                  <div class="rhombus child-7"></div>
                  <div class="rhombus child-8"></div>
                  <div class="rhombus big"></div>
                </div>
              </div>
            </div>
            <div v-if="loaded">
              <img class="object-contain w-full h-full" :src="toggleActive ? currentOverlayImage : currentSegementedImage" />
            </div>
          </div>
          <div class="w-full col-span-2">
            <div class="flex justify-around items-center w-full">
              <!-- Switch Container -->
              <div class="flex items-center" @click="toggleActive = !toggleActive">
                <p class="text-sm mr-2">Toggle overlay</p>
                <div class="w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out" :class="{ 'bg-green-400': toggleActive }">
                  <div class="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out" :class="{ 'translate-x-6': toggleActive }"></div>
                </div>
              </div>
              <!-- Switch Container End -->

              <div class="flex">
                <button class="background-color border hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded" @click="decrement">&#60;</button>
                <p class="px-2">{{ currentImageIndex }} of {{ imageLength }}</p>
                <button class="background-color border hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded" @click="increment">&#62;</button>
              </div>

              <div>
                <button class="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded" @click="writeReport">Write Report</button>
              </div>
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
  name: "BrainTumor",
  data() {
    return {
      loaded: false,
      selectedCase: "",
      currentTumorImage: "",
      currentSegementedImage: "",
      currentOverlayImage: "",
      currentPatientID: "",
      imageList: [],
      segmentedImageList: [],
      tumorImageList: [],
      overlayImageList: [],
      currentImageIndex: 0,
      imageLength: 0,
      toggleActive: false,
      searchQuery: null,
      patientList: [] /*[
        { id: "494848515448", priority: "1", date: "3/8/2021", docterName: "Andew Siah", doctorEmail: "andrewsiah@lgh.com", doctorContact: "84134763" },
        { id: "456", priority: "1", date: "3/8/2021", docterName: "Edward Jenner", doctorEmail: "edwardjenner@lgh.com", doctorContact: "83457259" },
        { id: "789", priority: "1", date: "3/8/2021", doctorName: "", doctorEmail: "", doctorContact: "" },
        { id: "789", priority: "1", date: "3/8/2021", doctorName: "", doctorEmail: "", doctorContact: "" },
        { id: "789", priority: "1", date: "3/8/2021", doctorName: "", doctorEmail: "", doctorContact: "" },
        { id: "789", priority: "1", date: "3/8/2021", doctorName: "", doctorEmail: "", doctorContact: "" },
        { id: "789", priority: "1", date: "3/8/2021", doctorName: "", doctorEmail: "", doctorContact: "" },
        { id: "789", priority: "1", date: "3/8/2021", doctorName: "", doctorEmail: "", doctorContact: "" },
        { id: "789", priority: "1", date: "3/8/2021", doctorName: "", doctorEmail: "", doctorContact: "" },
        { id: "789", priority: "1", date: "3/8/2021", doctorName: "", doctorEmail: "", doctorContact: "" },
        { id: "789", priority: "1", date: "3/8/2021", doctorName: "", doctorEmail: "", doctorContact: "" },
        { id: "789", priority: "1", date: "3/8/2021", doctorName: "", doctorEmail: "", doctorContact: "" },
        { id: "789", priority: "1", date: "3/8/2021", doctorName: "", doctorEmail: "", doctorContact: "" },
        { id: "789", priority: "1", date: "3/8/2021", doctorName: "", doctorEmail: "", doctorContact: "" },
        { id: "789", priority: "1", date: "3/8/2021", doctorName: "", doctorEmail: "", doctorContact: "" },
        { id: "789", priority: "1", date: "3/8/2021", doctorName: "", doctorEmail: "", doctorContact: "" },
        { id: "789", priority: "1", date: "3/8/2021", doctorName: "", doctorEmail: "", doctorContact: "" },
        { id: "789", priority: "1", date: "3/8/2021", doctorName: "", doctorEmail: "", doctorContact: "" },
      ]*/,
    };
  },
  mounted() {
    fetch("http://127.0.0.1:3000/mri/getPatientList", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        //console.log(response);
        this.patientList = response;

        var firstPatient = this.patientList[0].patient_id;
        this.currentPatientID = firstPatient;
        this.selectedCase = firstPatient;
        console.log("first patient on the list is: " + firstPatient);
      })
      .then(() => {

        this.loadSelectionData();
      })
      .catch((error) => console.log("error", error));
  },
  components: {
    SideNavigation,
  },
  methods: {
    getAllImages() {
      var imageName = this.imageList[this.currentImageIndex - 1];
      fetch("http://127.0.0.1:3000/mri/getImageFile/" + this.currentPatientID + "/" + imageName, {
        method: "GET",
      })
        .then((response) => response.blob())
        .then((blob) => {
          this.currentTumorImage = URL.createObjectURL(blob);
        })
        .catch((error) => console.log("error", error));

      fetch("http://127.0.0.1:3000/mri/getSegmentation/" + this.currentPatientID + "/" + imageName, {
        method: "GET",
      })
        .then((response) => response.blob())
        .then((blob) => {
          this.currentSegementedImage = URL.createObjectURL(blob);
          this.loaded = true;
        })
        .catch((error) => console.log("error", error));

      fetch("http://127.0.0.1:3000/mri/getOverlaySegmentation/" + this.currentPatientID + "/" + imageName, {
        method: "GET",
      })
        .then((response) => response.blob())
        .then((blob) => {
          this.currentOverlayImage = URL.createObjectURL(blob);
        })
        .catch((error) => console.log("error", error));
    },
    increment() {
      if (this.currentImageIndex < this.imageLength) {
        this.currentImageIndex += 1;
        this.loaded = false;
        this.getAllImages();
      }
    },
    decrement() {
      if (this.currentImageIndex > 1) {
        this.currentImageIndex -= 1;
        this.loaded = false;
        this.getAllImages();
      }
    },
    loadSelectionData() {
      fetch("http://127.0.0.1:3000/mri/getPatientImageFileNames/" + this.currentPatientID, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((response) => {
          //console.log(response);
          this.imageList = response;
          this.imageLength = response.length;
          this.currentImageIndex = 1;
          console.log("length of image list: " + this.imageLength);
          return this.imageList[0];
        })
        .then((image_name) => {
          console.log("first image is: " + image_name);
          fetch("http://127.0.0.1:3000/mri/getImageFile/" + this.currentPatientID + "/" + image_name, {
            method: "GET",
          })
            .then((response) => response.blob())
            .then((blob) => {
              this.currentTumorImage = URL.createObjectURL(blob);
            })
            .then(() => {
              fetch("http://127.0.0.1:3000/mri/getSegmentation/" + this.currentPatientID + "/" + image_name, {
                method: "GET",
              })
                .then((response) => response.blob())
                .then((blob) => {
                  this.currentSegementedImage = URL.createObjectURL(blob);
                  this.loaded = true;
                });

              fetch("http://127.0.0.1:3000/mri/getOverlaySegmentation/" + this.currentPatientID + "/" + image_name, {
                method: "GET",
              })
                .then((response) => response.blob())
                .then((blob) => {
                  this.currentOverlayImage = URL.createObjectURL(blob);
                });
            })
            .catch((error) => console.log("error", error));
        })
        .catch((error) => console.log("error", error));
    },
    patientSelect(e, patient) {
      //console.log(patient);
      console.log(patient.patient_id);
      this.loaded = false;
      this.selectedCase = patient.patient_id;
      if (this.currentPatientID != patient.patient_id) {
        this.currentPatientID = patient.patient_id;
        this.loadSelectionData();
      }
    },
    writeReport() {
      // <router-link to="/login">Login</router-link>
      // clear data to prevent back navigation

      this.$router.push({
        name: "BrainTumorReport",
        params: {
          patientid: this.currentPatientID,
        },
      });
    },
  },
  computed: {
    searchResultPatientList() {
      if (this.searchQuery != null) {
        return this.patientList.filter((patient) => patient.patient_id.includes(this.searchQuery) || patient.patient_name.toLowerCase().includes(this.searchQuery.toLowerCase()));
      } else {
        return this.patientList;
      }
    },
  },
};
</script>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #12232e;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #203647;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #326485;
}

.breeding-rhombus-spinner {
  height: 65px;
  width: 65px;
  position: relative;
  transform: rotate(45deg);
}

.breeding-rhombus-spinner,
.breeding-rhombus-spinner * {
  box-sizing: border-box;
}

.breeding-rhombus-spinner .rhombus {
  height: calc(65px / 7.5);
  width: calc(65px / 7.5);
  animation-duration: 2000ms;
  top: calc(65px / 2.3077);
  left: calc(65px / 2.3077);
  background-color: #ff1d5e;
  position: absolute;
  animation-iteration-count: infinite;
}

.breeding-rhombus-spinner .rhombus:nth-child(2n + 0) {
  margin-right: 0;
}

.breeding-rhombus-spinner .rhombus.child-1 {
  animation-name: breeding-rhombus-spinner-animation-child-1;
  animation-delay: calc(100ms * 1);
}

.breeding-rhombus-spinner .rhombus.child-2 {
  animation-name: breeding-rhombus-spinner-animation-child-2;
  animation-delay: calc(100ms * 2);
}

.breeding-rhombus-spinner .rhombus.child-3 {
  animation-name: breeding-rhombus-spinner-animation-child-3;
  animation-delay: calc(100ms * 3);
}

.breeding-rhombus-spinner .rhombus.child-4 {
  animation-name: breeding-rhombus-spinner-animation-child-4;
  animation-delay: calc(100ms * 4);
}

.breeding-rhombus-spinner .rhombus.child-5 {
  animation-name: breeding-rhombus-spinner-animation-child-5;
  animation-delay: calc(100ms * 5);
}

.breeding-rhombus-spinner .rhombus.child-6 {
  animation-name: breeding-rhombus-spinner-animation-child-6;
  animation-delay: calc(100ms * 6);
}

.breeding-rhombus-spinner .rhombus.child-7 {
  animation-name: breeding-rhombus-spinner-animation-child-7;
  animation-delay: calc(100ms * 7);
}

.breeding-rhombus-spinner .rhombus.child-8 {
  animation-name: breeding-rhombus-spinner-animation-child-8;
  animation-delay: calc(100ms * 8);
}

.breeding-rhombus-spinner .rhombus.big {
  height: calc(65px / 3);
  width: calc(65px / 3);
  animation-duration: 2000ms;
  top: calc(65px / 3);
  left: calc(65px / 3);
  background-color: #ff1d5e;
  animation: breeding-rhombus-spinner-animation-child-big 2s infinite;
  animation-delay: 0.5s;
}

@keyframes breeding-rhombus-spinner-animation-child-1 {
  50% {
    transform: translate(-325%, -325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-2 {
  50% {
    transform: translate(0, -325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-3 {
  50% {
    transform: translate(325%, -325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-4 {
  50% {
    transform: translate(325%, 0);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-5 {
  50% {
    transform: translate(325%, 325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-6 {
  50% {
    transform: translate(0, 325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-7 {
  50% {
    transform: translate(-325%, 325%);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-8 {
  50% {
    transform: translate(-325%, 0);
  }
}

@keyframes breeding-rhombus-spinner-animation-child-big {
  50% {
    transform: scale(0.5);
  }
}
</style>
