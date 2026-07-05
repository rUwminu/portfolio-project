import type { Metadata } from "next";
import { Toaster } from "sonner";
import { AuthProvider } from "../_context/AuthContext";

export const metadata: Metadata = {
  title: "EventSocial",
  description: "Create and join events",
};

const EventSocialLayout = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    {children}
    <Toaster richColors position="top-center" />
  </AuthProvider>
);

export default EventSocialLayout;
