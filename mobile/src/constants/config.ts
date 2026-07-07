import Constants from "expo-constants";
import { NativeModules, Platform } from "react-native";

export function getApiBaseUrl() {
  if (process.env.EXPO_PUBLIC_API_URL) return process.env.EXPO_PUBLIC_API_URL.replace(/\/+$/, "");
  const expoHost = Constants.expoConfig?.hostUri?.split(":")[0];
  const scriptUrl = NativeModules.SourceCode?.scriptURL as string | undefined;
  const metroHost = scriptUrl?.match(/^(?:https?|exps?):\/\/([^/:]+)/)?.[1];
  const host = [expoHost, metroHost].find(value => value && !["localhost", "127.0.0.1"].includes(value));
  if (host) return `http://${host}:3000/api`;
  return Platform.OS === "android" ? "http://10.0.2.2:3000/api" : "http://localhost:3000/api";
}
