import {
  ADD_PROPERTY_REQUEST,
  ADD_PROPERTY_SUCCESS,
  ADD_PROPERTY_FAIL,
  LIST_PROPERTY_REQUEST,
  LIST_PROPERTY_SUCCESS,
  LIST_PROPERTY_FAIL,
  PROPERTY_DETAILS_REQUEST,
  PROPERTY_DETAILS_SUCCESS,
  SEARCH_PROPERTY_FAIL,
  SEARCH_PROPERTY_SUCCESS,
  SEARCH_PROPERTY_REQUEST,
  GET_PROPERTY_TOKENS_FOR_SALE,
  GET_PROPERTY_TOKENS_FOR_SALE_SUCCESS,
  START_AUCTION_REQUEST,
  START_AUCTION_SUCCESS,
  START_AUCTION_FAIL,
  MAKE_BID_REQUEST,
  MAKE_BID_SUCCESS,
  MAKE_BID_FAIL,
  GET_ALL_PROPERTIES_OF_SPECIFIC_USER_REQUEST,
  GET_SPECIFIC_PROPERTY_FAIL,
  GET_ALL_PROPERTIES_OF_SPECIFIC_USER_SUCCESS,
  GET_SPECIFIC_PROPERTY_SUCCESS,
  GET_SPECIFIC_PROPERTY_REQUEST
} from '../constants/propertyConstants'



import axios from 'axios'

var a = localStorage.getItem('userInfo')
if (a) {
  var token = JSON.parse(a).authToken
}

// Add new property
export const addProperty = (formData, Pricepertoken, CloneOwner, numberOfSupplies, numberOfTokenPerWallet) => async (dispatch) => {

  const SellerWalletAddress = CloneOwner

  console.log("formData", formData)

  try {
    dispatch({
      type: ADD_PROPERTY_REQUEST
    })
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        "auth-token": token
      }
    }

    console.log("______________________________________________", token)

    const { data } = await axios.post('http://localhost:8000/check', formData, config)
    // error
    // 1===property with this address already exist
    const propertyId = data.addProperty._id

    const testData = {
      Pricepertoken, SellerWalletAddress, numberOfSupplies, numberOfTokenPerWallet, propertyId
    }
    const newconfig = {
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      }
    }
    console.log("test data", token)

    const data1 = await axios.post('http://localhost:8000/checkToken', testData, newconfig)

    let listingData = data1.data.listing
    dispatch({
      type: ADD_PROPERTY_SUCCESS,
      payload: data, listingData

    })
  } catch (error) {
    dispatch({
      type: ADD_PROPERTY_FAIL,
      payload: error.response.data
    })
  }
}



// Get All properties
export const getAllProperties = () => async (dispatch) => {
  try {
    dispatch({
      type: LIST_PROPERTY_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const { data } = await axios.get("http://localhost:8000/allproperties", config)
    console.log(data)

    dispatch({
      type: LIST_PROPERTY_SUCCESS,
      payload: data,
    })

  } catch (error) {
    dispatch({
      type: LIST_PROPERTY_FAIL,
      payload: error.response.data
    })
  }
}

export const listPropertyDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PROPERTY_DETAILS_REQUEST
    })
    console.log(id)

    const { data } = await axios.get(`http://localhost:8000/get-property/${id}`)

    dispatch({
      type: PROPERTY_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    console.error("hello world")
  }
}

export const getTokenForSale = (propertyId) => async (dispatch) => {
  try {
    console.log("hellollollo")
    dispatch({
      type: GET_PROPERTY_TOKENS_FOR_SALE
    })

    const { data } = await axios.get(`http://localhost:8000/getTokenForSale/${propertyId}`)
    // console.log(data)
    dispatch({
      type: GET_PROPERTY_TOKENS_FOR_SALE_SUCCESS,
      payload: data
    })
  } catch (error) {
    console.error("hello world")
  }
}

// Search properties 
export const SearchProperties = (key) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_PROPERTY_REQUEST
    })

    const { data } = await axios.get(`http://localhost:8000/search/${key}`)

    dispatch({
      type: SEARCH_PROPERTY_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({

      type: SEARCH_PROPERTY_FAIL,
      payload: error
    })
    // console.error("hello world")
  }
}
export const getSpecificProperty = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_SPECIFIC_PROPERTY_REQUEST
    })
    const newconfig = {
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      }
    }

    let propertyId = "640ef04d494ef81f8b6d7484"

    const { data } = await axios.get(`http://localhost:8000/get-property/${propertyId}`, newconfig)

    dispatch({
      type: GET_SPECIFIC_PROPERTY_SUCCESS,
      payload: data

    })
  } catch (error) {
    dispatch({
      type: GET_SPECIFIC_PROPERTY_FAIL,
      payload: error.response.data
    })
  }
}

export const getAllPropertiesOfSpecificUser = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_PROPERTIES_OF_SPECIFIC_USER_REQUEST
    })
    const newconfig = {
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      }
    }

    let userId = "640ef04d494ef81f8b6d7484"

    const { data } = await axios.get(`http://localhost:8000/get-property-by-user/${userId}`, newconfig)

    dispatch({
      type: GET_ALL_PROPERTIES_OF_SPECIFIC_USER_SUCCESS,
      payload: data

    })
  } catch (error) {
    dispatch({
      type: GET_SPECIFIC_PROPERTY_FAIL,
      payload: error.response.data
    })
  }
}
export const startAuction = () => async (dispatch) => {
  try {
    dispatch({
      type: START_AUCTION_REQUEST
    })
    const newconfig = {
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      }
    }
    var sendData = {
      startDate: "2002-12-09",
      endDate: "2002-12-09" //end data should be greater than start date check it on front end
    }
    let propertyId = "640ef04d494ef81f8b6d7484"

    const { data } = await axios.post(`http://localhost:8000/startAuction/${propertyId}`, sendData, newconfig)

    dispatch({
      type: START_AUCTION_SUCCESS,
      payload: data

    })
  } catch (error) {
    dispatch({
      type: START_AUCTION_FAIL,
      payload: error.response.data
    })
  }
}

export const makeBid = () => async (dispatch) => {
  try {
    dispatch({
      type: MAKE_BID_REQUEST
    })
    const newconfig = {
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      }
    }
    var sendData = {
      userId: "63d95e02d0a00f2d65379458",
      bidAmount: 3
      }
    let propertyId = "640ef04d494ef81f8b6d7484"

    const { data } = await axios.patch(`http://localhost:8000/bid/${propertyId}`, sendData, newconfig)

    dispatch({
      type: MAKE_BID_SUCCESS,
      payload: data

    })
  } catch (error) {
    dispatch({
      type: MAKE_BID_FAIL,
      payload: error.response.data
    })
  }
}

