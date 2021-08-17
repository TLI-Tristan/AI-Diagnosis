<template>
<SideNavigation />
<div class="m">
<p class="primary-color mt-5 text-2xl font-bold">PATIENT'S NAME: GEORGE STRANGE</p>
<p class="primary-color mt-5 text-2xl font-bold">PATIENT'S ID No.: 546712</p>
<p class="primary-color mt-5 text-2xl font-bold">DATE AS OF ECG TEST: 19 MAY 2021</p>
<p class="primary-color mt-5 text-2xl font-bold">PATIENT'S DATA:</p>
</div>
<div class="table">
<table>
<thead>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Age </th>
    <td> {{item.age}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Sex </th>
    <td> {{item.sex}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Chest Pain Type </th>
    <td> {{item.cp}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Resting Blood Pressure (in mmHg) </th>
    <td> {{item.trestbps}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Serum Cholesterol (in mg/dl) </th>
    <td> {{item.chol}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Fasting Blood Sugar > 120 mg/dl </th>
    <td> {{item.fbs}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Resting ECG Results </th>
    <td> {{item.restecg}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Maximum Heart-rate achieved </th>
    <td> {{item.thalach}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Exercise-induced Angina </th>
    <td> {{item.exang}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> ST Depression induced by exercise relative to rest </th>
    <td> {{item.oldpeak}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Slope of the peak exercise ST segment </th>
    <td> {{item.slope}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Number of Major Vessels colored by fluorosopy </th>
    <td> {{item.ca}} </td>
  </tr>
  <tr v-for= "item in items" v-bind:key="item.id">
    <th> Thalassemia </th>
    <td> {{item.thal}} </td>
  </tr>
</thead>
</table>
</div>
<div class="linebreak"></div>
<div class="container">
  <br>
  <form action = "{{url_for('heart2')}}" method="POST">
  <fieldset>
				<legend>Heart Disease Classifier</legend><br>
				  <div class="card card-body" >
					  <div class="form-group  row">
						<div class="col-sm-3">
							<label for="age">Age</label>
							<input type="number" class="form-control" id="age" name="age" required>
						</div>
						<div class="col-sm-3">
							<label for="sex">Sex</label>
							<select class="form-control" id="sex"  name="sex" required>
							  <option disabled selected value> -- Select an Option -- </option>
							  <option value = "0">Male</option>
							  <option value = "1">Female</option>
							</select>
					   </div>
					  </div>
					  <br>
					  <div class="form-group  row">
						  <div class="col-sm">
							<label for="cp">Chest Pain Type</label>
							<select class="form-control" id="cp" name = "cp" required>
							  <option disabled selected value> -- Select an Option -- </option>
							  <option value = "0">Typical Angina</option>
							  <option value = "1">Atypical Angina</option>
							  <option value = "2">Non-anginal Pain</option>
							  <option value = "3">Asymptomatic</option>
							</select>
						  </div>
						  <div class="col-sm">
							<label for="trestbps">Resting Blood Pressure in mm Hg</label>
							<input type="number" class="form-control" id="trestbps" name="trestbps"  required>
						  </div>
						  <div class="col-sm">
							<label for="chol">Serum Cholestoral in mg/dl</label>
							<input type="number" class="form-control" id="chol" name="chol" required>
						  </div>
						  <div class="col-sm">
							<label for="fbs">Fasting Blood Sugar > 120 mg/dl</label>
							<select class="form-control" id="fbs" name="fbs" required>
							  <option disabled selected value> -- Select an Option -- </option>
							  <option value = "0">False</option>
							  <option value = "1">True</option>
							</select>
						</div>
					  </div>
					  
					  <br>
					  <div class="form-group row">
							<div class="col-sm">
								<label for="restecg">Resting ECG Results </label>
								<select class="form-control" id="restecg" name="restecg" required>
								  <option disabled selected value> -- Select an Option -- </option>
								  <option value = "0">Normal</option>
								  <option value = "1">Having ST-T wave abnormality  </option>
								  <option value = "2"> Probable or definite left ventricular hypertrophy  </option>
								</select>
							  </div>
							  <div class="col-sm">
								<label for="thalach">Maximum Heart Rate</label>
								<input type="number" class="form-control" id="thalach" name="thalach" required>
							  </div>
							  <div class="col-sm">
								<label for="exang">ST Depression Induced</label>
								<input type="number" step="any" class="form-control" id="exang" name="exang" required>
							  </div>
							  <div class="col-sm">
								<label for="exang">Exercise Induced Angina </label>
								<select class="form-control" id="oldpeak" name="oldpeak" required>
								  <option disabled selected value> -- Select an Option -- </option>
								  <option value = "0">No</option>
								  <option value = "1">Yes</option>
								</select>
							  </div>
						  </div>
						  <br>
						  <div class="form-group  row">
						  <div class="col-sm">
							<label for="slope">Slope of the Peak Exercise ST Segment </label>
							<select class="form-control" id="slope" name="slope" required>
							  <option disabled selected value> -- Select an Option -- </option>
							  <option value = "0">Upsloping</option>
							  <option value = "1">Flat</option>
							  <option value = "2">Downsloping</option>
							</select>
						  </div>
						  <div class="col-sm">
							<label for="ca">Number of Vessels Colored by Flourosopy</label>
							<select class="form-control" id="ca" name = "ca" required>
							  <option disabled selected value> -- Select an Option -- </option>
							  <option value = "0">0</option>
							  <option value = "1">1</option>
							  <option value = "2">2</option>
							  <option value = "3">3</option>
							</select>
						  </div>
						  <div class="col-sm">
							<label for="thal">Thalassemia</label>
							<select class="form-control" id="thal" name = "thal" required>
							  <option disabled selected value> -- Select an Option -- </option>
							  <option value = "3">Normal</option>
							  <option value = "6">Fixed defect</option>
							  <option value = "7">Reversable defect</option>
							</select>
						  </div>
					  </div>
					  <br>
					  <div class="text-center">
              <button class="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded" @click="goNext">Predict</button>
              &nbsp;
              <button class="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded" @click="goReport">Write Report</button>
            </div>
            <div id ="result">
							<strong style="color:red">The patient is likely to have heart disease!</strong>
					 </div>
				     </div>
			 </fieldset>
			</form>
            <button type="button">Click Me!</button>
</div>
</template>

<script>
//import HelloWorld from "@/components/HelloWorld.vue";
import SideNavigation from "@/components/SideNavigation.vue";

export default {
  name: "BrainTumor",
  components: {
    SideNavigation,
  },
  data(){
    return{
      items: [
        {age: 70, sex: "Male", cp: "Asymptomatic", trestbps: 130, chol: 322, fbs: "False", restecg: "Normal", thalach: 109, exang: "No", oldpeak: 2.4, slope: "Flat", ca: 2, thal: "Normal"} 
      ]
    }
  },
  methods:{
    goReport(){
      this.$router.push('/report')
    }
  }
};
</script>

<style>
.column {
  float: left;
  width: 25%;
  padding: 5px;
}

.row::after {
  content: "";
  clear: both;
  display: table;
}

div.m{
  text-align:left;
  margin-left:50px;
}

.linebreak {
  height: 3px;
  background: black;
  margin-top: 50px;
}

.linebreak2 {
  height: 3px;
  background: black;
  margin-top: 50px;
}

.vlinebreak {
  border-left: 6px solid black;
  height: 500px;
  position: absolute;
  left: 75%;
  margin-left: -3px;
  top: 654px;
}

div.m2{
  text-align:left;
  margin-left:50px;
}

div.m3{
  text-align:right;
  margin-right:450px;
}

.table{
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  min-width: 480px;
}

fieldset {
  margin: auto;
  padding: 1em 2em;
  border: solid 1px #ccc;
  border-radius: 6px;
  width: 2540px;
}

legend {
  font-size: 1.25em;
  padding: 0 .25em;
  color: #999;
}

label{
  display: block;
  margin-top: 1em;
  color: gray;
}

.checks label{
  margin-top: 0;
}

label:first-of-type{
  margin-top: 0; 
}

button{
  padding: .5em 1em;
  border-radius: 6px;
  background-color: #333;
  color: #fff;
  font-family: "Lato", sans-serif;
  font-size: .8em;
}

.form-control{ 
    height: 20px;
    width: 200px;
}
</style>
