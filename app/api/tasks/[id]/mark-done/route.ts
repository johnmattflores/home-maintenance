import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { MaintenanceTask } from '@/types/maintenance';
import { calculateNextDue } from '@/lib/utils';

const DATA_FILE = path.join(process.cwd(), 'data', 'tasks.json');

function getTasks(): MaintenanceTask[] {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function saveTasks(tasks: MaintenanceTask[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const tasks = getTasks();

  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  const task = tasks[index];
  const today = new Date().toISOString().split('T')[0];

  task.lastDone = today;
  task.nextDue = calculateNextDue(today, task.frequency);

  tasks[index] = task;
  saveTasks(tasks);

  return NextResponse.json(task);
}
