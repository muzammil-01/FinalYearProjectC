import { ethers } from "ethers";
import {ERC721ABI,ERC72FACTORYABI,ERC72FACTORYContractAddress} from "../constants/erc721ABI"

import {
    ACCOUNT_CONNECT_SUCCESS,
    ACCOUNT_CONNECT_FAIL,
    GET_SIGNER_SUCCESS,
    GET_SIGNER_FAIL,
    SELLER_WALLET_AND_CLONE_ADDRESS_SUCCESS,
    SELLER_WALLET_AND_CLONE_ADDRESS_FAIL
} from '../constants/walletConstants'

let provider;
let signer;
let CurrentWalletAddress;
// let clone={cloneAddress,cloneOwner}
let address 


export const connect = () => async (dispatch) => {
    try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        address = accounts[0]
        provider = new ethers.providers.Web3Provider(window.ethereum)
        signer = provider.getSigner()
        CurrentWalletAddress= await signer.getAddress()
        console.log(provider)
        console.log(signer)
        console.log(CurrentWalletAddress)///save in state
        
        dispatch({
            type: ACCOUNT_CONNECT_SUCCESS,
            payload : address,signer,address
        })
    } 
    catch(error){
        // dispatch({
            //     type: ACCOUNT_CONNECT_FAIL,
            //     payload: error
            // })
        }
    }


   
export const show = (address) =>{

    // console.log(addressTo)
}

