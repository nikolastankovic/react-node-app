import { UseGetUserInfoResult, User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/services/user-service";

export const useGetUserInfo = (): UseGetUserInfoResult => {

  const { data, isLoading, error, isError } = useQuery<User>({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const response = await UserService.getUserData();
      return response.data;
    },
    retry: false,
    staleTime: 0,
  });

  return {
    data: data ?? null,
    isLoading,
    error: isError ? (error as Error) : null,
  };
};