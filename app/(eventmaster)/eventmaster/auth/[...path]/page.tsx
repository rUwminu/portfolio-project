import { AuthView } from "@neondatabase/auth/react";

export const dynamicParams = false;

const page = async ({ params }: { params: Promise<{ path: string[] }> }) => {
  const { path } = await params;

  // Join array back to a string: ["sign-in"] => "sign-in"
  const resolvedPath = Array.isArray(path) ? path.join("/") : path;

  return (
    <main className="container mx-auto flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
      <AuthView path={resolvedPath} />
    </main>
  );
};

export default page;
