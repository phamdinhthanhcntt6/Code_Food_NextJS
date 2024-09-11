import accountApiRequest from "@/apiRequests/account";
import { cookies } from "next/headers";
import React from "react";

const DashboardPage = async () => {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("accessToken")?.value!;
  let name = "";
  try {
    const result = await accountApiRequest.sProfile(accessToken);
    name = result.payload.data.name;
  } catch (error: any) {
    // if (error.digest?.include("NEXT_REDIRECT")) {
    //   throw error;
    // }
  }

  return <div>DashboardPage: {name}</div>;
};

export default DashboardPage;
