'use client';

import { useState } from 'react';
import { MaintenanceTask } from '@/types/maintenance';
import { getTaskStatus, getStatusColor, formatDate, getDaysUntilDue } from '@/lib/utils';

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
  const statusColor = getStatusColor(status);
  const daysUntil = getDaysUntilDue(task.nextDue);

  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Task Name
            </label>
            <input
              type="text"
              value={editedTask.task}
              onChange={(e) => setEditedTask({ ...editedTask, task: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <input
              type="text"
              value={editedTask.category}
              onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Frequency
            </label>
            <select
              value={editedTask.frequency}
              onChange={(e) => setEditedTask({ ...editedTask, frequency: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="Monthly">Monthly</option>
              <option value="Every 3 Months">Every 3 Months</option>
              <option value="Bi-Annually">Bi-Annually</option>
              <option value="Annually">Annually</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Next Due
            </label>
            <input
              type="date"
              value={editedTask.nextDue}
              onChange={(e) => setEditedTask({ ...editedTask, nextDue: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 ${statusColor}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {task.task}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
          {status === 'not-set' ? 'Not Set' : status.replace('-', ' ').toUpperCase()}
        </span>
      </div>

      {task.category && (
        <div className="mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-200">
            {task.category}
          </span>
        </div>
      )}

      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex justify-between">
          <span className="font-medium">Frequency:</span>
          <span>{task.frequency || 'Not set'}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Last Done:</span>
          <span>{formatDate(task.lastDone)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Next Due:</span>
          <span>{formatDate(task.nextDue)}</span>
        </div>
        {daysUntil !== null && (
          <div className="flex justify-between font-semibold">
            <span>Days until due:</span>
            <span className={daysUntil < 0 ? 'text-red-600' : daysUntil <= 7 ? 'text-yellow-600' : 'text-green-600'}>
              {daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` : `${daysUntil} days`}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onMarkDone(task.id)}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
        >
          Mark Done
        </button>
        <button
          onClick={() => setIsEditing(true)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to delete this task?')) {
              onDelete(task.id);
            }
          }}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
