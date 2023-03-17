import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import './TokensForSale.css'
import Modal from '../../components/buyTokensModal/TokenModal'

export default function TokenList({token}) {
  const [modalOpen, setModalOpen] = useState(false);

  console.log(token)
 
  return (
    <>
    <p key={token._id} className='tokensforsale'>
           <FontAwesomeIcon icon={faCircleUser} className="userIcon" />
           <span>
             ID: {token.user}
           </span>

           <span>
            No of Tokens: {token.TotalSupplies}
           </span>

        <button className='buytokensbtn' onClick={() => {
            setModalOpen(true);
          }}>Buy Tokens</button>
          {modalOpen && <Modal setOpenModal={setModalOpen} property={token} />}
        </p>
    </>
  )
}
