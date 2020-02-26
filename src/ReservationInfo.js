import React, {Component} from 'react';

class ReservationInfo extends Component {
    constructor(props){
        super(props);
        this.state = {reservation: true};
    }
    
    getReservationData(data) {
        let table = [];
        let decimalPlaces = 2
        let priceDetailsArr = [];
        data.map( (data, index) => {
            let key = "reservation" + index;
            let priceKey = "price" + index;
            let priceDetailsKey = "priceDetails" + index;
            let primaryGuest = data.guestInfo[0].name;
            let roomName = data.roomDetails.Name;
            let dates = data.startDate + " - " + data.endDate;
            let startDay = data.startDate.substr(3,2);
            let startMonth = data.startDate.substr(0,2);
            let startYear = data.startDate.substr(6,4);

            let total = 0.00;
            let priceBreakdown = [];
            data.price.perDay.map( (data, index) =>{
                total += data.RoomPrice + data.RoomTax + data.RoomFees;
                let priceBreakdownKey = priceDetailsKey + ""  + index
                priceBreakdown.push(<div key={priceBreakdownKey}>Day {index + 1} <br/> 
                                    &emsp;Room Price: {data.RoomPrice.toFixed(decimalPlaces)} <br/>
                                    &emsp;Room Tax: {data.RoomTax.toFixed(decimalPlaces)} <br/>
                                    &emsp;Room Fees: {data.RoomFees.toFixed(decimalPlaces)}</div>);
                return null;
            });
            total =  total.toFixed(decimalPlaces);
            let pricePerDay = data.price.perDay;

            let amenities = "";
            data.amenities.map( (data) => {
                amenities += data.name + " ";
                return null;
            });
            amenities.trim();
            table[index] = {
                                key,
                                priceKey,
                                priceDetailsKey,
                                primaryGuest, 
                                roomName, 
                                dates, 
                                total, 
                                amenities,
                                startDay,
                                startMonth,
                                startYear,
                                pricePerDay,
                            
                            };
            priceDetailsArr[index] = {
                priceDetailsKey,
                priceBreakdown
            }

            

            return null;
        })
        return { "reservations": table, "priceBreakdown": priceDetailsArr};
    }

    showPriceDetails(e) {
        let data = JSON.parse(sessionStorage.getItem("reservations"));

        let row = data.find(d => d.priceKey === e.target.id);
        let priceDetails = document.getElementById(row.priceDetailsKey)
        if(priceDetails.style.display === "none") {
            priceDetails.style.display = ""
        } else {
            priceDetails.style.display = "none"
        }


    }

    filterReservations(e) {
        
        let data = JSON.parse(sessionStorage.getItem("reservations"));
        
        let futureCheckbox = document.getElementById('future');
        let pastCheckbox = document.getElementById('past');
        
        if(futureCheckbox.checked || pastCheckbox.checked) {
            if(futureCheckbox.checked) {
                pastCheckbox.checked = "";
            } else if(pastCheckbox.checked) {
                futureCheckbox.checked = ""
            }
        
            let date = new Date();
            let currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            data.map( data => {
                let resDate = new Date(data.startYear,data.startMonth,data.startDay);
                if ((resDate - currentDate > 0 && pastCheckbox.checked) ||
                (resDate - currentDate < 0 && futureCheckbox.checked)) {
                    document.getElementById(data.key).style.display = 'none';                    
                    document.getElementById(data.priceDetailsKey).style.display = 'none';
                } else {
                    
                    document.getElementById(data.key).style.display = '';                 
                }
                return null;
            });
        } else{
            data.map( data => {
                document.getElementById(data.key).style.display = '';                
                return null;
            });
        }
        
    }

    render() {
        let data = this.props.data;
        
        let reservationData = this.getReservationData(data);
        let table = reservationData["reservations"]
        let priceBreakdown = reservationData["priceBreakdown"];
        sessionStorage.setItem("reservations", JSON.stringify(table));
        
              
        
        return (
            
            <div>
            <input type="checkbox" id="future" name="View Future Reservations" value="future" onChange={this.filterReservations} />
            <label htmlFor="future">View Future Reservations</label>
            <br/>
            
            <input type="checkbox" id="past" name="View Past Reservations" value="past" onChange={this.filterReservations}/>
            <label htmlFor="past">View Past Reservations</label>
            
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
                              
                    <React.Fragment key={res.key}>
                    <tr id={res.key}>
                        <td>{res.primaryGuest}</td>
                        <td>{res.roomName}</td>
                        <td>{res.dates}</td>
                        <td>
                            <button onClick={this.showPriceDetails} id={res.priceKey}>
                                {res.total}
                            </button>
                        </td>
                        <td>{res.amenities}</td>
                    </tr>

                    <tr style={{display:"none"}} id={res.priceDetailsKey}>
                        <td colSpan="5">
                            {priceBreakdown[index].priceBreakdown}
                            

                        </td>
                    </tr>
                    </React.Fragment>

                ))
            }
            </tbody>
            </table>
            </div>
            
        )
    }
}

export default ReservationInfo;