import { Button } from "../ui/button";
import {
  DrawerTitle,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "../ui/drawer";

import { Drawer } from "../ui/drawer";
import { NotificationBell } from "./NotificationBell";

export default function NotificationDrawer() {
  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <NotificationBell count={10} />
      </DrawerTrigger>
      <DrawerContent className="!rounded-none">
        <DrawerHeader>
          <DrawerTitle>Tabs</DrawerTitle>
          {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
        </DrawerHeader>

        {/* <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}
