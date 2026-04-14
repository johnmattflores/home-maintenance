export interface MaintenanceTask {
  id: string;
  task: string;
  category: string;
  frequency: string;
  lastDone: string;
  nextDue: string;
}

export type FrequencyFilter = 'All' | 'Overdue' | 'Due Soon' | 'Monthly' | 'Every 3 Months' | 'Bi-Annually' | 'Annually';
