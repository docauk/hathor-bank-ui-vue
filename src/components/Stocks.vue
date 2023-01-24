<script setup>
import { onMounted, ref } from 'vue'
import { getAccessToken } from '../utils/tokens'


let stocks = ref(null)
const error = ref(null)
let stockData = [
    {id: 0, stockName: "Amazon", stockSymbol:"AMZN", balance:"1000"},
    {id: 1, stockName: "Apple", stockSymbol:"AAPL", balance:"100"},
    {id: 2, stockName: "Microsoft", stockSymbol:"MSFT", balance:"20"},
    {id: 3, stockName: "Tesla", stockSymbol:"TSLA", balance:"200"},
    {id: 4, stockName: "Meta", stockSymbol:"Meta", balance:"10"},
    {id: 5, stockName: "IBM", stockSymbol:"IBM", balance:"400"},
    {id: 6, stockName: "Alphabet", stockSymbol:"GOOGL", balance:"50"},
]

defineProps({
    user: String,
})

onMounted(async () => {
    console.log("Account onMounted")
    let access_token = getAccessToken()
    console.log("Got token")
    stocks.value = stockData
    // console.log(accounts)
})

async function createNewAccount(){
    
}

</script>

<template>
    <!-- <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="accounts"> -->
    <!-- accounts loaded: -->
    <!-- <pre>{{ accounts }}</pre> -->
    
    
    <div class="section">
        <h3 class="navy">Stocks</h3>
        <table class="accounts">
            <tr>
                <th>Company</th>
                <th>Symbol</th>
                <th>Balance</th>
            </tr>
            <tr class="tr" v-for="stock in stocks">
                <td>{{ stock.stockName }}</td>
                <td>{{ stock.stockSymbol }}</td>
                <td>{{ stock.balance }}</td>
            </tr>
        </table>
        <br />
    </div>
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