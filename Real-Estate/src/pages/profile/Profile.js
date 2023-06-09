import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RentInfo from "./RentInfo";
import "./Profile.css"
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/spinner/Spinner'
import ListingCard from './ListingCard'
import { useSelector } from 'react-redux'
import Navbar from '../../components/Navbar/Navbar'
import TokensCards from './TokensCards'





function Profile() {

    const navigate = useNavigate()
    const userSpecificProperties = useSelector(state => state.userSpecificProperties)
    const { loading, error, propertyData } = userSpecificProperties

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const [userPropertyData, setUserPropertyData] = useState(null)
    const [userTokens, setUserTokens] = useState(null)
    const [showTokensListing, setShowTokensListing] = useState(false)
    const [showListing, setShowListing] = useState(false)



    var a = localStorage.getItem('userInfo')

    var id = JSON.parse(a).id
    console.log(id)
    
    if (a) {
        var token = JSON.parse(a).authToken
    }
    useEffect(() => {
        if (!userInfo) {
          alert("please Login first");
          navigate("/login");
        }
      }, []);
       
    useEffect(() => {
     
            // fetchUserProperties()
            fetchUserTokens()
            fetchUserListing()
        
    }, [])

    const fetchUserTokens = async () => {
        const config = {
            headers: {
                "auth-token": token
            }
        }
        const { data } = await axios.get("http://localhost:8000/api/userTokens", config)
        console.log("usertkn",data)
        setUserTokens(data)
    }

    const fetchUserListing = async () => {
        const config = {
            headers: {
                "auth-token": token
            }
        }
        const { data } = await axios.get(`http://localhost:8000/api/ListingTokens/${id}`, config)
        console.log("Listings",data)
        setUserPropertyData(data)
    }
    console.log("Listings",userPropertyData)

    return (
        <>
            <Navbar />
            {loading && <Spinner />}

            <h1 className='headingOne'>Profile</h1>
            <div className='user-details'>
                <div className="info">
                    <h1 className='displayName'> 
                    <span className='first'>{userInfo.firstName}</span>
                    <span className='last'> {userInfo.lastName} </span>
                    </h1>
                    <h4>ID: {userInfo.id}</h4>
                    <h4>Email: {userInfo.email}</h4>
                </div>
                <div className="profile-picture">
                    <img src={`http://localhost:8000/public/images/${userInfo.image[0]}`} alt="..." />
                </div>
            </div>


            <div className="btndiv">
            <button className="profilelbtn" onClick={()=>{ setShowTokensListing(!showTokensListing)}}>View Tokens</button>
            <button className="profilelbtn" onClick={()=>{ setShowListing(!showListing)}}>View Listed Properties</button>
            </div>
            {showTokensListing && userTokens && userTokens.length === 0 ? <p className='Notok'>No Tokens ..... </p> : ""}
            <div className="main">
                <ul className="cards">
                    {showTokensListing && userTokens && userTokens.map((tokens) => (
                        <TokensCards key={tokens._id} tokens={tokens} />
                        )
                        )}
                </ul>
            </div>
           

            
            {showListing && userPropertyData && userPropertyData.length === 0 ? <p className='Notok'>No Listings ..... </p> : ""}
            <div>
                <div className="main">
                      {showListing && userPropertyData && userPropertyData.length > 0 && <h1 style={{color:"white"}}>Tokens Listed For Sale</h1>}
                    <ul className="cards">
                        {showListing && userPropertyData && [userPropertyData].map((property) => (
                            <ListingCard key={property._id} property={property} />
                        )
                        )}
                    </ul>
                </div>
            </div>

        <button>Confirm rent</button>
        <RentInfo></RentInfo>            
        


        </>
    )
}

export default Profile