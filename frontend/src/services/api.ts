import axios from 'axios';
import { useAuthStore } from '../stores/auth-store';
import { BASE_URL } from '@/constants';
import { toast } from "@/hooks/use-toast";

export const privateApi = axios.create({
	baseURL: BASE_URL,
});

export const publicApi = axios.create({
	baseURL: BASE_URL,
})

privateApi.interceptors.request.use(config => {

	const accessToken = useAuthStore.getState().accessToken;
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	if (!accessToken) {
		useAuthStore.getState().logout();
	}

	return config;
}, error => {
	return Promise.reject(error);
});

privateApi.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config;


		if (error.response?.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				axios.defaults.withCredentials = true;
				const { data } = await axios.get('http://localhost:5000/token/refresh', {
					withCredentials: true
				});
				useAuthStore.getState().setAccessToken(data.accessToken);
				privateApi.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;

				return privateApi(originalRequest);
			} catch (refreshError) {
				useAuthStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);

publicApi.interceptors.request.use(config => {
	return config;
}, error => {
	return Promise.reject(error);
});

publicApi.interceptors.response.use(
	response => response,
	async error => {
		if (error.response?.status !== 403) {
			toast({
				variant: "destructive",
				title: "Uh oh! Something went wrong.",
				description: error.response.data.message,
			})
		}

		return Promise.reject(error);
	}
);
