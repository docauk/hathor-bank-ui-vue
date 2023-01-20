import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { cognito, getTokenFromServer } from '../cognito/config'
import { checkToken, getDecodedIdToken } from '../utils/tokens'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),

    },
    {
      path: '/error',
      name: 'error',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NotAllowedView.vue'),

    },
    {
      path: '/accounts',
      name: 'accounts',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: AccountsView
      component: () => import('../views/AccountsView.vue'),

    },
    {
      path: '/transfers',
      name: 'transfers',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: AccountsView
      component: () => import('../views/TransfersView.vue'),
      meta: { reqRoles: ["admin"] },
      beforeEnter: [checkRole]

    },
    {
      path: '/stocks',
      name: 'stocks',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: AccountsView
      component: () => import('../views/TransfersView.vue'),
      meta: { reqRoles: ["plus"] },
      beforeEnter: [checkRole]

    },
    {
      path: '/login',
      name: 'Login',

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      // redirect_uri: 'https://hathor.auth.us-west-2.amazoncognito.com/login?response_type=code&client_id=6p8lhv4tlvdjt5jelej548g26l&redirect_uri=http://localhost:8080'
    }
  ]
})

router.beforeEach(async (to, from) => {
  console.log(to)
  let currentToken = sessionStorage.getItem('hathor-token')
  if (to.name == "home") {
    if (!currentToken && !to.query.code) {
      console.log("Landing ..")
      return
    } else {
      console.log("Logged In")
      router.replace({ name: "accounts" })
    }
  }
  const url = new URL(window.location.toLocaleString());

  let token = JSON.parse(currentToken)
  let code = url.searchParams.get('code')
  console.log("Location href: " + location.href)
  console.log("Code: " + code)
  if (token) {
    console.log("Token")
  }

  if (!code) {
    console.log("No Code")
    if (!token) {
      console.log("NO NO")
      location.assign(cognito.hostedUIDomain + "/login?"
        + "response_type=code&client_id=" + cognito.clientId
        + "&redirect_uri=" + cognito.redirectUrl)
        // + "&scopes=" + cognito.scopes)
      // } else if (token.error) {
      // Not Reachhable as we don't store token if it has error
      // console.log("Token Error")
      // console.log(token.error)
      // sessionStorage.removeItem('hathor-token')
      // location.assign(cognito.hostedUIDomain + "/login?" 
      // + "response_type=code&client_id=" + cognito.clientId 
      // + "&redirect_uri=" + cognito.redirectUrl)
    } else if (!checkToken(token)) {
      console.log("Access Token No Code")
      token = await getTokenFromServer("refresh")
    }
  } else { // Code
    if (!token) {
      console.log("No Token Code")
      token = await getTokenFromServer("code", code)
      router.replace({ name: "accounts" })
    } else {
      // Not Reachhable as we remove the code from the url 
      // once we collect the token
      // if (!checkToken(token)) {
      //   sessionStorage.removeItem('hathor-token')
      //   await getToken("code", code)
      // }
    }
  }
})


function checkRole(to, from) {
  const reqRoles = to.meta.reqRoles
  console.log(reqRoles)
  const id_token = getDecodedIdToken()
  const username = id_token.username
  const userRoles = id_token["cognito:groups"]
  console.log(id_token)
  console.log(userRoles)
  // https://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-element-of-another-array-in-javascript
  const found = reqRoles.some(r=> userRoles.includes(r))
  if (!found) {
    console.log("Not Allowed")
    router.replace({ name: "error" })
  }
}




export default router
