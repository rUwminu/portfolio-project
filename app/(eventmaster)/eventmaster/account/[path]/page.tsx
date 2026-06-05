import { AccountViewWrapper } from "../../_components/AccountViewWrapper";

const page = async ({ params }: { params: Promise<{ path: string[] }> }) => {
  const { path } = await params;

  const resolvedPath = Array.isArray(path) ? path.join("/") : path;

  return (
    <main className="container mx-auto p-4">
      <AccountViewWrapper pathname={resolvedPath} />
    </main>
  );
};

export default page;
