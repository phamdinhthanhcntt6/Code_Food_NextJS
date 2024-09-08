import accountApiRequest from "@/apiRequests/account";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAccountMyProfileMutation = () => {
  return useQuery({
    queryKey: [`account-profile`],
    queryFn: accountApiRequest.profile,
  });
};

export const useUpdateMyProfile = () => {
  return useMutation({
    mutationFn: accountApiRequest.updateMyProfile,
  });
};
