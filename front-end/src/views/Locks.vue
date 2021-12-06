<template>
  <div class="Locks">
    <div class="box">
      <input v-model="selectedLock" class="Search" type="text" placeholder="Enter lock name">
      <button type="button" @click="populateFields">Search</button>
      <p v-if="validLock === false">The lock name you've provided is either entered incorrectly, or does not exist.</p>
    </div>

<div v-if="validLock" class="article">
    <header>
      <h1> {{targetLock.productName}}</h1>
    </header>
    <div class="description-product-image">
      <div class="description">
        <p>
        {{targetLock.description}}
      </p>
      </div>
      <div class="product-image">
        <img v-bind:src=targetLock.image>
      </div>
    </div>
    <div class="product-stats">
      <header>
        <h3>Lock Info</h3>
      </header>
      <div class="stats-box">
        <h4>Exterior</h4>
        <ul>
          <li>Lock Type: {{targetLock.lockType}}</li>
          <li>Body Dimensions: {{targetLock.bodyDimensions}}</li>
          <li>Body Material: {{targetLock.bodyMaterial}}</li>
          <li>Shackle Thickness: {{targetLock.shackleThickeness}}</li>
          <li>Shackle Material: {{targetLock.shackleMaterial}}</li>
        </ul>
      </div>
      <div class="stats-box">
        <h4>Interior/Core</h4>
        <ul>
          <li>Core Type: {{targetLock.coreType}}</li>
          <li>Core Elements: {{targetLock.coreElements}}</li>
          <li>Keyway Type: {{targetLock.keywayType}}</li>
          <li>Core Material: {{targetLock.coreMaterial}}</li>
          <li>Core Element Material: {{targetLock.pinMaterial}}</li>
        </ul>
      </div>
    </div>
    <div class="security-stats">
      <header>
        <h3>Security Info</h3>
      </header>
      <div class="stats-box">
        <ul>
          <li>Recommended Uses: {{targetLock.recommendedUses}}</li>

        </ul>
      </div>
      <div class="stats-box">
        <header>
          <h3>References</h3>
        </header>
        <ul>
          <li>Coming in a future update! All information is acquired from the product's website or from the LockPickingLawyer.</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      selectedLock: "",
      validLock: null,
      targetLock: {},
    }
  },
    methods: {
      populateFields() {
          this.validLock = false;
          this.targetLock = this.$root.$data.lockType.find(element =>
          element.productName === this.selectedLock
        );
        if(this.targetLock == null) {
          this.validLock = false;
        }
        this.validLock = true;
      },

    async retrieveAll() {
      try {
        //Access database and set global variable for data manipulation
        let response = await axios.get("/api/locks");
        this.$root.$data.lockType = response.data;
        // response = await axios.get("/api/security");
        // this.$root.$data.securityInfo = response.data;

        //Set local arrays of template properties to aid in adding and editing.
        for (const key in this.lockTemplate) {
          this.lockTemplateArray.push(key);
        }

        // for (const key in this.securityTemplate) {
        //   this.securityTemplateArray.push(key);
        // }

        return true;
    } catch(error) {
      console.log(error);
      console.log("Error in retrieveAll function");
    }
  },
},
    created() {
      this.retrieveAll();
    }
}
</script>

<style lang="css" scoped>

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.description-product-image{
  display: flex;
  border: 1px solid blue;
  margin-left: 1%;
  margin-right: 1%;
  width: 100%;
}

.description {
  display: flex;
  padding: 2%;
  width: 50%;
  text-align: left;
  margin-left: 1%;
  margin-right: 1%;
}


.Locks header {
  display: flex;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  margin-left: 1%;
  margin-right: 1%;
  background-color: #e6f0ff;
}

.Locks {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.Locks h1 {
  font-family: "Times New Roman", serif;
  margin-left: 2%;
  font-size: 2em;
}

.Locks h3 {
  font-family: "Times New Roman", serif;
  margin-left: 2%;
  font-size: 1.5em;
}

.Locks h4 {
  font-family: "Times New Roman", serif;
  font-size: 1.25em;
  display: flex;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: .5%;
  margin-bottom: .5%;
  border-bottom: 1px solid black;
}
.Locks ul {
  margin-left: 5%;
  margin-right: 5%;
}

.product-image{
  display: flex;
  border: 1px solid black;
  width: 25%;
  max-width: 250px;
  max-height: 250px;

}

.product-stats {
  display: flex;
  flex-direction: column;

}

.security-stats {
  display: flex;
  text-align: left;
  flex-direction: column;
}

.Search{
  display: flex;
  width: 30%;
}
.stats-box {
  display: flex;
  text-align: left;
  flex-direction: column;
}
</style>
