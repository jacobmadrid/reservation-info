import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {GET_RESERVATIONS, FILTER_RESERVATIONS}from './../actions'
import Reservations from './Reservations'

function App() { 
	const reservations = useSelector(state => state.reservations)
	const dispatch = useDispatch()
	return (
		(typeof reservations.data !== 'undefined') ?
		<div>
		<select id='filter'
		onChange={() => dispatch(FILTER_RESERVATIONS(document.getElementById('filter').value))}>
			<option value='FILTER_NONE'>None</option>
			<option value='FILTER_PAST'>Past Reservations</option>
			<option value='FILTER_FUTURE'>Future Reservations</option>
		</select>
		{reservations.filter === 'FILTER_NONE'  ? <Reservations data={reservations.data}/> 
		: <Reservations data={reservations.filteredData}/> 
		}
		 
		 </div>
		 : 
		<div>
		<button onClick={() => dispatch(GET_RESERVATIONS())}>Get Reservations</button>
		</div>
	)
}

export default App