import React, { useEffect, useState, useCallback } from "react";
import {
	Text,
	StyleSheet,
	FlatList,
	View,
	TextInput,
	Image,
	ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import Color from "../constants/Color";
import * as prodActions from "../store/actions/product";

const ProductCategories = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();

	const dispatch = useDispatch();
	const productCategories = useSelector((state) => state.product.Products);

	const loadCategories = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(prodActions.fetchProducts());
		} catch (err) {
			setError(err.message);
		}
		setIsRefreshing(false);
	}, [dispatch, setError, setIsLoading]);

	useEffect(() => {
		setIsLoading(true);
		loadCategories().then(() => {
			setIsLoading(false);
		});
	}, [dispatch]);

	useEffect(() => {
		const unsubscribe = props.navigation.addListener("focus", loadCategories);
		return () => {
			unsubscribe();
		};
	}, [loadCategories]);

	//console.log(productCategories);
	const selectHandler = (id) => {
		props.navigation.navigate("ProductList", {
			listId: id,
		});
	};

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An Error Occured</Text>
				<Button
					title="Try Again"
					color={Color.primary}
					onPress={loadCategories}
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

	if (!isLoading && productCategories.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No products has been found, Start Adding some products.</Text>
			</View>
		);
	}

	const ProductCategoryHandler = (id, name) => {
		return (
			<Card
				onPress={() => {
					selectHandler(id);
				}}
				style={styles.card}
			>
				<Image
					style={{
						width: "80%",
						height: 150,
						backgroundColor: Color.primary,
					}}
					source={require("../assets/image11.png")}
				/>
				<Text style={styles.text}>{name}</Text>
			</Card>
		);
	};
	return (
		<View style={{ flex: 1, alignItems: "center", width: "100%" }}>
			<TextInput style={styles.textInput} placeholder="Search" />
			<FlatList
				onRefresh={loadCategories}
				refreshing={isRefreshing}
				style={{ flex: 1, width: "85%" }}
				data={productCategories}
				keyExtractor={(item) => item.id.toString()}
				renderItem={(itemData) =>
					ProductCategoryHandler(itemData.item.id, itemData.item.Cname)
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	textInput: {
		borderWidth: 1,
		width: "90%",
		padding: 7,
		margin: 20,
		borderRadius: 40,
		backgroundColor: "white",
	},
	card: {
		width: "85%",
		borderWidth: 1,
		margin: 20,
		alignItems: "center",
		padding: 10,
	},
	text: {
		fontSize: 20,
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default ProductCategories;
