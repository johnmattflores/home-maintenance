'use client';

import { FrequencyFilter } from '@/types/maintenance';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Filter } from 'lucide-react';

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
    <Card className="mb-4 sm:mb-6">
      <CardContent className="pt-4 sm:pt-6">
        <div className="flex items-center gap-3 mb-3">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-lg">Filter Tasks</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Button
              key={f}
              onClick={() => onFilterChange(f)}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              className={filter === f ? 'bg-gradient-to-r from-slate-700 to-gray-800 hover:from-slate-800 hover:to-gray-900' : ''}
            >
              {f}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
