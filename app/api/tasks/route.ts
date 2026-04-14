import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { MaintenanceTask } from '@/types/maintenance';

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

export async function GET() {
  const tasks = getTasks();
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const newTask: Omit<MaintenanceTask, 'id'> = await request.json();
  const tasks = getTasks();

  const task: MaintenanceTask = {
    ...newTask,
    id: Date.now().toString(),
  };

  tasks.push(task);
  saveTasks(tasks);

  return NextResponse.json(task, { status: 201 });
}
