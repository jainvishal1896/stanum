import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import * as SplashScreen from "expo-splash-screen";

import ProductReducer from "./store/reducers/product";
import AuthReducer from "./store/reducers/auth";
import ProductCategoryListReducer from "./store/reducers/productList";
import AppNavigator from "./navigator/AppNavigator";

export default function App() {
	const rootReducer = combineReducers({
		auth: AuthReducer,
		product: ProductReducer,
		productCategoryList: ProductCategoryListReducer,
	});
	const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

	return (
		<Provider store={store}>
			<AppNavigator />
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
