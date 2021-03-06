import React, { useReducer, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export const INPUT_CHANGE = "INPUT_CHANGE";
export const INPUT_BLUR = "INPUT_BLUR";

const formReducer = (state, action) => {
	switch (action.type) {
		case INPUT_CHANGE:
			return {
				...state,
				value: action.value,
				isValid: action.isValid,
			};
		case INPUT_BLUR:
			return {
				...state,
				touched: true,
			};
		default:
			return state;
	}
};

const Input = (props) => {
	const [inputState, dispatchInputState] = useReducer(formReducer, {
		value: props.initialValue ? props.initialValue : "",
		isValid: props.initialValidity,
		touched: props.initialValue ? true : false,
	});

	const { onInputChange, id } = props;

	useEffect(() => {
		if (inputState.touched) {
			onInputChange(id, inputState.value, inputState.isValid);
		}
	}, [onInputChange, id, inputState]);

	const textChangeHandler = (text) => {
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let isValid = true;
		if (props.required && text.trim().length === 0) {
			isValid = false;
		}
		if (props.email && !emailRegex.test(text.toLowerCase())) {
			isValid = false;
		}
		if (props.min != null && +text < props.min) {
			isValid = false;
		}
		if (props.max != null && +text > props.max) {
			isValid = false;
		}
		if (props.minLength != null && text.length < props.minLength) {
			isValid = false;
		}
		dispatchInputState({ type: INPUT_CHANGE, value: text, isValid: isValid });
	};

	const lostFocusHandler = () => {
		dispatchInputState({ type: INPUT_BLUR });
	};

	return (
		<View style={styles.Container}>
			<Text style={styles.label}>{props.label}</Text>
			<TextInput
				{...props}
				style={styles.inputText}
				value={inputState.value}
				onChangeText={textChangeHandler}
				onBlur={lostFocusHandler}
			/>
			{!inputState.isValid && inputState.touched && (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{props.errorText}</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	Container: {
		margin: 10,
		width: "100%",
	},
	label: {
		//fontFamily: "open-sans-bold",
		marginVertical: 5,
		fontSize: 18,
	},
	inputText: {
		paddingHorizontal: 2,
		paddingVertical: 5,
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
	},
	errorContainer: {
		marginVertical: 5,
	},
	errorText: {
		//fontFamily: "open-sans-reg",
		color: "red",
		fontSize: 13,
	},
});

export default Input;
