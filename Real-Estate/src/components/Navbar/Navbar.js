import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { ethers } from 'ethers'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Redux/actions/userActions'
import Logo from '../../assets/logo.png'
import { useState, useEffect } from 'react'
import { connect, get_Signer } from '../../Redux/actions/connectWalletAction'
import { SearchProperties } from '../../Redux/actions/propertyActions'
import { show } from '../../Redux/actions/connectWalletAction'


const Navbar = () => {

  // let addresses=accounts[0]
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const [key, setKey] = useState([])
  const [address, setAddress] = useState()

  const logoutHandler = () => {
    dispatch(logout())
  }

  const connectHandler = async (e) => {
    e.preventDefault()
  // dispatch(connect())
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
  setAddress(accounts[0])
  let provider = new ethers.providers.Web3Provider(window.ethereum)
  let signer = provider.getSigner()
  let CurrentWalletAddress= await signer.getAddress()
  }


  const handleSearch = () => {
    if (key) {
      dispatch(SearchProperties(key))
      navigate('/search')
    }
  } 

  return (
    <div>
      <input type="checkbox" id="check" style={{display:"none"}}/>
      <nav>
        <div className="icon">
          <NavLink to="/"><img src={Logo} alt="logo" /></NavLink>
        </div>

        <div className="search_box">
          <input type="search" placeholder="Search here" onChange={(e) => setKey(e.target.value)} />
          <span className="fa fa-search" onClick={handleSearch} />
        </div>

        <ol>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {userInfo &&
            <li>
              <NavLink to="/addproperty">Add property</NavLink>
            </li>
          }
          <li>
            <NavLink to="/marketplace">Market Place</NavLink>
          </li>
          {!address && <li>
            <button onClick={connectHandler} style={{ width: "145px", height: "35px", color: "white", borderRadius: "10px", background: "#109272", border: "2px white", boxShadow: "#f9fafb26 1px 1px 12px 4px" }}>Connect Wallet</button>
          </li>}
          <li>
            {userInfo ? <div className="dropdown">
              <button className="dropbtn">{userInfo.firstName}   <FontAwesomeIcon icon={faCaretDown} className="caretDown" /></button>
              <div className="dropdown-content">
                <Link to="/" onClick={logoutHandler}>Logout</Link>
                <Link to="/profile">Profile</Link>
              </div>
            </div> :
              <NavLink to="/login">Login/Signup</NavLink>}
          </li>


        </ol>
        <label htmlFor="check" id="bar">
          <span className="fa fa-bars" id="bars" />
          <span className="fa fa-times" id="times" />
        </label>
      </nav>
    </div>
  )
}

export default Navbar