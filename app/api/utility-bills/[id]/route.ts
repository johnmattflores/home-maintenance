import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { UtilityBill } from '@/types/utility-bill';

const dataFilePath = path.join(process.cwd(), 'data', 'utility-bills.json');

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const updatedBill = await request.json();
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const bills: UtilityBill[] = JSON.parse(fileContents);

    const index = bills.findIndex((bill) => bill.id === id);
    if (index !== -1) {
      bills[index] = { ...updatedBill, id };
      await fs.writeFile(dataFilePath, JSON.stringify(bills, null, 2));
      return NextResponse.json(bills[index]);
    }

    return NextResponse.json({ error: 'Bill not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update bill' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const bills: UtilityBill[] = JSON.parse(fileContents);

    const filteredBills = bills.filter((bill) => bill.id !== id);
    await fs.writeFile(dataFilePath, JSON.stringify(filteredBills, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete bill' }, { status: 500 });
  }
}
