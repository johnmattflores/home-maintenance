'use client';

import { useState } from 'react';
import { UtilityBill } from '@/types/utility-bill';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Trash2, Save, X, Plus } from 'lucide-react';

interface UtilityBillCardProps {
  bill: UtilityBill;
  onUpdate: (bill: UtilityBill) => void;
  onDelete: (id: string) => void;
}

const getUtilityIcon = (utilityName: string) => {
  const name = utilityName.toLowerCase();
  if (name.includes('electric') || name.includes('electricity')) return '⚡';
  if (name.includes('gas')) return '🔥';
  if (name.includes('water')) return '💧';
  if (name.includes('internet') || name.includes('wifi')) return '📡';
  if (name.includes('trash') || name.includes('garbage')) return '🗑️';
  if (name.includes('sewer')) return '🚰';
  if (name.includes('phone')) return '📞';
  return '💰';
};

const getUtilityColor = (utilityName: string) => {
  const name = utilityName.toLowerCase();
  if (name.includes('electric') || name.includes('electricity')) return 'text-yellow-600 dark:text-yellow-500';
  if (name.includes('gas')) return 'text-orange-600 dark:text-orange-500';
  if (name.includes('water')) return 'text-blue-600 dark:text-blue-500';
  if (name.includes('internet') || name.includes('wifi')) return 'text-purple-600 dark:text-purple-500';
  if (name.includes('trash') || name.includes('garbage')) return 'text-gray-600 dark:text-gray-500';
  if (name.includes('sewer')) return 'text-teal-600 dark:text-teal-500';
  if (name.includes('phone')) return 'text-indigo-600 dark:text-indigo-500';
  return 'text-slate-600 dark:text-slate-500';
};

export default function UtilityBillCard({ bill, onUpdate, onDelete }: UtilityBillCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMonth, setEditedMonth] = useState(bill.month);
  const [editedUtilities, setEditedUtilities] = useState<{ name: string; amount: number }[]>(
    Object.entries(bill.utilities).map(([name, amount]) => ({ name, amount }))
  );

  const handleSave = () => {
    const utilitiesObj: { [key: string]: number } = {};
    let total = 0;

    editedUtilities.forEach(util => {
      if (util.name.trim()) {
        utilitiesObj[util.name] = util.amount;
        total += util.amount;
      }
    });

    onUpdate({
      ...bill,
      month: editedMonth,
      utilities: utilitiesObj,
      total,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedMonth(bill.month);
    setEditedUtilities(Object.entries(bill.utilities).map(([name, amount]) => ({ name, amount })));
    setIsEditing(false);
  };

  const addUtility = () => {
    setEditedUtilities([...editedUtilities, { name: '', amount: 0 }]);
  };

  const removeUtility = (index: number) => {
    setEditedUtilities(editedUtilities.filter((_, i) => i !== index));
  };

  const updateUtilityName = (index: number, name: string) => {
    const updated = [...editedUtilities];
    updated[index].name = name;
    setEditedUtilities(updated);
  };

  const updateUtilityAmount = (index: number, amount: number) => {
    const updated = [...editedUtilities];
    updated[index].amount = amount;
    setEditedUtilities(updated);
  };

  const formatMonth = (monthStr: string) => {
    const date = new Date(monthStr + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Edit Bill</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="month">Month</Label>
            <Input
              id="month"
              type="month"
              value={editedMonth}
              onChange={(e) => setEditedMonth(e.target.value)}
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
                Add
              </Button>
            </div>

            {editedUtilities.map((utility, index) => (
              <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end">
                <div className="space-y-2">
                  <Label htmlFor={`edit-utility-name-${index}`} className="text-xs">
                    Name
                  </Label>
                  <Input
                    id={`edit-utility-name-${index}`}
                    value={utility.name}
                    onChange={(e) => updateUtilityName(index, e.target.value)}
                    placeholder="Utility name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edit-utility-amount-${index}`} className="text-xs">
                    Amount ($)
                  </Label>
                  <Input
                    id={`edit-utility-amount-${index}`}
                    type="number"
                    step="0.01"
                    value={utility.amount}
                    onChange={(e) => updateUtilityAmount(index, parseFloat(e.target.value) || 0)}
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
          <CardTitle className="text-lg leading-tight">{formatMonth(bill.month)}</CardTitle>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              ${bill.total.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3 text-sm">
          {Object.entries(bill.utilities).map(([name, amount]) => (
            <div key={name} className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2">
                <span className={`text-lg ${getUtilityColor(name)}`}>
                  {getUtilityIcon(name)}
                </span>
                {name}
              </span>
              <span className="font-medium">${amount.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            onClick={() => {
              if (confirm('Are you sure you want to delete this bill?')) {
                onDelete(bill.id);
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
