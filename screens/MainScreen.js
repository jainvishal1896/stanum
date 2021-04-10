import React, { useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Button,
} from "react-native";
import { useSelector } from "react-redux";

import Card from "../components/Card";

const MainScreen = (props) => {
	let Uid = null;
	Uid = useSelector((state) => state.auth.userId);

	return (
		<View style={styles.screen}>
			<TextInput style={styles.textInput} placeholder="Search" />
			<Card
				onPress={() => {
					props.navigation.navigate("Product");
				}}
				style={styles.card}
			>
				<Text style={styles.text}>Catalogues</Text>
			</Card>
			<Card onPress={() => {}} style={styles.card}>
				<Text style={styles.text}>Service Request</Text>
			</Card>
			{!Uid && (
				<View style={styles.buttonContainer}>
					<Button
						title="Login"
						onPress={() => {
							props.navigation.navigate("Login");
						}}
						style={styles.button}
					/>
					<Text style={{ textAlign: "center" }}>OR</Text>
					<Button
						title="SignUp"
						onPress={() => {
							props.navigation.navigate("SignUp");
						}}
						style={styles.button}
					/>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		//justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
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
	buttonContainer: {
		justifyContent: "flex-end",
		alignItems: "center",
		width: "100%",
		height: "50%",
	},
	button: {
		borderRadius: 10,
		width: "20%",
		padding: 10,
		margin: 20,
	},
});

export default MainScreen;
