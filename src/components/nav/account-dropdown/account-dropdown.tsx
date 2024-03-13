import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { UserType } from "session";

type AccountDropdownProps = {
  user: UserType;
};

export const AccountDropdown = ({ user }: AccountDropdownProps) => {
  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    window.location.replace("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-max p-0">
          <Avatar email={user.email} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-svw max-w-56">
        <DropdownMenuLabel className="line-clamp-1 text-muted-foreground">
          mutheusalmeida@gmail.com
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer font-medium"
          onClick={logout}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
