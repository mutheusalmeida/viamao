import {
  AvatarFallback,
  AvatarImage,
  Avatar as AvatarWrapper,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type AvatarProps = {
  className?: string;
  src?: string;
  email: string;
};

export const Avatar = ({ className, src, email }: AvatarProps) => {
  return (
    <AvatarWrapper className={cn("h-9 w-9", className)}>
      <AvatarImage src={src} alt="User avatar" loading="lazy" />

      <AvatarFallback className="bg-secondary uppercase font-semibold text-sm">
        {email.slice(0, 1)}
      </AvatarFallback>
    </AvatarWrapper>
  );
};
