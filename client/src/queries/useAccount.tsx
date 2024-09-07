import accountApiRequest from "@/apiRequests/account";
import { AccountResType } from "@/schemaValidations/account.schema";
import { useQuery } from "@tanstack/react-query";

const useAccountProfile = (onSuccess?: (data: AccountResType) => void) => {
  return useQuery({
    queryKey: [`account-profile`],
    queryFn: accountApiRequest.profile,
  });
};
export default useAccountProfile;
