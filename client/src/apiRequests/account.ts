import http from "@/lib/http";
import {
  AccountResType,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";
const accountApiRequest = {
  profile: () => http.get<AccountResType>("/accounts/me"),
  updateMyProfile: (body: UpdateMeBodyType) =>
    http.put<AccountResType>("/accounts/me", body),
};
export default accountApiRequest;
