import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
	View,
	StyleSheet,
	Button,
	ScrollView,
	KeyboardAvoidingView,
	Alert,
	ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Input from "../components/Input";
import Color from "../constants/Color";
import * as authActions from "../store/actions/auth";

export const SIGNUP = "SIGNUP";

const formReducer = (state, action) => {
	switch (action.type) {
		case SIGNUP:
			const updatedValues = {
				...state.inputValues,
				[action.input]: action.value,
			};
			const updatedValidities = {
				...state.inputValidities,
				[action.input]: action.isValid,
			};
			let UpdatedFormisValid = true;
			for (const key in updatedValidities) {
				UpdatedFormisValid = UpdatedFormisValid && updatedValidities[key];
			}
			return {
				inputValues: updatedValues,
				inputValidities: updatedValidities,
				formIsValid: UpdatedFormisValid,
			};
	}
	return state;
};

const AuthScreen = (props) => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			email: "",
			Uname: "",
			company: "",
			phone: "",
			password: "",
			confirm_password: "",
		},
		inputValidities: {
			email: false,
			Uname: false,
			company: false,
			phone: false,
			password: false,
			confirm_password: false,
		},
		formIsValid: false,
	});

	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: SIGNUP,
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier,
			});
		},
		[dispatchFormState]
	);

	const AuthHandler = async () => {
		let action = authActions.signup(
			formState.inputValues.email,
			formState.inputValues.Uname,
			formState.inputValues.company,
			formState.inputValues.phone,
			formState.inputValues.password,
			formState.inputValues.confirm_password
		);

		setError(null);
		setIsLoading(true);
		try {
			await dispatch(action);
			props.navigation.navigate("Main");
		} catch (err) {
			setError(err.message);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (error) {
			Alert.alert("You got ERROR", error, [
				{
					text: "Okay",
					style: "destructive",
				},
			]);
		}
	}, [error]);
	return (
		<KeyboardAvoidingView style={styles.screen}>
			<LinearGradient colors={["#e5a88b", "white"]} style={styles.gradient}>
				<View style={styles.card}>
					<ScrollView>
						<Input
							id="email"
							label="E-mail"
							onInputChange={inputChangeHandler}
							initialValue=""
							initialValidity={false}
							keyboardType="email-address"
							autoCapitalize="none"
							returnKeyType="next"
							errorText="Please enter a valid Email"
							required
							email
						/>
						<Input
							id="Uname"
							label="Name"
							onInputChange={inputChangeHandler}
							initialValue=""
							required
							autoCapitalize="none"
							returnKeyType="next"
							errorText="Please enter a valid Name"
						/>
						<Input
							id="company"
							label="Company"
							onInputChange={inputChangeHandler}
							initialValue=""
							required
							autoCapitalize="none"
							returnKeyType="next"
							errorText="Please enter a valid Company Name"
						/>
						<Input
							id="phone"
							label="Phone Number"
							onInputChange={inputChangeHandler}
							initialValue=""
							required
							minLength={10}
							returnKeyType="next"
							errorText="Please enter a valid Phone Number"
						/>
						<Input
							id="password"
							label="Password"
							onInputChange={inputChangeHandler}
							initialValue=""
							secureTextEntry
							required
							minLength={6}
							autoCapitalize="none"
							returnKeyType="next"
							errorText="Please enter a valid Password"
						/>
						<Input
							id="confirm_password"
							label="Confirm Password"
							onInputChange={inputChangeHandler}
							initialValue=""
							secureTextEntry
							required
							minLength={6}
							autoCapitalize="none"
							returnKeyType="next"
							errorText="Please enter a valid Password"
						/>
						{isLoading ? (
							<ActivityIndicator size="small" color={Color.primary} />
						) : (
							<Button
								title="Sign Up"
								color={Color.primary}
								onPress={AuthHandler}
							/>
						)}
					</ScrollView>
				</View>
			</LinearGradient>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	gradient: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
	},
	card: {
		elevation: 5,
		backgroundColor: "white",
		overflow: "hidden",
		borderRadius: 20,
		width: "80%",
		maxWidth: 400,
		maxHeight: 400,
		padding: 20,
	},
});

export default AuthScreen;
