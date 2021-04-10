import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import Color from "../constants/Color";
import MainScreen from "../screens/MainScreen";
import ProductCategory from "../screens/ProductCategories";
import ProductListScreen from "../screens/ProductList";
import ProductDetailsScreen from "../screens/ProductDetails";
import SignUPpage from "../screens/SignUp";
import LogInpage from "../screens/Login";

function LogoTitle() {
	return (
		<Image
			style={{ width: 250, height: 100 }}
			source={require("../assets/image11.png")}
		/>
	);
}

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Color.primary,
	},
	headerTintColor: "white",
	headerTitleAlign: "center",
};

const MainScreenStack = createStackNavigator();

export const MainScreenNavigator = () => {
	return (
		<MainScreenStack.Navigator screenOptions={defaultNavOptions}>
			<MainScreenStack.Screen
				name="Main"
				component={MainScreen}
				options={{
					headerTitle: (props) => <LogoTitle {...props} />,
					headerStatusBarHeight: 100,
				}}
			/>
			<MainScreenStack.Screen name="Product" component={ProductCategory} />
			<MainScreenStack.Screen
				name="ProductList"
				component={ProductListScreen}
			/>
			<MainScreenStack.Screen
				name="ProductDetails"
				component={ProductDetailsScreen}
			/>
			<MainScreenStack.Screen name="SignUp" component={SignUPpage} />
			<MainScreenStack.Screen name="Login" component={LogInpage} />
		</MainScreenStack.Navigator>
	);
};

const styles = StyleSheet.create({
	text: { fontWeight: "bold", fontSize: 20 },
});
