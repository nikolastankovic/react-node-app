export interface User {
	firstName: string;
	lastName: string;
	email: string;
}


export interface UseGetUserInfoResult {
	data: User | null;
	isLoading: boolean;
	error: Error | null;
}
