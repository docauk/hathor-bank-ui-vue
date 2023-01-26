<script setup>
import Transfers from '../components/Transfers.vue'
import CustomerGreeting from '../components/CustomerGreeting.vue';
import { getDecodedIdToken } from '../utils/tokens';

const id_token = getDecodedIdToken()
let user = id_token["cognito:username"].toUpperCase()

console.log(user.toUpperCase())
const msg = "Hello " + user + " ! - Transfers"

</script>

<template>
  <main>
    <!-- <TheWelcome /> -->
    <CustomerGreeting :msg="msg"/>
    <Transfers />
  </main>
</template>
<style scoped>

</style>