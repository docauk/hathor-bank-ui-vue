import jwtDecode from "jwt-decode"

export const cognito = {
    userPoolId: 'us-west-2_h8atoRNOJ',
    userPoolName: 'hathor',
    hostedUIDomain: import.meta.env.VITE_COGNITO_DOMAIN,
    clientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
    redirectUrl: import.meta.env.VITE_BASE_URL,
    region: 'us-west-2',
    scopes: 'openid email admin'
    // tokenName: 'hathor-token'
    // grantType: 'authorization-code'
}

export async function getTokenFromServer (type, code) {
    let token = ""
    const reqOpt = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
    if (type == "code") {
      const resp = await fetch(cognito.hostedUIDomain + "/oauth2/token?"
        + new URLSearchParams(
          {
            grant_type: 'authorization_code',
            client_id: cognito.clientId,
            code: code,
            redirect_uri: cognito.redirectUrl
          }), reqOpt)
          token = await resp.json()
    } else if (type == "refresh") {
      console.log("Refresh Token")
      const refresh_token = JSON.parse(sessionStorage.getItem('hathor-token')).refresh_token
      const resp = await fetch(cognito.hostedUIDomain + "/oauth2/token?"
        + new URLSearchParams(
          {
            grant_type: 'refresh_token',
            client_id: cognito.clientId,
            refresh_token: refresh_token,
            // redirect_uri: cognito.redirectUrl
          }), reqOpt)
          token = await resp.json()
          token.refresh_token = refresh_token
    }
  
    console.log("Token")
    console.log(token)
    if (!token.error) {
      sessionStorage.setItem('hathor-token', JSON.stringify(token))
    }
    return token
  }

