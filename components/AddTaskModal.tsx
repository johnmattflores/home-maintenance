'use client';

import { useState } from 'react';
import { MaintenanceTask } from '@/types/maintenance';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: Omit<MaintenanceTask, 'id'>) => void;
}

export default function AddTaskModal({ isOpen, onClose, onAdd }: AddTaskModalProps) {
  const [task, setTask] = useState<Omit<MaintenanceTask, 'id'>>({
    task: '',
    category: '',
    frequency: 'Monthly',
    lastDone: '',
    nextDue: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.task.trim()) {
      onAdd(task);
      setTask({
        task: '',
        category: '',
        frequency: 'Monthly',
        lastDone: '',
        nextDue: '',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Maintenance Task
          </DialogTitle>
          <DialogDescription>
            Create a new maintenance task to track for your home.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="new-task-name">
              Task Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="new-task-name"
              value={task.task}
              onChange={(e) => setTask({ ...task, task: e.target.value })}
              placeholder="e.g., Replace HVAC Filters"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-category">Category</Label>
            <Input
              id="new-category"
              value={task.category}
              onChange={(e) => setTask({ ...task, category: e.target.value })}
              placeholder="e.g., HVAC, Plumbing, Safety"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-frequency">
              Frequency <span className="text-red-500">*</span>
            </Label>
            <Select
              value={task.frequency}
              onValueChange={(value) => setTask({ ...task, frequency: value || '' })}
            >
              <SelectTrigger id="new-frequency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Every 3 Months">Every 3 Months</SelectItem>
                <SelectItem value="Bi-Annually">Bi-Annually</SelectItem>
                <SelectItem value="Annually">Annually</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-last-done">Last Done</Label>
              <Input
                id="new-last-done"
                type="date"
                value={task.lastDone}
                onChange={(e) => setTask({ ...task, lastDone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-next-due">Next Due</Label>
              <Input
                id="new-next-due"
                type="date"
                value={task.nextDue}
                onChange={(e) => setTask({ ...task, nextDue: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-gradient-to-r from-slate-700 to-gray-800 hover:from-slate-800 hover:to-gray-900">
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
            <Button type="button" onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
