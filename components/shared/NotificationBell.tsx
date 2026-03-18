import { Bell } from "lucide-react";

export function NotificationBell({ count }: { count: number }) {
  return (
    <div className="relative inline-flex items-center justify-center">
      <Bell className="w-6 h-6 text-gray-700 fill-current stroke-none" />

      {count > 0 && (
        <span
          className="absolute -top-1 right-0 flex items-center justify-center 
                             w-2 h-2 px-1 text-[10px] font-bold text-white 
                             bg-primary rounded-full"
        ></span>
      )}
    </div>
  );
}
