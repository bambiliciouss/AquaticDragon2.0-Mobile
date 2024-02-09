import { Platform } from "react-native";

let baseURL = "";

// {
//   Platform.OS == "android"
//     ? (baseURL = "http://192.168.100.15:4000/api/v1/")
//     : (baseURL = "http://192.168.100.15:4000/api/v1/");
// }

{
  Platform.OS == "android"
    ? (baseURL = "http://172.20.10.8:4000/api/v1/")
    : (baseURL = "http://172.20.10.8:4000/api/v1/");
}

export default baseURL;
