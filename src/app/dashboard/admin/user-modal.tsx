import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function UserDetailModal({ user }: { user: any }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">View</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-2">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.talentProfile?.avatarUrl || user.hirerProfile?.avatarUrl || ''} alt={user.firstName} />
            <AvatarFallback>{(user.firstName?.[0] || '') + (user.lastName?.[0] || '')}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center gap-1">
            <span className="font-bold text-lg text-gray-900 dark:text-white">{user.firstName} {user.lastName}</span>
            <span className="text-gray-500 text-sm">{user.email}</span>
            <Badge variant={user.role === 'ADMIN' ? 'destructive' : user.role === 'HIRER' ? 'secondary' : 'default'}>{user.role}</Badge>
            <span className="text-xs text-gray-400">Joined {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 