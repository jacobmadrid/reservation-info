import {combineReducers} from 'redux'
import reservationReducer from './reservation'

const allReducers = combineReducers( {
	reservations: reservationReducer

})

export default allReducers