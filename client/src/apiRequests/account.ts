import http from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";
const accountApiRequest = {
  profile: () => http.get<AccountResType>("/accounts/me"),
};
export default accountApiRequest;
