import React from 'react'
import { useNavigate } from 'react-router-dom'
import './MintSuccess.css'
import Successful from '../../assets/submit-successfully.png'

function MintSuccess({count}) {
    const navigate = useNavigate()
    const handleClick = ()=>{
      navigate('/profile')
    }
  return (
    <div className="success-container">
    <div className="row">
      <div className="modalbox success ">
        <h1>Great!</h1>
        <img className="rukjao" src={Successful} alt="" />
        <p>{count} Token Minted successfully</p>
          <button className='countBtn' onClick={handleClick}>Continue</button>
      </div>
    </div>
  </div>
    )
  }
  
  export default MintSuccess