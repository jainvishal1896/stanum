class ProductListSchema {
	constructor(id, name, p_code, pr_img, price, category_id, description) {
		this.id = id;
		this.prodname = name;
		this.p_code = p_code;
		this.pr_img = pr_img;
		this.price = price;
		this.category_id = category_id;
		this.description = description;
	}
}

export default ProductListSchema;
