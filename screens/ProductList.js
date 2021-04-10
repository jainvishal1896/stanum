import React, { useEffect, useCallback, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Image,
	Button,
	ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import Color from "../constants/Color";
import * as prodListActions from "../store/actions/productList";

const ProductList = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();

	const dispatch = useDispatch();
	const ProductCategoryListData = useSelector(
		(state) => state.productCategoryList.ProductCategoryList
	);
	const productListId = props.route.params ? props.route.params.listId : null;

	const CategoryList = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(prodListActions.fetchProducts(productListId));
		} catch (err) {
			setError(err.message);
		}
		setIsRefreshing(false);
	}, [dispatch, setError, setIsLoading]);

	//console.log(productListId);
	useEffect(() => {
		setIsLoading(true);
		CategoryList().then(() => {
			setIsLoading(false);
		});
	}, [dispatch]);

	useEffect(() => {
		const unsubscribe = props.navigation.addListener("focus", CategoryList);
		return () => {
			unsubscribe();
		};
	}, [CategoryList]);

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An Error Occured</Text>
				<Button
					title="Try Again"
					color={Color.primary}
					onPress={CategoryList}
				/>
			</View>
		);
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Color.primary} />
			</View>
		);
	}

	if (!isLoading && ProductCategoryListData.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No products has been found, Start Adding some products.</Text>
			</View>
		);
	}

	return (
		<FlatList
			onRefresh={CategoryList}
			refreshing={isRefreshing}
			data={ProductCategoryListData}
			keyExtractor={(item) => item.id.toString()}
			renderItem={(itemData) => (
				<Card onPress={() => {}} style={styles.card}>
					<Image
						style={{
							width: "100%",
							height: 150,
							backgroundColor: Color.primary,
							alignItems: "center",
						}}
						source={require("../assets/image11.png")}
					/>
					<Text style={styles.p_code}>{itemData.item.p_code}</Text>
					<View style={styles.txtContainer}>
						<Text numberOfLines={2} style={styles.name}>
							{itemData.item.prodname}
						</Text>
						<Text style={styles.price}>{itemData.item.price}</Text>
					</View>
				</Card>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	card: {
		width: "90%",
		borderWidth: 1,
		margin: 20,
		//alignItems: "center",
		padding: 10,
	},
	image: {
		width: "80%",
		height: 150,
		padding: 10,
		//borderWidth: 1,
	},
	txtContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
	},
	p_code: {
		fontSize: 20,
		paddingLeft: 10,
		fontWeight: "bold",
		color: Color.primary,
	},
	price: {
		fontSize: 15,
	},
	name: {
		width: "50%",
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default ProductList;
