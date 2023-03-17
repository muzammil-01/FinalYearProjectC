import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './PropertyDetails.css'
import CenterNavbar from '../../components/centerNavbar/CenterNavbar'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { getTokenForSale, listPropertyDetails } from '../../Redux/actions/propertyActions'
import map from '../../assets/map.jpg'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from '../../components/slider/Slider'
import MintModel from '../../components/mintModel/MintModel'
import RentableForm from '../RentableForm/RentableForm'
import axios from 'axios'

function PropertyDetails() {
    var b = localStorage.getItem('userInfo')
   var userID = JSON.parse(b).id
   console.log(userID)
    const [openModal, setOpenModal] = useState(false)
    const [openRentModal, setOpenRentModal] = useState(false)
    const { id } = useParams()
    console.log(id)
    var [data, setData] = useState()
    // if (data == undefined) {
    //     axios.get(`http://localhost:8000/api/property/${id}`)
    //         .then((res) => {
    //             setData(res.data)
    //         })
    // }

    // console.log(data)
    // const propertyDetails = useSelector(state => state.propertyDetails)
    // const { loading, error, property } = propertyDetails
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listPropertyDetails(id))
        
    }, [dispatch, id])

    const propertyDetails = useSelector(state => state.propertyDetails)
    const { loading, error, property } = propertyDetails
    if(property){

        console.log("**********rrr********",property)
    }
return (
        <>
            <Navbar />
            {/* {property && <Slider propertyImages={property?.listing?.propertyImages} />} */}
           <center> <img style={{width:"50%",borderRadius:"10px",marginTop:"30px"}} src={`http://localhost:8000/public/images/${property?.listing?.propertyImages[0]}`} alt="..." /></center>
            {property && openModal && <MintModel setOpenModal={setOpenModal} property={property} />}
            {property && openRentModal && <RentableForm setOpenRentModal={setOpenRentModal} property={property} />}

            <p className='mintbtn' onClick={() => {
                setOpenModal(true);
            }}>Mint</p>
            
          { userID === property?.listing?.user? <p className='mintbtn' onClick={() => {
                setOpenRentModal(true);
            }}>Rent Your Property</p> : ""}

           {id && <CenterNavbar id={id} />}
            <Footer />
        </>
    )
}

export default PropertyDetails