import React from "react";
import { getSession } from "@/lib/auth/server";

import DashboardContent from "../_components/DashboardContent";

const page = async () => {
  const session = await getSession();

  return (
    <DashboardContent
      userId={session.data?.user.id}
      userEmail={session.data?.user.email}
    />
  );
};

export default page;
