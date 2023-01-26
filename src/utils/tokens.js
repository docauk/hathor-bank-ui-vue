import jwtDecode from "jwt-decode"
import { getTokenFromServer } from "../cognito/config"


const TOKEN_NAME = "hathor-token"

export function deleteToken() {
    sessionStorage.removeItem(TOKEN_NAME)
}

export function getToken() {
    const currentToken = sessionStorage.getItem(TOKEN_NAME)    
    if (!currentToken) {
        console.log("Couldn't read token from localStorage")
        return
    }
    const token = JSON.parse(currentToken)
    return token
}

export function checkToken(token) {
    // const currentToken = getToken()
    if(!token){
        return 0
    }

    console.log("Checking token with no errors...")
    // console.log(token)
    if (token.error) {
        console.log("Token has error")
        return 0
    }

    console.log("Checking token validity...")
    let access_token = jwtDecode(token.access_token)
    console.log(access_token.exp)
    console.log(Date.now() / 1000)
    if (access_token.exp < (Date.now() / 1000)) {
        console.log("Access token has expired")
        getTokenFromServer("refresh")
        return 0
    }
    console.log("Valid token found")
    return 1
}

export function checkAndGetToken(){
    const token = getToken()
    if (!checkToken(token)) {
        return 0
    }
    return token
}

export function getAccessToken() {   
    const token = checkAndGetToken()
    if (!token) {
        return 0
    }
    return token.access_token
}

export function getDecodedAccessToken() {   
    const access_token = jwtDecode(getAccessToken())
    return access_token
}

export function getIdToken() {
    const token = checkAndGetToken()
    if (!token) {
        return 0
    }
    return token.id_token
}

export function getDecodedIdToken() {
    const id_token = jwtDecode(getIdToken())
    return id_token
}