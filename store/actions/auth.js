//import AsyncStorage from "@react-native-community/async-storage";
export const AUTHENTICATE = "AUTHENTICATE";
export const SIGNIN = "SIGNIN";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
//export const SET_DID_TRY_AL = "SET_DID_TRY_AL";

let timer;

// export const setDidTryAL = () => {
// 	return { type: SET_DID_TRY_AL };
// };

export const authenticate = (token, userId, expiryTime) => {
	return (dispatch) => {
		dispatch(setLogoutTimer(expiryTime));
		dispatch({ type: AUTHENTICATE, token: token, userId: userId });
	};
};

export const signup = (
	email,
	name,
	company,
	phone,
	password,
	confirm_password
) => {
	return async (dispatch) => {
		const response = await fetch("http://stanum.co/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				name: name,
				company: company,
				phone: phone,
				password: password,
				confirm_password: confirm_password,
				//returnSecureToken: true,
			}),
		});
		if (!response.ok) {
			const errorResData = await response.json();
			const errorMessage = errorResData.error.message;
			//console.log(errorMessage);
			throw new Error(errorMessage);
		}
		const resData = await response.json();
		console.log(resData);
		dispatch({ type: SIGNIN, id: resData.data.id, name: resData.data.name });
		// dispatch(
		// 	authenticate(
		// 		resData.idToken,
		// 		resData.localId,
		// 		parseInt(resData.expiresIn) * 1000
		// 	)
		// );
		// const expirationDate = new Date(
		// 	new Date().getTime() + parseInt(resData.expiresIn) * 1000
		// );
		// saveDataToStorage(resData.idToken, resData.localId, expirationDate);
	};
};

export const login = (email, password) => {
	return async (dispatch) => {
		const response = await fetch("http://stanum.co/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email,
				password: password,
				//returnSecureToken: true,
			}),
		});
		if (!response.ok) {
			const errorResData = await response.json();
			const errorMessage = errorResData.error.message;

			throw new Error(errorMessage);
		}
		const resData = await response.json();
		//console.log(resData);
		dispatch({
			type: LOGIN,
			id: resData.data.id,
			name: resData.data.name,
			token: resData.data.token,
		});
		// dispatch(
		// 	authenticate(
		// 		resData.idToken,
		// 		resData.localId,
		// 		parseInt(resData.expiresIn) * 1000
		// 	)
		// );
		// const expirationDate = new Date(
		// 	new Date().getTime() + parseInt(resData.expiresIn) * 1000
		// );
		// saveDataToStorage(resData.idToken, resData.localId, expirationDate);
	};
};

export const logout = () => {
	// clearLogoutTimer();
	// AsyncStorage.removeItem("userData");
	return { type: LOGOUT };
};

// const clearLogoutTimer = () => {
// 	if (timer) {
// 		clearTimeout(timer);
// 	}
// };

// const setLogoutTimer = (expirationTime) => {
// 	return (dispatch) => {
// 		timer = setTimeout(() => {
// 			dispatch(logout());
// 		}, expirationTime);
// 	};
// };

// const saveDataToStorage = (token, userId, expirationDate) => {
// 	AsyncStorage.setItem(
// 		"userData",
// 		JSON.stringify({
// 			token: token,
// 			userId: userId,
// 			expiryDate: expirationDate,
// 		})
// 	);
// };
