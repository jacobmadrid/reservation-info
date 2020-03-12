import React from 'react'

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
				data.map((res) => 
					<tr>
						<td>{res.guestInfo[0].name}</td>
						<td>{res.roomDetails.Name}</td>
						<td>{res.startDate} - {res.endDate}</td>
						<td><button onClick={() => {}}>
						{res.price.perDay.map(p => p.RoomPrice + p.RoomTax + p.RoomFees).reduce((a,b) => a + b, 0)}
						</button>
						</td>
						<td>{res.amenities.map(a => a.name).join(" ")}</td>
					</tr>
				)
					
			}
			</tbody>		
			</table>
		
		
	)
	

}

export default Reservations