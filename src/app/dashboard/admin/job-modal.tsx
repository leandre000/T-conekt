import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

export function JobDetailModal({ job }: { job: any }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">View</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-2">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-gray-900 dark:text-white">{job.title || <span className='italic text-gray-400'>No title</span>}</span>
          </div>
          <div><b>Hirer ID:</b> {job.hirerId || <span className='italic text-gray-400'>Unknown</span>}</div>
          <div><b>Created:</b> {job.createdAt ? new Date(job.createdAt).toLocaleString() : <span className='italic text-gray-400'>Unknown</span>}</div>
          <div><b>Description:</b> {job.description || <span className='italic text-gray-400'>No description provided</span>}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 