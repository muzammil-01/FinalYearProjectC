import React from 'react'
import axios from "axios";
import { ethers } from "ethers";
import { useParams } from 'react-router-dom'
import "./RentableForm.css"
import Spinner from "../../components/spinner/Spinner";
import SuccessModal from "../../components/success modal/SuccessModal";
import { useState, useEffect } from "react";

function RentableForm({setOpenRentModal,property}) {
    console.log(property.listing.user)
    const [message, setMessage] = useState("");
    const [uploading, setUploading] = useState(false);
    const [successfull, setSuccessfull] = useState(false);
    const [show, setShow] = useState(false)
    const [error, setError] = useState("")
     const [biddingTime, setBiddingTime] = useState();
     const [startingBid, setStartingBid] = useState();
     const [BidEndDate, setBidEndDate] = useState();

   var id = property.listing._id
   

     const submitHandler=async (e)=>{
      e.preventDefault()

      var a = localStorage.getItem('userInfo')
      
      if (a) {
          var token = JSON.parse(a).authToken
      }
        var startDate = biddingTime.slice(0,10)
        var endDate = BidEndDate.slice(0,10)
        var minBid = startingBid;
        
          const config = {
              headers: {
                  "auth-token": token
              }
          }
          const { data } = await axios.post(`http://localhost:8000/startAuction/${id}`,{startDate,endDate,minBid}, config)
          console.log("bid",data)
      }

     
  return (
    <>
<div>
  <div className="mintModalBackground">


<div>
  {successfull && <SuccessModal />}
  {uploading && <Spinner />}
  {error && <div className="error">{message}</div>}

<center>
 
 
 <form className="mintModalContainer" encType="multipart/form-data" style={{width:"60vw"}}>
  <div className="mintModaltitleCloseBtn">
      <button
        onClick={() => {
          setOpenRentModal(false);
        }}
      >
        X
      </button>
    </div>
    <div className="top-heading">
      <h1>Rent Auction Details</h1>
    </div>
    
    <div className="form-inputs" style={{display:"flex",width:"100%",justifyContent: "space-evenly"}}>
    <div className="form-styles">
      <label className="labels"style={{color:"black"}}>Bid Start Date</label>
    <input
      type="datetime-local"
      name="BiddingTime"
      value={biddingTime}
      className="inputs"
      required
      onChange={(e) => setBiddingTime(e.target.value)}
    />
    <label  className="labels"style={{color:"black"}} > Enter Starting Bid</label>
    <input
      type="Number"
      name="StartingBid"
      min={0}
      className="inputs"
      required
      onChange={(e) => setStartingBid(e.target.value)}
      placeholder="Enter Starting Bid"
    />
    <label  className="labels" style={{color:"black"}}> Bid End Date </label>
    <input
      type="datetime-local"
      name="BidEndDate"
      value={BidEndDate}
      className="inputs"
      required
      onChange={(e) => setBidEndDate(e.target.value)}
      placeholder="Rent Duration"
    />


</div>
</div>
    <br />
    <center>
    <button
      className="logbtn"
      onClick={
        submitHandler
      }
    >
      Submit
    </button>
    </center>
    <br />
  </form>
  </center>
</div>
</div>
</div>
    
    </>
  )
}

export default RentableForm