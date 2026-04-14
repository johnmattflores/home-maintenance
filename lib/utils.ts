import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { MaintenanceTask } from '@/types/maintenance';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return 'Not set';
  const date = parseDate(dateStr);
  if (!date) return 'Not set';
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function getDaysUntilDue(nextDue: string): number | null {
  const dueDate = parseDate(nextDue);
  if (!dueDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = dueDate.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getTaskStatus(task: MaintenanceTask): 'overdue' | 'due-soon' | 'upcoming' | 'not-set' {
  const days = getDaysUntilDue(task.nextDue);
  if (days === null) return 'not-set';
  if (days < 0) return 'overdue';
  if (days <= 7) return 'due-soon';
  return 'upcoming';
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'overdue':
      return 'bg-slate-100 text-slate-900 border-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600';
    case 'due-soon':
      return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600';
    case 'upcoming':
      return 'bg-zinc-100 text-zinc-800 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-600';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600';
  }
}

export function calculateNextDue(lastDone: string, frequency: string): string {
  const date = parseDate(lastDone);
  if (!date) return '';

  const nextDate = new Date(date);

  switch (frequency.toLowerCase()) {
    case 'monthly':
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    case 'every 3 months':
      nextDate.setMonth(nextDate.getMonth() + 3);
      break;
    case 'bi-annually':
      nextDate.setMonth(nextDate.getMonth() + 6);
      break;
    case 'annually':
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      break;
    default:
      return '';
  }

  return nextDate.toISOString().split('T')[0];
}
