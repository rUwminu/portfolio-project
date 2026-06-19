"use client";

export default function RecordlikeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full h-full overflow-x-hidden">{children}</div>;
}
