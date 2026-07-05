import { cn } from "@/lib/utils";

/** First character of the first two words of the name, e.g. "Wong Jeremy" → "WJ". */
export const nameInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("") || "?";

interface UserAvatarProps {
  name: string;
  className?: string;
}

const UserAvatar = ({ name, className }: UserAvatarProps) => (
  <span
    className={cn(
      "flex size-8 shrink-0 select-none items-center justify-center rounded-full bg-violet-100 text-xs font-semibold text-violet-900",
      className,
    )}
    title={name}
  >
    {nameInitials(name)}
  </span>
);

export default UserAvatar;
