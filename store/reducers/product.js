import { SET_PRODUCT } from "../actions/product";

const initialState = {
	Products: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PRODUCT:
			return {
				Products: action.products,
			};
		default:
			return state;
	}
};
