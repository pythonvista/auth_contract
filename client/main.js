import { ethers } from 'https:/cdn-cors.ethers.io/lib/ethers-5.5.4.esm.min.js';

import contractAbi from '../build/contracts/Todos.json' assert { type: 'json' };
import contractAddress from '../config.js';

let connect = document.getElementById('connect');
let addaccount = document.getElementById('addaccount');
let login = document.getElementById('login');
let error = document.getElementById('error')

check()
async function check(){
    try{
        const {ethereum} = window;
        let selectedAddress = await ethereum.selectedAddress;
        if(!selectedAddress){
           connect.style.display = 'flex';
           addaccount.style.display = 'none';
        }else{
            connect.style.display = 'none';
            addaccount.style.display = 'flex';
            let address = document.querySelector(".address")
            address.innerText = selectedAddress;
        }
    }catch(err){
        console.log(err)
    }
}



async function connectWallet() {
  try {
    const { ethereum } = window;
    if (ethereum) {
      console.log('Wallet  Connected');
      let chainId = await ethereum.request({ method: 'eth_chainId' });
      let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      check();
    } else {
      alert('Wallect not connected.. Download Metamask Wallet');
    }
  } catch (err) {
    console.log(err);
  }
}

async function CreateAccount() {
  try {
    let username = document.getElementById("username").value
    let pin = document.getElementById("pin").value
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const Signup = new ethers.Contract(
        contractAddress,
        contractAbi.abi,
        signer
      );
      if(username == '' && pin.length <= 0){
        error.innerText = 'Username and Pin required'
      }else{
        const Users = await Signup.CreateAccount(username, pin);
        console.log(Users)
        alert("User Credential Added to The Blockchain Succesfully")
      }
     
    }
  } catch (err) {
    console.log(err);
  }
}


let button = document.querySelectorAll("button")
button.forEach((e)=>{
    e.addEventListener("click", (e)=>{
         if(e.target.value == 'auth'){
            connectWallet()
         }

         if(e.target.value == 'create'){
            CreateAccount()
         }
    })
})




