import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { action, comments, taskId } = await request.json();
    
    // Validate action
    if (!['Approved', 'Rejected'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    // Process the task
    const updatedTask = await prisma.workflowTask.update({
      where: { id: taskId },
      data: { status: action, assignedUser: 'Current User' }
    });

    // Update the instance overall status
    const updatedInstance = await prisma.workflowInstance.update({
      where: { id: params.id },
      data: { status: action }
    });

    // Log the audit trail
    await prisma.workflowAuditLog.create({
      data: {
        instanceId: params.id,
        taskId,
        action,
        actor: 'Current User',
        comments
      }
    });

    return NextResponse.json({ instance: updatedInstance, task: updatedTask });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to process workflow action' }, { status: 500 });
  }
}
