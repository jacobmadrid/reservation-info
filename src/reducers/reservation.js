import data from '../data'
import moment from 'moment'
const reservations = (state = ['data': [], 'filteredData': [], 'filter': 'FILTER_NONE'], action) => {

	switch(action.type) {
		case 'GET_RESERVATIONS':
			console.log('getting reservations')
			console.log(data)
			return {data: data, 'filteredData': [], 'filter': 'FILTER_NONE'}	
		case 'FILTER_RESERVATIONS':
			console.log('filtering:' + action.payload)
			switch(action.payload){				
				case 'FILTER_PAST':
					
					
					return {'data': state.data, 
					'filteredData': state.data.filter(d=> moment(d.startDate, "MM-DD-YYYY").diff(moment()) < 0), 
					'filter': 'FILTER_PAST'}
				case 'FILTER_FUTURE':
					
					
					return {'data': state.data,
					 'filteredData': state.data.filter(d=> moment(d.startDate, "MM-DD-YYYY").diff(moment()) > 0),
					  'filter': 'FILTER_FUTURE'}

					
				default:
					return {'data': state.data, 'filteredData': [], 'filter': 'FILTER_NONE'}
			}
		default:
			return state
	}
}


export default reservations