import accountApiRequest from "@/apiRequests/account";
import { useQuery } from "@tanstack/react-query";

const useAccountProfile = () => {
  return useQuery({
    queryKey: [`account-profile`],
    queryFn: accountApiRequest.profile,
  });
};
export default useAccountProfile;
