import React, {Component} from 'react';

class ReservationInfo extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        let data = this.props.data;
        let table = [];
         data.forEach( (data, index) => {
            let primaryGuest = data.guestInfo[0].name;
            let roomName = data.roomDetails.Name;
            let dates = data.startDate + " - " + data.endDate
            
            let total = 0.00;
            data.price.perDay.forEach( (data) =>{
                total += data.RoomPrice + data.RoomTax + data.RoomFees
            });

            let amenities = "";
            data.amenities.forEach( (data) => {
                amenities += data.name + " "
            });
            amenities.trim();

            table[index] = {primaryGuest, roomName, dates, total, amenities};
         })
        
        return (
            <table border="1">
                <thead>
                    <tr>
                    <th>Primary Guest</th>
                    <th>Room Name</th>
                    <th>Dates</th>
                    <th>Total Price</th>
                    <th>Amenity Names</th>
                    </tr>
                </thead>
                <tbody>
            {
                
                table.map((res, index) => (
                                     
                    <tr key={index}>
                        <td>{res.primaryGuest}</td>
                        <td>{res.roomName}</td>
                        <td>{res.dates}</td>
                        <td>{res.total}</td>
                        <td>{res.amenities}</td>
                    </tr>
                ))
            }
            </tbody>
            </table>
            
        )
    }
}

export default ReservationInfo;