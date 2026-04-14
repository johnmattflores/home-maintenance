'use client';

import { useState, useEffect } from 'react';
import { MaintenanceTask, FrequencyFilter } from '@/types/maintenance';
import { getTaskStatus, getDaysUntilDue } from '@/lib/utils';
import TaskCard from '@/components/TaskCard';
import FilterBar from '@/components/FilterBar';
import AddTaskModal from '@/components/AddTaskModal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Home as HomeIcon, AlertCircle, Clock, CheckCircle2, Package, Receipt } from 'lucide-react';
import Link from 'next/link';

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
  const upcomingTasks = tasks.filter(t => getTaskStatus(t) === 'upcoming').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 dark:from-gray-950 dark:via-slate-950 dark:to-zinc-950">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-slate-800 to-gray-900 shadow-lg">
              <HomeIcon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-gray-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent leading-tight">
                House Maintenance Tracker
              </h1>
              <p className="text-muted-foreground mt-1">
                Keep your home in top shape with scheduled maintenance reminders
              </p>
            </div>
            </div>
            <div className="flex gap-2">
              <Link href="/appliances">
                <Button variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Appliances
                </Button>
              </Link>
              <Link href="/utility-bills">
                <Button variant="outline">
                  <Receipt className="mr-2 h-4 w-4" />
                  Bills
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Card className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">{overdueTasks}</p>
                  </div>
                  <AlertCircle className="h-10 w-10 text-slate-700 dark:text-slate-400 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-slate-900">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Due Soon</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-700 dark:text-gray-300">{dueSoonTasks}</p>
                  </div>
                  <Clock className="h-10 w-10 text-gray-600 dark:text-gray-400 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900/50 dark:to-slate-900">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                    <p className="text-2xl sm:text-3xl font-bold text-zinc-600 dark:text-zinc-400">{upcomingTasks}</p>
                  </div>
                  <CheckCircle2 className="h-10 w-10 text-zinc-500 dark:text-zinc-400 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">{tasks.length}</p>
                  </div>
                  <HomeIcon className="h-10 w-10 text-slate-600 dark:text-slate-400 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar filter={filter} onFilterChange={setFilter} />

        {/* Add Task Button */}
        <div className="mb-6">
          <Button
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="bg-gradient-to-r from-slate-700 to-gray-800 hover:from-slate-800 hover:to-gray-900 shadow-lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add New Task
          </Button>
        </div>

        {/* Tasks Grid */}
        {sortedTasks.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
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
        ) : (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No tasks found for the selected filter. Try changing the filter or add a new task.
            </AlertDescription>
          </Alert>
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
