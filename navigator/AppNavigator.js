import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MainScreenNavigator } from "./ScreenNavigators";

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<MainScreenNavigator />
		</NavigationContainer>
	);
};
export default AppNavigator;
