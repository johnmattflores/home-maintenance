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

export async function GET() {
  const appliances = getAppliances();
  return NextResponse.json(appliances);
}

export async function POST(request: Request) {
  const newAppliance: Omit<Appliance, 'id'> = await request.json();
  const appliances = getAppliances();

  const appliance: Appliance = {
    ...newAppliance,
    id: Date.now().toString(),
  };

  appliances.push(appliance);
  saveAppliances(appliances);

  return NextResponse.json(appliance, { status: 201 });
}
