import { LOGIN, LOGOUT, SIGNIN } from "../actions/auth";

const initialState = {
	token: null,
	userId: null,
	name: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SIGNIN:
			return {
				...state,
				//token: action.token,
				userId: action.id,
				name: action.name,
			};
		// case SET_DID_TRY_AL:
		// 	return {
		// 		...state,
		// 		didTryAutoLogin: true,
		// 	};

		case LOGIN:
			return {
				userId: action.id,
				name: action.name,
				token: action.token,
				//didTryAutoLogin: true,
			};
		case LOGOUT:
			return {
				initialState,
				//didTryAutoLogin: true,
			};
		default:
			return state;
	}
};
