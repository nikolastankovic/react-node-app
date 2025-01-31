import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { UserGreeting } from "@/components/user-greeting";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/stores/auth-store";
import { AuthService } from "@/services/auth-service";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
	const { data, isLoading } = useGetUserInfo();

	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			useAuthStore.getState().logout();
			await AuthService.logout();
			navigate("/register");
		} catch (error) {
			console.log('error', error);
		}
	};

	if (isLoading) {
		return (
			<div className="flex flex-col gap-6">
				<Skeleton className="h-[200px] w-full" />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 min-w-full	min-h-screen justify-center items-center">
			{data && (
				<UserGreeting
					firstName={data.firstName}
					lastName={data.lastName}
					onLogout={handleLogout}
				/>
			)}
			<Button onClick={() => handleLogout()}>Logout</Button>
		</div>
	);
}