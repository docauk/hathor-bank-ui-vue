<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import { useRouter } from 'vue-router';
import { getDecodedIdToken } from '../utils/tokens'
import { onMounted } from 'vue'

onMounted( () =>{
// const id_token = getDecodedIdToken()
// const username = id_token.username
// const roles = id_token["cognito:groups"]
// console.log(id_token)
// console.log(roles)
// if(!roles.includes("admin")){

// }
})
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Login to start the fun !</template>
    <div class="container">
  </div>

  <div class="button" type="submit" @click="logmein">Login </div>
    <br />
  </WelcomeItem>

</template>
<style>
/* conatiner{
    color: hsla(160, 100%, 37%, 1);
    
} */

.button {
  background-color: hsla(160, 100%, 37%, 1); /*#4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  display: inline-block;
  font-size: 16px;
  width: 75%
}
</style>
