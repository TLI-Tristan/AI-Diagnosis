<template>
    <SideNavigation />
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
                <label class="block" for="confirmation"> Based on the given data of patient, how likely is it that he will have heart disease?: </label>
                <textarea class="w-full resize-none border rounded-md background-color primary-color" v-model="confirmation" type="text" id="confirmation"> </textarea>
              </div>
              <div class="text-left mb-10">
                <label class="actions" for="details"> Possible Heart Diseases: </label>
                <textarea class="w-full resize-none border rounded-md background-color primary-color" v-model="actions" rows="5" type="text" id="actions"></textarea>
              </div>
            </div>
            <div class="text-right">
              <button class="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded" @click="SubmitDetails">Submit</button>
            </div>
          </div>

        </div>
      </div>
</template>

<script>
//import HelloWorld from "@/components/HelloWorld.vue";
import SideNavigation from "@/components/SideNavigation.vue";
//import Heart from "@/components/Heart.vue";

export default {
  name: "Heart",
  components: {
      SideNavigation,
  },
  data(){
    return{
      items: [
        ]
    }
  },
  methods:{
    SubmitDetails(){
      this.$router.push('/thankyou')
    },
  }
};
</script>

<style scoped>
table, th, td {
  border: 1px solid black;
}

table {
  border-collapse: collapse;
    margin: 50px 0;
    margin-left: 50px;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 2510px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    background-color: #009879;
}

thead, tr {
    color: #ffffff;
    text-align: left;
}

th, td {
  padding: 12px 15px;
}

tbody tr {
  border-bottom: 1px solid #dddddd;
}


tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

.button {
  transition-duration: 0.4s;
  background-color:blue;
}

</style>
