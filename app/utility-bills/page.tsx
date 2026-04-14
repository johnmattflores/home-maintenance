'use client';

import { useState, useEffect } from 'react';
import { UtilityBill } from '@/types/utility-bill';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Receipt, TrendingUp, TrendingDown, DollarSign, Package, Home as HomeIcon } from 'lucide-react';
import Link from 'next/link';
import UtilityBillCard from '@/components/UtilityBillCard';
import AddUtilityBillModal from '@/components/AddUtilityBillModal';

export default function UtilityBillsPage() {
  const [bills, setBills] = useState<UtilityBill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    const response = await fetch('/api/utility-bills');
    const data = await response.json();
    setBills(data.sort((a: UtilityBill, b: UtilityBill) => b.month.localeCompare(a.month)));
  };

  const handleAddBill = async (bill: Omit<UtilityBill, 'id'>) => {
    const response = await fetch('/api/utility-bills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bill),
    });
    if (response.ok) {
      fetchBills();
      setIsModalOpen(false);
    }
  };

  const handleUpdateBill = async (bill: UtilityBill) => {
    const response = await fetch(`/api/utility-bills/${bill.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bill),
    });
    if (response.ok) {
      fetchBills();
    }
  };

  const handleDeleteBill = async (id: string) => {
    const response = await fetch(`/api/utility-bills/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchBills();
    }
  };

  // Analytics calculations
  const totalSpent = bills.reduce((sum, bill) => sum + bill.total, 0);
  const avgMonthly = bills.length > 0 ? totalSpent / bills.length : 0;

  // Get all unique utility names across all bills
  const allUtilityNames = new Set<string>();
  bills.forEach(bill => {
    Object.keys(bill.utilities).forEach(name => allUtilityNames.add(name));
  });

  // Calculate average for each utility
  const utilityAverages = Array.from(allUtilityNames).map(name => {
    const billsWithUtility = bills.filter(b => b.utilities[name] !== undefined);
    const total = billsWithUtility.reduce((sum, b) => sum + (b.utilities[name] || 0), 0);
    const avg = billsWithUtility.length > 0 ? total / billsWithUtility.length : 0;
    return { name, avg };
  }).sort((a, b) => b.avg - a.avg);

  // Trend calculation (compare last month to average)
  const lastBill = bills[0];
  const trend = lastBill && avgMonthly > 0
    ? ((lastBill.total - avgMonthly) / avgMonthly) * 100
    : 0;

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
    if (name.includes('electric') || name.includes('electricity')) return 'text-yellow-600 dark:text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
    if (name.includes('gas')) return 'text-orange-600 dark:text-orange-500 bg-orange-100 dark:bg-orange-900/30';
    if (name.includes('water')) return 'text-blue-600 dark:text-blue-500 bg-blue-100 dark:bg-blue-900/30';
    if (name.includes('internet') || name.includes('wifi')) return 'text-purple-600 dark:text-purple-500 bg-purple-100 dark:bg-purple-900/30';
    if (name.includes('trash') || name.includes('garbage')) return 'text-gray-600 dark:text-gray-500 bg-gray-100 dark:bg-gray-900/30';
    if (name.includes('sewer')) return 'text-teal-600 dark:text-teal-500 bg-teal-100 dark:bg-teal-900/30';
    if (name.includes('phone')) return 'text-indigo-600 dark:text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30';
    return 'text-slate-600 dark:text-slate-500 bg-slate-100 dark:bg-slate-900/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 dark:from-gray-950 dark:via-slate-950 dark:to-zinc-950">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-slate-800 to-gray-900 shadow-lg">
                <Receipt className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-gray-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent leading-tight">
                  Utility Bills
                </h1>
                <p className="text-muted-foreground mt-1">
                  Track and analyze your monthly utility expenses
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/">
                <Button variant="outline">
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Maintenance
                </Button>
              </Link>
              <Link href="/appliances">
                <Button variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Appliances
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
                    <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                      ${totalSpent.toFixed(2)}
                    </p>
                  </div>
                  <DollarSign className="h-10 w-10 text-slate-700 dark:text-slate-400 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-slate-900">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Monthly</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-700 dark:text-gray-300">
                      ${avgMonthly.toFixed(2)}
                    </p>
                  </div>
                  <Receipt className="h-10 w-10 text-gray-600 dark:text-gray-400 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900/50 dark:to-slate-900">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Bills</p>
                    <p className="text-2xl sm:text-3xl font-bold text-zinc-600 dark:text-zinc-400">
                      {bills.length}
                    </p>
                  </div>
                  <Receipt className="h-10 w-10 text-zinc-500 dark:text-zinc-400 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Trend</p>
                    <p className={`text-2xl sm:text-3xl font-bold ${
                      trend > 0
                        ? 'text-red-600 dark:text-red-400'
                        : trend < 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}>
                      {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
                    </p>
                  </div>
                  {trend > 0 ? (
                    <TrendingUp className="h-10 w-10 text-red-600 dark:text-red-400 opacity-50" />
                  ) : trend < 0 ? (
                    <TrendingDown className="h-10 w-10 text-green-600 dark:text-green-400 opacity-50" />
                  ) : (
                    <TrendingUp className="h-10 w-10 text-slate-600 dark:text-slate-400 opacity-50" />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Average by Utility */}
          {utilityAverages.length > 0 && (
            <Card className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900">
              <CardContent className="pt-4 sm:pt-6">
                <h3 className="font-semibold text-lg mb-4">Average Monthly Cost by Utility</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {utilityAverages.map(({ name, avg }) => (
                    <div key={name} className="flex items-center gap-3">
                      <div className={`p-2 ${getUtilityColor(name).split(' ').slice(2).join(' ')}`}>
                        <span className="text-xl">{getUtilityIcon(name)}</span>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{name}</p>
                        <p className="text-lg font-bold">${avg.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Add Bill Button */}
        <div className="mb-4 sm:mb-6">
          <Button
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="bg-gradient-to-r from-slate-700 to-gray-800 hover:from-slate-800 hover:to-gray-900 shadow-lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add New Bill
          </Button>
        </div>

        {/* Bills Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bills.map((bill) => (
            <UtilityBillCard
              key={bill.id}
              bill={bill}
              onUpdate={handleUpdateBill}
              onDelete={handleDeleteBill}
            />
          ))}
        </div>

        {bills.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
            <Receipt className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">
              No utility bills yet. Add your first bill to get started.
            </p>
          </div>
        )}
      </div>

      <AddUtilityBillModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddBill}
      />
    </div>
  );
}
