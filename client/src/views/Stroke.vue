<template>
  <side-navigation/>
  <div class="">
    <p class="primary-color mt-5 text-2xl font-bold text-center">Medical Report List</p>
  </div>
  <div class="text-left" style="margin: 50px;">
    <button class="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded" @click="NewPatient">New Patient Form</button>
  </div>
  <div class="text-white ml-12 p-4">
    <table class="min-w-full">
      <thead>
        <tr>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Patient Name</th>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Patient's Gender</th>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Patient's Age</th>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Chance of Getting Stroke</th>
          <th class="px-6 py-3 border-b-2 border-gray-300 text-right">
            <input class="rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none" v-model="searchQuery" id="search" type="text" placeholder="Search" />
          </th>
        </tr>
      </thead>
      <tbody class="background-color">
        <tr v-bind:key="StrokeForm" v-for="StrokeForm in searchStrokeFormList">
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <div class="flex items-center">
              <div>
                <div class="text-sm leading-5 primary-color">{{ StrokeForm.name }}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
            <div class="text-sm leading-5 primary-color">{{ StrokeForm.gender }}</div>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b primary-color border-gray-500 text-sm leading-5">{{ StrokeForm.age }}</td>
          <td class="px-6 py-4 whitespace-no-wrap border-b primary-color border-gray-500 text-sm leading-5">{{ StrokeForm.treatment }}</td>
          <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
            <button class="px-5 py-2 border-blue-500 border primary-color rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none" @click="viewDetails($event, StrokeForm.name)">
              View Details
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <button class="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded" style="margin:50px;" @click="Details">Details</button>

</template>


<script>
import SideNavigation from '../components/SideNavigation.vue';

export default {
  name: "Stroke",

  methods:{
    NewPatient(){
    this.$router.push('/StrokeForm'); 
    },
    viewDetails(){
      this.$router.push('/StrokeDetails')
    },
    Details(){
      this.$router.push('/StrokeDetails')
    }
  },

  components: {
    SideNavigation
  },
};
</script>
