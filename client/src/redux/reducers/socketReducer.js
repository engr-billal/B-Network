import { GLOBALTYPES } from '../constants'

const initialState = false

const socketReducer = (state = initialState, action) => {
	switch (action.type) {
		case GLOBALTYPES.THEME:
			return action.payload

		default:
			return state
	}
}

export default socketReducer
