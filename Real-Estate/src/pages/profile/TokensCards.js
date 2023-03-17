import React, { useState } from 'react'
import ResellModal from '../../components/resellModal/ResellModal'
import { Link } from 'react-router-dom'

function TokensCards({ tokens }) {

    const [resellModal, setResellModal] = useState(false)
    console.log("*********************************************8",tokens)
    return (
        <>
        
            <li className="cards_item">
                <div className="card">
                    <div className="card_image">
                        <img src={`http://localhost:8000/public/images/${tokens?.propertyId.propertyImages[0]}`} />
                    </div>
                    <div className="card_content">
                        <div className="card_text">
                            <p> <span  className='tokenDetails'> Tokens Minted:</span> {tokens?.quantity} </p>
                            <p> <span  className='tokenDetails'> property Price:</span> {tokens?.propertyId?.propertyPrice}</p>
                            <p> <span  className='tokenDetails'> owner Name:</span> {tokens?.propertyId?.ownerName}</p>
                            <p> <span  className='tokenDetails'> Address:</span> {tokens?.propertyId?.propertyAddress}</p>
                        </div>
                        <button className="card_btn" style={{width:"100%"}}
                            onClick={() => {
                                setResellModal(true);
                            }}>Resell</button>

                    </div>
                    {resellModal && <ResellModal setResell={setResellModal} property={tokens} />}
                </div>
            </li>

        </>
    )
}

export default TokensCards