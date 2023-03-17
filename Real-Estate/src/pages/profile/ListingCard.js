import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Profile.css'

function ListingCard({ property }) {
	console.log(property[0]._id)
	return (
		<>
			<li className="cards_item">
				<div className="card">
					<div className="card_image">
						<img src={`http://localhost:8000/public/images/${property[0].property.propertyImages[0]}`} />
					</div>
					 <div className="card_content">
						<div className="card_text">
							<p> <span className='tokenDetails'>  owner Name:</span> {property[0].property.ownerName}</p>
							<p> <span className='tokenDetails'> property Price:</span> {property[0].property.propertyPrice}</p>
							<p> <span className='tokenDetails'> property TotalSupplies:</span> {property[0].TotalSupplies}</p>
							<p> <span className='tokenDetails'> Address:</span> {property[0].property.propertyAddress}</p>
						</div>
					</div>
				</div>
			</li>

		</>
	)
}

export default ListingCard