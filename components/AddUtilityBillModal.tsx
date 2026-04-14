'use client';

import { useState } from 'react';
import { UtilityBill } from '@/types/utility-bill';
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
import { Plus, X } from 'lucide-react';

interface AddUtilityBillModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (bill: Omit<UtilityBill, 'id'>) => void;
}

export default function AddUtilityBillModal({ isOpen, onClose, onAdd }: AddUtilityBillModalProps) {
  const [month, setMonth] = useState('');
  const [utilities, setUtilities] = useState<{ name: string; amount: number }[]>([
    { name: 'Electric', amount: 0 },
    { name: 'Gas', amount: 0 },
    { name: 'Water', amount: 0 },
    { name: 'Internet', amount: 0 },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (month.trim()) {
      const utilitiesObj: { [key: string]: number } = {};
      let total = 0;

      utilities.forEach(util => {
        if (util.name.trim()) {
          utilitiesObj[util.name] = util.amount;
          total += util.amount;
        }
      });

      onAdd({
        month,
        utilities: utilitiesObj,
        total,
      });

      setMonth('');
      setUtilities([
        { name: 'Electric', amount: 0 },
        { name: 'Gas', amount: 0 },
        { name: 'Water', amount: 0 },
        { name: 'Internet', amount: 0 },
      ]);
    }
  };

  const addUtility = () => {
    setUtilities([...utilities, { name: '', amount: 0 }]);
  };

  const removeUtility = (index: number) => {
    setUtilities(utilities.filter((_, i) => i !== index));
  };

  const updateUtilityName = (index: number, name: string) => {
    const updated = [...utilities];
    updated[index].name = name;
    setUtilities(updated);
  };

  const updateUtilityAmount = (index: number, amount: number) => {
    const updated = [...utilities];
    updated[index].amount = amount;
    setUtilities(updated);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Utility Bill
          </DialogTitle>
          <DialogDescription>
            Add a new utility bill to track your monthly expenses. You can add custom utilities.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="new-month">
              Month <span className="text-red-500">*</span>
            </Label>
            <Input
              id="new-month"
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Utilities</Label>
              <Button
                type="button"
                onClick={addUtility}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Utility
              </Button>
            </div>

            {utilities.map((utility, index) => (
              <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end">
                <div className="space-y-2">
                  <Label htmlFor={`utility-name-${index}`} className="text-xs">
                    Name
                  </Label>
                  <Input
                    id={`utility-name-${index}`}
                    value={utility.name}
                    onChange={(e) => updateUtilityName(index, e.target.value)}
                    placeholder="e.g., Electric, Gas"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`utility-amount-${index}`} className="text-xs">
                    Amount ($)
                  </Label>
                  <Input
                    id={`utility-amount-${index}`}
                    type="number"
                    step="0.01"
                    value={utility.amount || ''}
                    onChange={(e) => updateUtilityAmount(index, parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => removeUtility(index)}
                  variant="outline"
                  size="sm"
                  className="text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>${utilities.reduce((sum, u) => sum + u.amount, 0).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-gradient-to-r from-slate-700 to-gray-800 hover:from-slate-800 hover:to-gray-900">
              <Plus className="mr-2 h-4 w-4" />
              Add Bill
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
