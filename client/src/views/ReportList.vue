<template>
  <SideNavigation />
  <div class="">
    <p class="primary-color mt-5 text-2xl font-bold text-center">Report List</p>
    
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
