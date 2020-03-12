import React from 'react'
import PropTypes from 'prop-types'
import Popup from 'reactjs-popup'
import moment from 'moment'

const Reservations = ({data}) => {
	console.log('displaying reservations')

	return (
		
		<table border="1">
			<thead>
				<tr>
					<td>Name</td>
					<td>Room Name</td>
					<td>Dates</td>
					<td>Total Price</td>
					<td>Amenity Names</td>
				</tr>
			</thead>
			<tbody>
				{
					data.map((res, index) => 
						<tr key={index}>
							<td>{res.guestInfo[0].name}</td>
							<td>{res.roomDetails.Name}</td>
							<td>{moment(res.startDate, 'MM-DD-YYYY').format('MMM Do, YYYY')} - {moment(res.endDate, 'MM-DD-YYYY').format('MMM Do, YYYY')}</td>
							<td>
								<Popup trigger={
									<button>
										{res.price.perDay.map(p => p.RoomPrice + p.RoomTax + p.RoomFees)
											.reduce((a,b) => a + b, 0).toFixed(2)}
									</button>}>
									{
										res.price.perDay.map((p, day) => (
											<div key={day}>
												Day {day + 1}<br/>
												&emsp;Room Price: {p.RoomPrice.toFixed(2)}<br/>
												&emsp;Room Tax: {p.RoomTax.toFixed(2)}<br/>
												&emsp;Room Fees: {p.RoomFees.toFixed(2)}<br/>

											</div>
											
										))
									}
								</Popup>
							</td>
							<td>{res.amenities.map(a => a.name).join(' ')}</td>
						</tr>
					)
					
				}
			</tbody>		
		</table>
		
		
	)
	

}

Reservations.propTypes = {
	data: PropTypes.array
}
export default Reservations