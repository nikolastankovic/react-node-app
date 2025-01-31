import { useAuthStore } from '@/stores/auth-store';
import { AuthContextType } from '@/types/auth';
import { createContext, useContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthService } from '@/services/auth-service';

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {

	const { isLoading } = useQuery<{ accessToken: string }>({
    queryKey: ["refresh"],
    queryFn: async () => {
      const response = await AuthService.refreshToken();
			useAuthStore.getState().setAccessToken(response.data.accessToken);
      return response.data;
    },
    retry: false,
    staleTime: 0,
  });

	return (
		<AuthContext.Provider value={{  }}>
			{!isLoading && children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);