export const GET_RESERVATIONS = () => {
	return {
		type: 'GET_RESERVATIONS'
	}
	
}

export const FILTER_RESERVATIONS = (filter) => {
	return {
		type: 'FILTER_RESERVATIONS',
		payload: filter
	}
}