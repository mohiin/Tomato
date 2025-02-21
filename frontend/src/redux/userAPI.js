import { backendUrl } from "../config/config";

export const signupAPI = async (userData) => {
    const response = await fetch(`${backendUrl}/user/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData) // Send user data for signup
    });

    const data = await response.json();
    return data;
}

export const loginAPI = async (credentials) => {
    const response = await fetch(`${backendUrl}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials) // Send username and password
    });

    const data = await response.json();
    return data;
}

export const logoutAPI = async () => {
    const response = await fetch(`${backendUrl}/user/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const data = await response.json();
    return data;
}
