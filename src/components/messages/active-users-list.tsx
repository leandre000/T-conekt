import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ActiveUsersList({ onStartConversation, currentUserId }: { onStartConversation: (user: any) => void; currentUserId?: string }) {
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = io({ path: "/api/socket" });
    socket.emit("get-active-users");
    socket.on("active-users", (users: any[]) => {
      setActiveUsers(users.filter(u => u.id !== currentUserId));
      setLoading(false);
    });
    return () => socket.disconnect();
  }, [currentUserId]);

  if (loading) {
    return <div className="p-4 animate-pulse text-gray-400">Loading active users...</div>;
  }
  if (!activeUsers.length) {
    return <div className="p-4 text-gray-400">No users online</div>;
  }
  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Active Users</h3>
      <ul className="space-y-2">
        {activeUsers.map((user) => (
          <li key={user.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 rounded p-2 transition" onClick={() => onStartConversation(user)}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image || ""} alt={user.name || "U"} />
              <AvatarFallback>{user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-gray-900 dark:text-white">{user.name || "User"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 