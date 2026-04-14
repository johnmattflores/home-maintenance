'use client';

import { useState } from 'react';
import { MaintenanceTask } from '@/types/maintenance';
import { getTaskStatus, formatDate, getDaysUntilDue } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Pencil, Trash2, Save, X, Calendar, Clock, Tag } from 'lucide-react';

interface TaskCardProps {
  task: MaintenanceTask;
  onMarkDone: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (task: MaintenanceTask) => void;
}

export default function TaskCard({ task, onMarkDone, onDelete, onUpdate }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const status = getTaskStatus(task);
  const daysUntil = getDaysUntilDue(task.nextDue);

  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'overdue':
        return 'destructive';
      case 'due-soon':
        return 'default';
      case 'upcoming':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'overdue':
        return 'Overdue';
      case 'due-soon':
        return 'Due Soon';
      case 'upcoming':
        return 'Upcoming';
      default:
        return 'Not Set';
    }
  };

  const getBorderColor = (status: string) => {
    // No border colors needed anymore
    return '';
  };

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Edit Task</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task-name">Task Name</Label>
            <Input
              id="task-name"
              value={editedTask.task}
              onChange={(e) => setEditedTask({ ...editedTask, task: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={editedTask.category}
              onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
              placeholder="e.g., HVAC, Plumbing"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select
              value={editedTask.frequency}
              onValueChange={(value) => setEditedTask({ ...editedTask, frequency: value || '' })}
            >
              <SelectTrigger id="frequency">
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

          <div className="space-y-2">
            <Label htmlFor="next-due">Next Due Date</Label>
            <Input
              id="next-due"
              type="date"
              value={editedTask.nextDue}
              onChange={(e) => setEditedTask({ ...editedTask, nextDue: e.target.value })}
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={handleSave} className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button onClick={handleCancel} variant="outline" className="flex-1">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight">{task.task}</CardTitle>
          <Badge variant={getStatusBadgeVariant(status)} className="shrink-0">
            {getStatusLabel(status)}
          </Badge>
        </div>
        {task.category && (
          <div className="flex items-center gap-1 mt-2">
            <Tag className="h-3 w-3 text-muted-foreground" />
            <Badge variant="outline" className="text-xs">
              {task.category}
            </Badge>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Frequency
            </span>
            <span className="font-medium">{task.frequency || 'Not set'}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Last Done
            </span>
            <span className="font-medium">{formatDate(task.lastDone)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Next Due
            </span>
            <span className="font-medium">{formatDate(task.nextDue)}</span>
          </div>

          {daysUntil !== null && (
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="font-semibold text-foreground">Days until due:</span>
              <span className={`font-bold ${
                daysUntil < 0
                  ? 'text-slate-900 dark:text-slate-100'
                  : daysUntil <= 7
                  ? 'text-gray-700 dark:text-gray-300'
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}>
                {daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` : `${daysUntil} days`}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => onMarkDone(task.id)}
            className="flex-1 bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-700"
            size="sm"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Done
          </Button>
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            size="sm"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => {
              if (confirm('Are you sure you want to delete this task?')) {
                onDelete(task.id);
              }
            }}
            variant="outline"
            size="sm"
            className="text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
