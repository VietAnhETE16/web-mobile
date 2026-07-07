import { getApiBaseUrl } from "../constants/config";

export const API_URL = getApiBaseUrl();

export async function request<T>(path: string, options: RequestInit = {}, token = ""): Promise<T> {
  const response = await fetch(API_URL + path, {
    ...options,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  });
  const data = await response.json() as T & { error?: string };
  if (!response.ok) throw new Error(data.error || "Không thể kết nối máy chủ.");
  return data;
}
