import "./MintModel.css";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ERC1155ABI} from "../../Redux/constants/erc1155abi";
import { useSelector} from "react-redux";
import MintSuccess from '../MintSuccess/MintSuccess'
import { useSignMessage } from 'wagmi'

function MintModel({ setOpenModal, property }) {
  console.log("************************************",property)
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false)
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      // const address = verifyMessage(variables.message, data)
      // recoveredAddress.current = address
    },
  })
  
  useEffect(() => {
    if (!userInfo) {
      alert("please Login first");
      navigate("/login");
    }
  }, [navigate]);
  var a = localStorage.getItem('userInfo')
  if (a) {
    var token = JSON.parse(a).authToken
  }


  const Mint = async () => {
    try {

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      signer.signMessage(`Mint`)
      const ERC1155 = new ethers.Contract(
        "0x68B03e17443F4cBbb5958e621264fFED3F1A0b41",
        ERC1155ABI,
        signer
      );
      const mint = await ERC1155.mint(`${property.OwnerWalletAddress}`, `${property.TokenId}`, `${count}`, { gasLimit: 5000000 })
      console.log(mint)
      ERC1155.on("Mint", (me, amount) => {
        console.log(me)
        console.log(amount)
      })

console.log(property.TotalSupplies);
      const buyerData = {

        quantity: count, ListingTokensId: property._id, BuyerWalletAddress: address, propertyId: property._id
      }

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




      const newconfig = {
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token

        }
      }
      const newData = {
        "TotalSupplies": property.TotalSupplies - count
      }

      const data1 = await axios.patch(`http://localhost:8000/api/property/update/${property._id}`, newData, newconfig)
     

    } 
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {show ? <div> <MintSuccess count={count}/> </div>: 
      <div className="mintModalBackground">
        <div className="mintModalContainer">
          <div className="mintModaltitleCloseBtn">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="mintModaltitle">
            <p>Enter No of tokens you want to buy and price of 1 token</p>
          </div>
          <div className="mintModalbody">
            <p>
              <b>TOKEN STOCK </b>: <span style={{fontSize:"20px", fontWeight:"bold"}}> <u> {property?.listing?.TokenForSale[0]
?.TotalSupplies} </u> </span>{" "}
            </p>
            <p>
              <b>Price of One Token </b>: <span style={{fontSize:"20px", fontWeight:"bold"}}> {property?.listing?.TokenForSale[0]
?.PricePerToken} $</span>{" "}
            </p>
            <h5>
              {property?.listing?.numberOfSupplies - property?.listing?.TokenForSale[0]?.TotalSupplies} / {property?.listing?.numberOfSupplies} minted
            </h5>
            <p>
            <button className={count !==0 ? 'decBtnActive': 'decBtnNotActive'} onClick={() => setCount(count - 1)} >
              -
            </button>
            <span className="tokenValue"> <b> {count} </b></span>

            <button
              className={count !== parseInt(property.TotalSupplies) ? 'incBtnActive':'incBtnNotActive' }
              onClick={() => setCount(count + 1)}
            >
              +
            </button>
            </p>
          </div>
          <div className="mintModalfooter">
            {parseInt(property.TotalSupplies) === 0 ? <p style={{fontSize:"large", backgroundColor:"crimson", borderRadius:"20px", padding:"10px", color:"white"}}>All tokens are minted</p>:
            <button className={count === 0 ? "noevent":"mintModalcalculateBtn"} onClick={Mint}>
              Mint
            </button>
            }
          </div>
        </div>
      </div>
}
    </div>
  );
}

export default MintModel;