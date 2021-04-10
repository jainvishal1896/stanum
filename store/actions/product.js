import Product from "../../Models/Product";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProducts = () => {
	return async (dispatch) => {
		try {
			const response = await fetch("http://stanum.co/api/category");

			if (!response.ok) {
				throw new Error("Something went wrong."); // this error is because of URL breakdown.
			}
			const resData = await response.json();
			const loadedProduct = [];
			for (const key in resData.data) {
				loadedProduct.push(
					new Product(resData.data[key].id, resData.data[key].name)
				);
			}

			dispatch({
				type: SET_PRODUCT,
				products: loadedProduct,
			});
		} catch (err) {
			throw err;
		}
	};
};
