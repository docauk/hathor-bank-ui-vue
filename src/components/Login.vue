<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

  
function logmein(){
  console.log("Hello")
  // import { useRoute } from 'vue-router';
  router.push({ name: "Login"})
}

// function logmein(){
//   location.assign("https://hathor.auth.us-west-2.amazoncognito.com/login?response_type=code&client_id=6p8lhv4tlvdjt5jelej548g26l&redirect_uri=http://localhost:8080")
// }
</script>

<template>
  <!-- <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Login to start the fun !</template>
    <div class="container">
  </div>

  <div class="button" type="submit" @click="logmein">Login </div>
    <br />
  </WelcomeItem> -->

  <h2 class="navy"> Login to start the fun ! </h2>

  <div class="button" type="submit" @click="logmein">Login </div>


</template>
<style>
/* conatiner{
    color: hsla(160, 100%, 37%, 1);
    
} */

.button {
  background-color: #f76c16; /*hsla(160, 100%, 37%, 1); /*#4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  display: inline-block;
  font-size: 16px;
  width: 75%;
  cursor: pointer;
}
</style>
