import React, { useEffect, useState} from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import './Marketplace.css'
import Propertycard from './Propertycard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProperties } from '../../Redux/actions/propertyActions'
import Spinner from '../../components/spinner/Spinner'
import house1 from '../../assets/house1.jpg'
import house2 from '../../assets/house2.jpg'
import house3 from '../../assets/house3.jpg'


const Marketplace = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProperties())
    }, [dispatch])

    const listAll = useSelector(state => state.listAll)
    const { loading, error, propertyData } = listAll
    if(propertyData){

        console.log(propertyData.properties)
    }
    return (
        <>
            <Navbar />
            {propertyData && propertyData.length === 0 && <h2 className='noData'>No Properties Listed</h2>}
            {loading && <Spinner />}
            {/* <div class="parent">
            <div class="div1"> <img src={house1} alt="" width={"200px"} height={"400px"}/> </div>
            <div class="div2"> <img src={house1} alt="" width={"200px"} height={"200px"}/> </div>
            <div class="div3"> <img src={house1} alt="" width={"200px"} height={"200px"}/> </div> */}
            {/* </div> */}
            <h1 style={{color:"white", fontSize:"60px", marginTop:"30px"}}> Real Estate MarketPlace</h1>
            {propertyData && propertyData.properties.map((property) => (
                <Propertycard key={property._id} property={property} />
            )
            )}
            <Footer />
        </>
    )
}

export default Marketplace