<template>
  <div class="Admin">
    <header>
      <h1>Admin Pages</h1>
    </header>
    <form class="Update">
      <h2>Update Items</h2>
      <input v-model="searchLock" type="text" placeholder="Lock Name">
      <button type="button" @click="modifyEntry">Modify Entry</button>
      <div class="editLock" v-if="editItem === true">
        <br>
        <ul>
          <div class="box">
          <li :key=key v-for="(property, key) in editLock">
            <p>{{key}}</p>
            <ul>
              <!-- <li><textarea spellcheck="true" v-model=editLock[key] class="newItemProperty" type="text"  v-bind:placeholder=key></textarea></li> -->
            </ul>
          </li>
        </div>
        </ul>
        <button type="button" @click="uploadChanges">Save</button>
        <div v-if="editLock === undefined">
          <h2>The product you are searching is not in the database.</h2>
        </div>
        <br>
      </div>

      <!-- <div class="lock-suggestions" v-if="lockSuggestions.length > 0">
        <div class="suggestion" v-for="s in lockSuggestions" :key="s.id" @click="selectItem(s)">
          {{s.productName}}
        </div> -->
      <!-- </div> -->
  </form>
  <h2>Add Items</h2>
  <button type="button" @click="createNew">Create New Entry</button>
  <div class="addItems" v-if="createNewItem === true" >
  <br>
  <ul>
    <input v-model=newLockProperties[key] class="newItemProperty" type="text" :key=key v-bind:placeholder = key v-for="(property, key) in newLockProperties" >
  </ul>
  <br>
  <button type="button" @click="addNewItem">Save</button>
  <button type="button" @click="retrieveAll">Retreive All</button>
  </div>
  <div class="deleteItems">
    <h2>Delete Items</h2>
    <input v-model="findLock" type="text" placeholder="Lock Name">
    <button class="deleteItem" type="button" @click="deleteItem">Delete</button>
    <p v-if="success === true">Object deleted. Refresh the page to delete another.</p>
  </div>
</div>
</template>


<script>
import axios from "axios";
export default {

  data() {
    return {
      selectedLock: undefined,
      searchLock: "",
      lockTemplate: null,
      securityTemplate: null,
      lockTemplateArray: [],
      securityTemplateArray: [],
      newLockProperties: {},
      newLockSecurityProperties: null,
      createNewItem: false,
      editItem: false,
      editLockProperties: [],
      editLock: {},
      findLock: "",
      success: false,
    }
  },
  computed: {
  lockSuggestions() {
    let items = this.$root.$data.lockType.filter(item => item.productName.toLowerCase().startsWith(this.searchLock.toLowerCase()));
    return items.sort((a,b) => a.title > b.title);
  }

},
  created() {
    this.retrieveAll();
  },



  methods: {
    createNew()
    {
      this.createNewItem = true;
    },
    async retrieveAll() {
      try {
        //Access database and set global variable for data manipulation
        let response = await axios.get("/api/locks");
        this.$root.$data.lockType = response.data;
        response = await axios.get("/api/security");
        this.$root.$data.securityInfo = response.data;

        this.lockTemplate = this.$root.$data.lockType.find((element) => element.productName === "template");
        this.securityTemplate = this.$root.$data.securityInfo.find((element) => element.productName === "template");

        //Set local arrays of template properties to aid in adding and editing.
        for (const key in this.lockTemplate) {
          this.lockTemplateArray.push(key);
        }

        for (const key in this.securityTemplate) {
          this.securityTemplateArray.push(key);
        }

        //set up new item key value pairs
        for (const value in this.lockTemplate) {
          this.newLockProperties[`${value}`] = "";
        }

        return true;
    } catch(error) {
      console.log(error);
      console.log("Error in retrieveAll function");
    }
  },


    // selectItem(item) {
    //   this.searchLock = "";
    //   this.findLock = item;
    // },

    modifyEntry() {
      this.editItem = true;
      this.editLock = this.$root.$data.lockType.find((element) =>
        element.productName === this.searchLock
      );
    },

    async addNewItem() {
      try {
      await axios.post("/api/newLock", this.newLockProperties);
      await this.retrieveAll();
      this.newLockProperties = {};
    } catch(error){
      console.log(error);
      console.log("Error in addNewItem - client side");
    }
    },

    async uploadChanges() {
      try {
        await axios.put("/api/editlock", this.editLock);
        await this.retrieveAll();
        this.editLock = {};
      } catch(err) {
        console.log(err);
        console.log("Error in updating changed object");
      }
    },

    async deleteItem() {
      try {
        let targetLock = {};
        targetLock = this.$root.$data.lockType.find((element) =>
        element.productName === this.findLock
      );
        await axios.delete("/api/deleteLock", {data: targetLock});
        this.success = true;
        await this.retrieveAll();
      } catch(error) {
        console.log(error);
        console.log("Error in object deletion - front end");
      }
    }
  }
}
</script>

<style lang="css" scoped>

.Admin {

}

.box {
  display: flex;
  flex-direction: column;
}

button {
  padding: 1px;
}

.deleteItem {
  background-color: red;
  margin-left: 5px;
}

.editLock {
  display: flex;
  flex-direction: column;

}

li {
  list-style-type: none;
}

.newItemProperty {
  display: block;
  text-align: center;
}

</style>
