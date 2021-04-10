import ProductListSchema from "../../Models/ProductList";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProducts = (prodListid) => {
	return async (dispatch, getState) => {
		const category = getState().product.Products.find(
			(item) => item.id === prodListid
		);
		const Cid = await category.id;
		// console.log(category.id);
		try {
			const response = await fetch(`http://stanum.co/api/category/${Cid}`);

			if (!response.ok) {
				throw new Error("Something went wrong."); // this error is because of URL breakdown.
			}
			const resData = await response.json();
			//console.log(resData);
			const loadedProductList = [];
			for (const key in resData.data) {
				loadedProductList.push(
					new ProductListSchema(
						resData.data[key].id,
						resData.data[key].name,
						resData.data[key].p_code,
						resData.data[key].pr_img[1],
						resData.data[key].price,
						resData.data[key].category_id,
						resData.data[key].description
					)
				);
			}
			//console.log(loadedProductList);
			dispatch({
				type: SET_PRODUCT,
				products: loadedProductList,
			});
		} catch (err) {
			throw err;
		}
	};
};
