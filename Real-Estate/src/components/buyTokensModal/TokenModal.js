import React , {useState} from 'react'
import './TokenModal.css'
import { ethers } from "ethers";
import { ERC1155ABI, ERC1155Address } from "../../Redux/constants/erc1155abi";
import axios from 'axios'
import SuccessPurchase from '../success purchase/SuccessPurchase';


export default function TokenModal({setOpenModal, property}) {
  console.log("____________________________________________",property.propertyId)
 const [show, setShow] = useState(false)
 const [count, setCount] = useState(0)

  var a = localStorage.getItem('userInfo')
if(a){
  var token = JSON.parse(a).authToken
}


  const ListTokens = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      const buyerData = {

        quantity: count, ListingTokensId: property.propertyId, BuyerWalletAddress: address, propertyId:property.propertyId
      }
      console.log(buyerData)

      const config = {
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token

        }
      }
      const { data } = await axios.post('http://localhost:8000/api/buyerData', buyerData, config)
      if(data){
        setShow(true)
      }



      const updateListing = {

        TotalSupplies: count
      }
      console.log(updateListing)

      const newconfig = {
        headers: {
          'Content-Type': 'application/json',
        }
      }
      console.log(property._id)
      const { data1 } = await axios.post(`http://localhost:8000/propertyTokens/${property.propertyId}`, updateListing, newconfig)



    }
    catch (error) {
      console.error(error.message)
    }
  }



  return (
    <>
    {show ? <SuccessPurchase count={count}/>:
    <div className="modalBackground">
    <div className="modalContainer" style={{color:"black"}}>
            <div className="titleCloseBtn">
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                X
              </button>
            </div>
            <div className="title">
              <p>Enter No of tokens you want to buy and price of 1 token</p>
            </div>
            <div className="body">
            <p><b>TOKEN FOR SALE : {property.TotalSupplies} </b> </p>
            <p><b>PRICE OF ONE TOKEN: {property.PricePerToken} $ </b></p>
            <p>
            
            <button className={count !==0 ? 'decBtnActive': 'decBtnNotActive'} onClick={() => setCount(count - 1)} >
              -
            </button>
            <span className="tokenValue"> <b> {count} </b></span>

            <button
              className={count !== parseInt(property.quantity) ? 'incBtnActive':'incBtnNotActive' }
              onClick={() => setCount(count + 1)}
            >
              +
            </button>
          </p>
            </div>
            <div className="footer">
              <button onClick={ListTokens}
               className={count === 0 ? "noevent":"calculateBtn"}
              >
                Buy Tokens
              </button>
            </div>
          </div>
        </div>
      }
                </>
    
  )
}