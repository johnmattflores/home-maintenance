import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { UtilityBill } from '@/types/utility-bill';

const dataFilePath = path.join(process.cwd(), 'data', 'utility-bills.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const bills: UtilityBill[] = JSON.parse(fileContents);
    return NextResponse.json(bills);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const newBill = await request.json();
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const bills: UtilityBill[] = JSON.parse(fileContents);

    const billWithId = {
      ...newBill,
      id: Date.now().toString(),
    };

    bills.push(billWithId);
    await fs.writeFile(dataFilePath, JSON.stringify(bills, null, 2));

    return NextResponse.json(billWithId);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create bill' }, { status: 500 });
  }
}
