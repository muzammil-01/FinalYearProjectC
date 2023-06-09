import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGOUT
} from "../constants/userConstants"

import axios from 'axios'

// Add new User
export const register = (firstName,lastName, email, password, image) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const  {data}  = await axios.post('http://localhost:8000/api/auth/register', {firstName,lastName, email, password, image} ,
     config)

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data
    })
  }
}


// Login user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const  {data}  = await axios.post('http://localhost:8000/api/auth/login', { email, password },
      config)

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    console.log(JSON.stringify(data))
    localStorage.setItem('userInfo', JSON.stringify(data))
  } 
  catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:  error.response.data
     })
  }
}


// Logout user
export const logout = ()=> (dispatch)=>{
  localStorage.removeItem('userInfo')
  console.log("hello world1")
  dispatch({
    type:USER_LOGOUT
  })
}