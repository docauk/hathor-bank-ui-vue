<script setup>
import HelloWorld from '../components/HelloWorld.vue'
import Accounts from '../components/Accounts.vue'
import CustomerGreeting from '../components/CustomerGreeting.vue';
import { onMounted, onBeforeMount } from 'vue';
import { getDecodedIdToken } from '../utils/tokens';

// onMounted(()=>{
const id_token = getDecodedIdToken()
let user = id_token["cognito:username"].toUpperCase()

console.log(user.toUpperCase())
const msg = "Hello " + user + " !"
// })

</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <CustomerGreeting :msg="msg" />
    <Accounts />
  </main>
</template>
<style scoped>
main {
    /* display: grid;
    grid-template-columns: 1fr 1fr; */
    padding: 2rem 0rem;
}

</style>
