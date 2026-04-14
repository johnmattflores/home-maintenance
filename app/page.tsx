'use client';

import { useState, useEffect } from 'react';
import { MaintenanceTask, FrequencyFilter } from '@/types/maintenance';
import { getTaskStatus, getStatusColor, formatDate, getDaysUntilDue } from '@/lib/utils';
import TaskCard from '@/components/TaskCard';
import FilterBar from '@/components/FilterBar';
import AddTaskModal from '@/components/AddTaskModal';

export default function Home() {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [filter, setFilter] = useState<FrequencyFilter>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const handleMarkDone = async (taskId: string) => {
    const response = await fetch(`/api/tasks/${taskId}/mark-done`, {
      method: 'POST',
    });
    if (response.ok) {
      fetchTasks();
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchTasks();
    }
  };

  const handleAddTask = async (task: Omit<MaintenanceTask, 'id'>) => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (response.ok) {
      fetchTasks();
      setIsModalOpen(false);
    }
  };

  const handleUpdateTask = async (task: MaintenanceTask) => {
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (response.ok) {
      fetchTasks();
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Overdue') return getTaskStatus(task) === 'overdue';
    if (filter === 'Due Soon') {
      const days = getDaysUntilDue(task.nextDue);
      return days !== null && days >= 0 && days <= 7;
    }
    return task.frequency === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const statusA = getTaskStatus(a);
    const statusB = getTaskStatus(b);
    const statusOrder = { 'overdue': 0, 'due-soon': 1, 'upcoming': 2, 'not-set': 3 };
    return statusOrder[statusA] - statusOrder[statusB];
  });

  const overdueTasks = tasks.filter(t => getTaskStatus(t) === 'overdue').length;
  const dueSoonTasks = tasks.filter(t => getTaskStatus(t) === 'due-soon').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            House Maintenance Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Keep your home in top shape with scheduled maintenance reminders
          </p>
          <div className="mt-4 flex gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow px-4 py-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Overdue: </span>
              <span className="text-lg font-bold text-red-600">{overdueTasks}</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow px-4 py-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Due Soon: </span>
              <span className="text-lg font-bold text-yellow-600">{dueSoonTasks}</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow px-4 py-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Tasks: </span>
              <span className="text-lg font-bold text-blue-600">{tasks.length}</span>
            </div>
          </div>
        </div>

        <FilterBar filter={filter} onFilterChange={setFilter} />

        <div className="mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors"
          >
            + Add New Task
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onMarkDone={handleMarkDone}
              onDelete={handleDeleteTask}
              onUpdate={handleUpdateTask}
            />
          ))}
        </div>

        {sortedTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No tasks found for the selected filter.
            </p>
          </div>
        )}
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTask}
      />
    </div>
  );
}
