import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import './Bid.css'
import image from '../../assets/bed.jpg'
import { useSelector } from 'react-redux'
import axios from 'axios'

function Bid() {
  const propertyDetails = useSelector(state => state.propertyDetails)
  const { loading, error, property } = propertyDetails
  console.log()
  const [bidAmount, setbidAmount] = useState()
  const [messag, setmessage] = useState()

  var a = localStorage.getItem('userInfo')
  var userId = JSON.parse(a).id
  var token = JSON.parse(a).authToken

  const handleSubmit = async () =>{
      const config = {
          headers: {
              "auth-token": token
          }
      }
      const { data } = await axios.patch(`http://localhost:8000/bid/${property.listing._id}`,{userId,bidAmount}, config)
      console.log("usertkn",data)
      if(data.message){
        setmessage(data.message)
        setTimeout(() => {
          setmessage()
        }, 3000);
      }
    }

  
  
 


  return (
    <>
    <h3 className='bidding-date' id='bid-date1'>Bidding Will End at : {property?.listing?.auction?.endDate}</h3>
    <div className='bid'>
      <div className="highest-bidder-card">
      <h5>Current Highest Bidder</h5>
      <div className='profile-picture'>
      {property?.listing?.length >0 && <img src={`http://localhost:8000/public/images/${property?.listing?.highestBidder?.image[0]}`}/>}
      </div>
      <p>{property?.listing?.highestBidder?.firstName + " " + property?.listing?.highestBidder?.firstName}</p>
      <p>METAMASK ADDRESS</p>
      <p>{property?.listing?.highestBidder?.date}</p>
      <p className='bidding-price'>Bidding Price $ {property?.listing?.auction?.users[0]?.bidAmount}</p>
      </div>
      <div className="bidding-form-complete">
        <h3 className='bidding-date' id='bid-date2'>Bidding Will End at : {property?.listing?.auction?.endDate}</h3>
        <div className="bidding-form">
          <div className='house-image'>
          <img src={`http://localhost:8000/public/images/${property?.listing?.propertyImages[0]}`}/>
          </div>
          <div className="form-fields">
            <br/>
            <span>
              <input style={{padding:"15px"}} type="text" placeholder='Enter Name'/>
            </span>
            <br />
            <br />
            <span>
              <input style={{padding:"15px"}} type="text" placeholder='Bid Rent $' onChange={(e)=> setbidAmount(e.target.value)
          }/>
            </span>
            <br />
          <button onClick={handleSubmit}>submit</button>
          <button>Delete</button>
          <button>Update</button>
          <button>Withdraw</button>
          </div>
          {messag && <center><p style={{color:"red"}}>{messag}</p></center>}
        </div>
      </div>
    </div>
    </>
  )
}

export default Bid