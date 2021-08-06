<template>
  <SideNavigation />
  <div class="">
    <p class="primary-color mt-5 text-2xl font-bold text-center">Medical Report List</p>
  </div>
  <div class="text-white ml-12 p-4">
    <table class="min-w-full">
      <thead>
          <tr>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Patient ID</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">tumor_type</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">findings</th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Treatments</th>
              <th class="px-6 py-3 border-b-2 border-gray-300"></th>
          </tr>
      </thead>
      <tbody class="background-color">
        <tr v-bind:key="report" v-for="report in reportList">
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <div class="flex items-center">
                    <div>
                        <div class="text-sm leading-5 primary-color">{{ report.patientid }}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                <div class="text-sm leading-5 primary-color">{{ report.tumor_type }}</div>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b primary-color border-gray-500 text-sm leading-5">{{ report.findings }}</td>
            <td class="px-6 py-4 whitespace-no-wrap border-b primary-color border-gray-500 text-sm leading-5">{{ report.treatment }}</td>
            <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                <button class="px-5 py-2 border-blue-500 border primary-color rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">View Details</button>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SideNavigation from "@/components/SideNavigation.vue";

export default {
  name: "ReportList",
  data() {
    return {
      reportList: [],
    };
  },
  components: {
    SideNavigation,
  },
  mounted() {
    fetch("http://127.0.0.1:3000/getReportList", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        //console.log(response);
        this.reportList = response;
        console.log(this.reportList);
      });
    
  },
};
</script>

<style></style>
