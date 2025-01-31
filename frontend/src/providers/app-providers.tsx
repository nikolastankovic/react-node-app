import { ReactNode, StrictMode } from "react";
import { AuthProvider } from "@/context/auth-context";
import { ThemeProvider } from "@/context/theme-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export const AppProviders = ({ children }: { children: ReactNode }) => {
	return (
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<ThemeProvider>
						{children}
					</ThemeProvider>
				</AuthProvider >
			</QueryClientProvider>
		</StrictMode>
	);
};
