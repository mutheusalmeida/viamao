import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

type MenuProps = {
  links?: JSX.Element;
};

export const Menu = ({ links }: MenuProps) => {
  const isTablet = useMediaQuery("(min-width: 640px)");
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <Drawer
        direction="left"
        open={open && !isTablet}
        onOpenChange={(prev) => setOpen(prev)}
      >
        <DrawerTrigger asChild>
          <Button variant="ghost" size="sm">
            <MenuIcon className="w-5 h-5" />
          </Button>
        </DrawerTrigger>

        <DrawerContent className="border-0 rounded-none top-0 m-0 w-[90vw] max-w-sm">
          {links}
        </DrawerContent>
      </Drawer>
    </div>
  );
};
