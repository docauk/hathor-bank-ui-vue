<script setup>
import { getAccessToken } from '../utils/tokens'
import { onMounted, ref } from 'vue'

let accounts = ref(null)
let accountFrom = ref(0)
// let accountFrom = null

onMounted(async () => {
  console.log("Account onMounted")
  let access_token = getAccessToken()
  console.log("Got token")
  const reqOpt = {
    method: "GET",
    headers:
    {
      "Content-Type": "application/json",
      "Authorization": "bearer " + access_token
    }
    ,
  }
  const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/accounts', reqOpt)
  // let accounts = await res.json()
  accounts.value = await res.json()
})
</script>

<template>

  <div class="transfer" id="transfer">

    <select v-model="accountFrom" placeholder="Account From">
      <option value="" disabled selected>Account From</option>
      <!-- <option value="" disabled selected>Select your option</option> -->
      <option v-for="account in accounts" :value="account">
        {{ account.accountType }} - {{ account.accountId }}
      </option>
    </select>

    <input type="number" :max=accountFrom.balance :placeholder=accountFrom.balance />
    <input type="uuid" placeholder="Account To" />
    <button @click="transfer()">Transfer</button>

  </div>
</template>
<style scoped>
/* conatiner{
    color: hsla(160, 100%, 37%, 1);
    
} */

.transfer {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 200px;
  width: 50%;
}

input,
select,
button {
  background-color: white;
  border: 2px solid #182860;
  border-radius: 4px;
  padding: 10px;
  font-size: medium;
}

button {
  color: white;
  background-color: #f76c16;
  border: none;
}

.button {
  background-color: hsla(160, 100%, 37%, 1);
  /*#4CAF50; /* Green */
  color: white;
  /* padding: 15px 32px; */
  padding: 10px;
  text-align: center;
  border-radius: 8px;
  /* display: inline-block; */
  font-size: 16px;
  width: 75%;
  margin: 5px;
}
</style>
