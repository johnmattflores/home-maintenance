'use client';

import { useState } from 'react';
import { Appliance } from '@/types/appliance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Trash2, Save, X, Calendar, DollarSign, FileText, Package, ExternalLink } from 'lucide-react';

interface ApplianceCardProps {
  appliance: Appliance;
  onUpdate: (appliance: Appliance) => void;
  onDelete: (id: string) => void;
}

export default function ApplianceCard({ appliance, onUpdate, onDelete }: ApplianceCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAppliance, setEditedAppliance] = useState(appliance);

  const handleSave = () => {
    onUpdate(editedAppliance);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedAppliance(appliance);
    setIsEditing(false);
  };

  const isUnderWarranty = () => {
    if (!appliance.warrantyEnd) return false;
    const warrantyDate = new Date(appliance.warrantyEnd);
    return warrantyDate > new Date();
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Not set';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatPrice = (price: string) => {
    if (!price) return 'N/A';
    return `$${parseFloat(price).toFixed(2)}`;
  };

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Edit Appliance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appliance">Appliance Type</Label>
              <Input
                id="appliance"
                value={editedAppliance.appliance}
                onChange={(e) => setEditedAppliance({ ...editedAppliance, appliance: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Brand/Model</Label>
              <Input
                id="brand"
                value={editedAppliance.brandModel}
                onChange={(e) => setEditedAppliance({ ...editedAppliance, brandModel: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="model">Model Number</Label>
              <Input
                id="model"
                value={editedAppliance.modelNumber}
                onChange={(e) => setEditedAppliance({ ...editedAppliance, modelNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serial">Serial Number</Label>
              <Input
                id="serial"
                value={editedAppliance.serialNumber}
                onChange={(e) => setEditedAppliance({ ...editedAppliance, serialNumber: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="purchase-date">Purchase Date</Label>
              <Input
                id="purchase-date"
                type="date"
                value={editedAppliance.purchaseDate}
                onChange={(e) => setEditedAppliance({ ...editedAppliance, purchaseDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="warranty">Warranty End</Label>
              <Input
                id="warranty"
                type="date"
                value={editedAppliance.warrantyEnd}
                onChange={(e) => setEditedAppliance({ ...editedAppliance, warrantyEnd: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Purchase Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={editedAppliance.purchasePrice}
              onChange={(e) => setEditedAppliance({ ...editedAppliance, purchasePrice: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="manual">Manual Link</Label>
            <Input
              id="manual"
              value={editedAppliance.manualLink}
              onChange={(e) => setEditedAppliance({ ...editedAppliance, manualLink: e.target.value })}
              placeholder="https://..."
            />
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
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight">{appliance.appliance}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{appliance.brandModel}</p>
          </div>
          {isUnderWarranty() && (
            <Badge variant="secondary" className="shrink-0">
              Under Warranty
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3 text-sm">
          {appliance.modelNumber && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <Package className="h-4 w-4" />
                Model
              </span>
              <span className="font-medium">{appliance.modelNumber}</span>
            </div>
          )}

          {appliance.purchaseDate && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Purchased
              </span>
              <span className="font-medium">{formatDate(appliance.purchaseDate)}</span>
            </div>
          )}

          {appliance.warrantyEnd && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Warranty Until
              </span>
              <span className="font-medium">{formatDate(appliance.warrantyEnd)}</span>
            </div>
          )}

          {appliance.purchasePrice && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                Price
              </span>
              <span className="font-medium">{formatPrice(appliance.purchasePrice)}</span>
            </div>
          )}

          {appliance.manualLink && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Manual
              </span>
              <a
                href={appliance.manualLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-700 dark:text-slate-300 hover:underline flex items-center gap-1"
              >
                View <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
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
              if (confirm('Are you sure you want to delete this appliance?')) {
                onDelete(appliance.id);
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
