import { SET_PRODUCT } from "../actions/productList";

const initialState = {
	ProductCategoryList: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PRODUCT:
			return {
				ProductCategoryList: action.products,
			};
		default:
			return state;
	}
};
