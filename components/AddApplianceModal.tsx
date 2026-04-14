'use client';

import { useState } from 'react';
import { Appliance } from '@/types/appliance';
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
import { Plus } from 'lucide-react';

interface AddApplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (appliance: Omit<Appliance, 'id'>) => void;
}

export default function AddApplianceModal({ isOpen, onClose, onAdd }: AddApplianceModalProps) {
  const [appliance, setAppliance] = useState<Omit<Appliance, 'id'>>({
    appliance: '',
    brandModel: '',
    serialNumber: '',
    modelNumber: '',
    purchaseDate: '',
    warrantyEnd: '',
    filterPartNumber: '',
    manualLink: '',
    lastService: '',
    purchasePrice: '',
    purchaseLink: '',
    repair1Cost: '',
    repair1Date: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (appliance.appliance.trim()) {
      onAdd(appliance);
      setAppliance({
        appliance: '',
        brandModel: '',
        serialNumber: '',
        modelNumber: '',
        purchaseDate: '',
        warrantyEnd: '',
        filterPartNumber: '',
        manualLink: '',
        lastService: '',
        purchasePrice: '',
        purchaseLink: '',
        repair1Cost: '',
        repair1Date: '',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Appliance
          </DialogTitle>
          <DialogDescription>
            Add a new appliance to track warranties, manuals, and service history.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-appliance">
                Appliance Type <span className="text-red-500">*</span>
              </Label>
              <Input
                id="new-appliance"
                value={appliance.appliance}
                onChange={(e) => setAppliance({ ...appliance, appliance: e.target.value })}
                placeholder="e.g., Refrigerator, Washer"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-brand">Brand/Model</Label>
              <Input
                id="new-brand"
                value={appliance.brandModel}
                onChange={(e) => setAppliance({ ...appliance, brandModel: e.target.value })}
                placeholder="e.g., LG, Maytag"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-model">Model Number</Label>
              <Input
                id="new-model"
                value={appliance.modelNumber}
                onChange={(e) => setAppliance({ ...appliance, modelNumber: e.target.value })}
                placeholder="e.g., LF21C6200S"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-serial">Serial Number</Label>
              <Input
                id="new-serial"
                value={appliance.serialNumber}
                onChange={(e) => setAppliance({ ...appliance, serialNumber: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-purchase-date">Purchase Date</Label>
              <Input
                id="new-purchase-date"
                type="date"
                value={appliance.purchaseDate}
                onChange={(e) => setAppliance({ ...appliance, purchaseDate: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-warranty">Warranty End Date</Label>
              <Input
                id="new-warranty"
                type="date"
                value={appliance.warrantyEnd}
                onChange={(e) => setAppliance({ ...appliance, warrantyEnd: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-price">Purchase Price</Label>
            <Input
              id="new-price"
              type="number"
              step="0.01"
              value={appliance.purchasePrice}
              onChange={(e) => setAppliance({ ...appliance, purchasePrice: e.target.value })}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-manual">Manual Link</Label>
            <Input
              id="new-manual"
              value={appliance.manualLink}
              onChange={(e) => setAppliance({ ...appliance, manualLink: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-purchase-link">Purchase Link</Label>
            <Input
              id="new-purchase-link"
              value={appliance.purchaseLink}
              onChange={(e) => setAppliance({ ...appliance, purchaseLink: e.target.value })}
              placeholder="https://..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-gradient-to-r from-slate-700 to-gray-800 hover:from-slate-800 hover:to-gray-900">
              <Plus className="mr-2 h-4 w-4" />
              Add Appliance
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
