<script setup>
import HelloWorld from '../components/HelloWorld.vue'
import Stocks from '../components/Stocks.vue'
import CustomerGreeting from '../components/CustomerGreeting.vue';
import { onMounted, onBeforeMount } from 'vue';
import { getDecodedIdToken } from '../utils/tokens';

// onMounted(()=>{
const id_token = getDecodedIdToken()
let user = id_token["cognito:username"].toUpperCase()

console.log(user.toUpperCase())
const msg = "Welcome " + user + " ! - Stocks"
// })

</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <CustomerGreeting :msg="msg" />
    <Stocks />
  </main>

  <table>
  </table>
</template>
<style scoped>
main {
    /* display: grid;
    grid-template-columns: 1fr 1fr; */
    padding: 2rem 0rem;
}

</style>