import { privateApi } from "./api";
import { publicApi } from "./api";

interface RegisterData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface LoginData {
	email: string;
	password: string;
}

const AuthService = {
	register: function (registerData: RegisterData) {
		return publicApi.post("http://localhost:5000/auth/register", registerData);
	},

	login: function (loginData: LoginData) {
		return publicApi.post("http://localhost:5000/auth/login", loginData, {
			withCredentials: true
		});
	},

	logout: function () {
		privateApi.defaults.withCredentials = true;
		return privateApi.post("/auth/logout", {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			}
		});
	},

	refreshToken: function () {
		publicApi.defaults.withCredentials = true;
		return publicApi.get("http://localhost:5000/token/refresh", {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
			}
		});
	}
}




export { AuthService };