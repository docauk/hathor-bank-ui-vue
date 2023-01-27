<script setup>
import { onMounted, ref } from 'vue'
import { getAccessToken, getDecodedAccessToken, getDecodedIdToken } from '../utils/tokens'
import { v4 as uuidv4 } from 'uuid'


let accounts = ref(null)
let accountDetails = ref(null)
const error = ref(null)
let accountSelected = ref(null)

defineProps({
    user: String,
})

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
    console.log(import.meta.env.VITE_API_BASE_URL)
    const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/accounts', reqOpt)
    // let accounts = await res.json()
    accounts.value = await res.json()
    // console.log(accounts)
})

async function getAccountDetails(accountId) {
    console.log(accountSelected)
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
    const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/account-details/account/' + accountId, reqOpt)
    // let accounts = await res.json()
    if (res.status == 200) {
        accountSelected.value = accountId
        accountDetails.value = await res.json()
    }

}

async function createNewAccount(){
    console.log("Create New Account Requested")
    let access_token = getAccessToken()
    let decoded_access_token = getDecodedAccessToken()
    // if(decoded_access_token["cognito:groups"].includes("admin")){
        if(1){
    // console.log(decoded_access_token)
    const reqOpt = {
        method: "POST",
        headers:
        {
            "Content-Type": "application/json",
            "Authorization": "bearer " + access_token
        },
        body: JSON.stringify({
            accountId: uuidv4(),
            owner: decoded_access_token["username"],
            accountType: "Extra",
            balance: 0
        })

    }
    const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/accounts/', reqOpt)
    // let accounts = await res.json()
    if (res.status == 201) {
        console.log("New Account Created")
        alert("New Account created refresh the page to see it in the list")
    }
}else{
    alert("You need admin permission to create new accounts !")
}
}

</script>

<template>
    <!-- <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="accounts"> -->
    <!-- accounts loaded: -->
    <!-- <pre>{{ accounts }}</pre> -->
    
    
    <div class="section">
        <h3 class="navy">Accounts</h3>
        <table class="accounts">
            <tr>
                <th>Account</th>
                <th>Type</th>
                <th>Balance</th>
            </tr>
            <tr @click="getAccountDetails(account.accountId)" class="tr" v-for="account in accounts">
                <td>{{ account.accountId }}</td>
                <td>{{ account.accountType }}</td>
                <td>{{ account.balance }}</td>
            </tr>
        </table>
        <br />
        <button v-if="getDecodedAccessToken()['cognito:groups'].includes('admin')" @click="createNewAccount()">Create New Account</button>
    </div>
    
    <div v-if="accountSelected" class="section">

    <h3 class="navy">Details</h3>
        <table class="accounts">
            <tr>
                <th :style="{ 'background-color': '#182860'}">Time</th>
                <th :style="{ 'background-color': '#182860'}">Type</th>
                <th :style="{ 'background-color': '#182860'}">Amount</th>
            </tr>
            <tr class="tr" v-for="accountDetail in accountDetails">
                <td>{{ accountDetail.time }}</td>
                <td>{{ accountDetail.transactionType }}</td>
                <td>{{ accountDetail.amount }}</td>
            </tr>
        </table>
    </div>
    <!-- <div v-else>Loading...</div> -->
</template>
<style scoped>
h3 {
  font-size: 1.2rem;
}
/*  */

input, select, button{
  border: 2px solid #182860;
  background-color: white;
  border-radius: 4px;
  padding: 10px;
  font-size: medium;
}

button {
background-color: #f76c16;

color: white;
  border: none;
}
button:hover{
    cursor: pointer;
}

.section {
    width: 75%;
    padding: 2rem 0rem;
}

.accounts {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

.accounts td,
.accounts th {
    /* border: 1px solid #ddd; */
    padding: 8px;
}

/* .accounts tr:nth-child(even){background-color: #f2f2f2;} */

.accounts tr:hover {
    /* background-color: #ddd; */
    cursor: pointer;
    /* color: #57e0ae; */
    color: #f67c16;
}

.accounts th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    /* background-color: #04AA6D; */
    /* background-color: orange; */
    background-color: #182860;
    color: white;
}

.tr {
    border-bottom: 1px solid #182860;
    /* border-bottom: 1px solid #04AA6D; */
    /* border-bottom: 1px solid orange; */
}
</style>