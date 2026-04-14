import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Appliance } from '@/types/appliance';

const DATA_FILE = path.join(process.cwd(), 'data', 'appliances.json');

function getAppliances(): Appliance[] {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveAppliances(appliances: Appliance[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(appliances, null, 2));
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const updatedAppliance: Appliance = await request.json();
  const appliances = getAppliances();

  const index = appliances.findIndex((app) => app.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Appliance not found' }, { status: 404 });
  }

  appliances[index] = updatedAppliance;
  saveAppliances(appliances);

  return NextResponse.json(updatedAppliance);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const appliances = getAppliances();

  const filteredAppliances = appliances.filter((app) => app.id !== id);
  if (filteredAppliances.length === appliances.length) {
    return NextResponse.json({ error: 'Appliance not found' }, { status: 404 });
  }

  saveAppliances(filteredAppliances);

  return NextResponse.json({ success: true });
}
