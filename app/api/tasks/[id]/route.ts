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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const updatedTask: MaintenanceTask = await request.json();
  const tasks = getTasks();

  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  tasks[index] = updatedTask;
  saveTasks(tasks);

  return NextResponse.json(updatedTask);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const tasks = getTasks();

  const filteredTasks = tasks.filter((task) => task.id !== id);
  if (filteredTasks.length === tasks.length) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  saveTasks(filteredTasks);

  return NextResponse.json({ success: true });
}
