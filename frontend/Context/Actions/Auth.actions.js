import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import baseURL from "../../assets/common/baseurl";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = async (user, dispatch) => {
  try {
    const response = await fetch(`${baseURL}login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data && data.token) {
      const token = data.token;

      await AsyncStorage.setItem("jwt", token);
      console.log("Token stored successfully.");
      console.log(token);

      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        dispatch(setCurrentUser(decoded, user));
      } catch (decodeError) {
        console.error("Error decoding token:", decodeError);
        // Handle decoding error, maybe log more details or show an error message.
      }
    } else {
      logoutUser(dispatch);
    }
  } catch (err) {
    console.log(err);
    Toast.show({
      topOffset: 60,
      type: "error",
      text1: "Please provide correct credentials",
      text2: "",
    });
    logoutUser(dispatch);
  }
};


// export const getUserProfile = (id) => {
//   fetch(`${baseURL}me`, {
//     method: "GET",
//     body: JSON.stringify(user),
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// };

export const logoutUser = (dispatch) => {
  AsyncStorage.removeItem("jwt");
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};
