import authApiRequest from "@/apiRequests/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  if (!accessToken || !refreshToken) {
    return Response.json(
      {
        message:
          "Unable to receive access token or refresh token, forced to delete cookies", //Không nhận được access token hoặc refresh token, buộc phải xóa cookie
      },
      {
        status: 200,
      }
    );
  }
  try {
    const result = await authApiRequest.sLogout({
      accessToken: accessToken?.value,
      refreshToken: refreshToken?.value,
    });

    return Response.json(result.payload);
  } catch (error) {
    return Response.json(
      {
        message:
          "Error when calling API to backend server, forced to delete cookies", //Lỗi khi gọi API đến server backend, buộc phải xóa cookie
      },
      {
        status: 200,
      }
    );
  }
}
