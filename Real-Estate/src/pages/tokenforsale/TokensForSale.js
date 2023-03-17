import React,{useState} from "react";
import './TokensForSale.css'
import axios from "axios";
import TokenList from "./TokenList";
import Spinner from '../../components/spinner/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getTokenForSale } from '../../Redux/actions/propertyActions'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
function TokensForSale() {
  const [tokens, setTokens] = useState(null)

  // const propertyDetails = useSelector(state => state.propertyDetails)
  // const { loading, error, property } = propertyDetails

  var a = localStorage.getItem('userInfo')
  
  if (a) {
    var token = JSON.parse(a).authToken
    var id = JSON.parse(a).id
  }

  const tokensForSale = async () => {
    const config = {
        headers: {
            "auth-token": token
        }
    }
    const { data } = await axios.get(`http://localhost:8000/api/ListingTokens/${id}`, config)
    setTokens(data)
}

if(tokens){
  console.log(tokens[0]._id)
}

useEffect(()=>{
tokensForSale();
},[])
  return (
    <div>
      {/* {loading && <Spinner />} */}
      <h2 className='financial-heading'>tokens for sale</h2>
      {tokens && tokens < 1 && <h4 style={{color:"white", textAlign:"center"}}>NO TOKENS AVAILABLE </h4>}
      {tokens && tokens.map((token) => (
        <TokenList key={token._id} token={token}/>
      ))
      }
    </div>
  )
}

export default TokensForSale