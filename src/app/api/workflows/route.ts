import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Auto-seed a definition if none exist for testing
    let count = await prisma.workflowDefinition.count();
    if (count === 0) {
      await prisma.workflowDefinition.create({
        data: {
          name: 'Faculty Leave Request',
          module: 'HR',
          isActive: true,
        },
      });
    }

    const workflows = await prisma.workflowInstance.findMany({
      include: {
        definition: true,
        tasks: {
          where: { status: 'Pending' }
        }
      },
      orderBy: { startedAt: 'desc' }
    });
    return NextResponse.json(workflows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch workflows' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { definitionId, referenceId } = await request.json();

    const instance = await prisma.workflowInstance.create({
      data: {
        definitionId,
        referenceId,
        currentNode: 'Step 1: HOD Approval',
        tasks: {
          create: {
            assignedRole: 'HOD',
            status: 'Pending'
          }
        },
        auditLogs: {
          create: {
            action: 'Triggered',
            actor: 'System',
            comments: 'Workflow initiated'
          }
        }
      },
      include: {
        tasks: true
      }
    });

    return NextResponse.json(instance);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to trigger workflow' }, { status: 500 });
  }
}
