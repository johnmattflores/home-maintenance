'use client';

import { FrequencyFilter } from '@/types/maintenance';

interface FilterBarProps {
  filter: FrequencyFilter;
  onFilterChange: (filter: FrequencyFilter) => void;
}

export default function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  const filters: FrequencyFilter[] = [
    'All',
    'Overdue',
    'Due Soon',
    'Monthly',
    'Every 3 Months',
    'Bi-Annually',
    'Annually',
  ];

  return (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
