'use client';

import { useState, useEffect } from 'react';
import { Appliance } from '@/types/appliance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Package, DollarSign, Calendar, FileText, Wrench, ExternalLink } from 'lucide-react';
import ApplianceCard from '@/components/ApplianceCard';
import AddApplianceModal from '@/components/AddApplianceModal';

export default function AppliancesPage() {
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAppliances();
  }, []);

  const fetchAppliances = async () => {
    const response = await fetch('/api/appliances');
    const data = await response.json();
    setAppliances(data);
  };

  const handleAddAppliance = async (appliance: Omit<Appliance, 'id'>) => {
    const response = await fetch('/api/appliances', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appliance),
    });
    if (response.ok) {
      fetchAppliances();
      setIsModalOpen(false);
    }
  };

  const handleUpdateAppliance = async (appliance: Appliance) => {
    const response = await fetch(`/api/appliances/${appliance.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appliance),
    });
    if (response.ok) {
      fetchAppliances();
    }
  };

  const handleDeleteAppliance = async (id: string) => {
    const response = await fetch(`/api/appliances/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchAppliances();
    }
  };

  const totalValue = appliances.reduce((sum, app) => {
    const price = parseFloat(app.purchasePrice || '0');
    return sum + price;
  }, 0);

  const underWarranty = appliances.filter(app => {
    if (!app.warrantyEnd) return false;
    const warrantyDate = new Date(app.warrantyEnd);
    return warrantyDate > new Date();
  }).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 dark:from-gray-950 dark:via-slate-950 dark:to-zinc-950">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-6 sm:py-8 lg:py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8 lg:mb-10 space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-slate-800 to-gray-900 shadow-lg">
              <Package className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-gray-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent leading-tight">
                Appliances
              </h1>
              <p className="text-muted-foreground mt-1">
                Track your home appliances, warranties, and service history
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Card className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Appliances</p>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">{appliances.length}</p>
                  </div>
                  <Package className="h-10 w-10 text-slate-700 dark:text-slate-400 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-slate-900">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-700 dark:text-gray-300">${totalValue.toFixed(2)}</p>
                  </div>
                  <DollarSign className="h-10 w-10 text-gray-600 dark:text-gray-400 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900/50 dark:to-slate-900">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Under Warranty</p>
                    <p className="text-2xl sm:text-3xl font-bold text-zinc-600 dark:text-zinc-400">{underWarranty}</p>
                  </div>
                  <FileText className="h-10 w-10 text-zinc-500 dark:text-zinc-400 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">LG Appliances</p>
                    <p className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">
                      {appliances.filter(a => a.brandModel.includes('LG')).length}
                    </p>
                  </div>
                  <Wrench className="h-10 w-10 text-slate-600 dark:text-slate-400 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Appliance Button */}
        <div className="mb-4 sm:mb-6">
          <Button
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="bg-gradient-to-r from-slate-700 to-gray-800 hover:from-slate-800 hover:to-gray-900 shadow-lg"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add New Appliance
          </Button>
        </div>

        {/* Appliances Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {appliances.map((appliance) => (
            <ApplianceCard
              key={appliance.id}
              appliance={appliance}
              onUpdate={handleUpdateAppliance}
              onDelete={handleDeleteAppliance}
            />
          ))}
        </div>

        {appliances.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg">
              No appliances yet. Add your first appliance to get started.
            </p>
          </div>
        )}
      </div>

      <AddApplianceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddAppliance}
      />
    </div>
  );
}
