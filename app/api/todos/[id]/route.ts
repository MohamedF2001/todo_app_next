/*  */

/* import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Todo from '@/models/todo';

// GET /api/todos/:id
export async function GET(
    req: NextRequest,
    context: { params: { id: string } }
) {
    await connectDB();
    const todo = await Todo.findById(context.params.id);
    return NextResponse.json(todo);
}

// PUT /api/todos/:id
export async function PUT(
    req: NextRequest,
    context: { params: { id: string } }
) {
    await connectDB();
    const data = await req.json();
    const updated = await Todo.findByIdAndUpdate(context.params.id, data, { new: true });
    return NextResponse.json(updated);
}

// DELETE /api/todos/:id
export async function DELETE(
    req: NextRequest,
    context: { params: { id: string } }
) {
    await connectDB();
    await Todo.findByIdAndDelete(context.params.id);
    return NextResponse.json({ success: true });
} */


/* import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Todo from '@/models/todo';
import type { NextApiRequest } from 'next';
import type { NextRequest as AppRouterRequest } from 'next/server'; // pour App Router
// Removed invalid import for RouteHandlerContext

// GET /api/todos/:id
export async function GET(
    req: AppRouterRequest,
    context: { params: { id: string } }
) {
    const id = context.params.id;

    await connectDB();
    const todo = await Todo.findById(id);

    return NextResponse.json(todo);
}

// PUT /api/todos/:id
export async function PUT(
    req: AppRouterRequest,
    context: { params: { id: string } }
) {
    const id = context.params.id;

    await connectDB();
    const data = await req.json();
    const updated = await Todo.findByIdAndUpdate(id, data, { new: true });

    return NextResponse.json(updated);
}

// DELETE /api/todos/:id
export async function DELETE(
    req: AppRouterRequest,
    context: { params: { id: string } }
) {
    const id = context.params.id;

    await connectDB();
    await Todo.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
}
 */

import { connectDB } from '@/lib/db';
import Todo from '@/models/todo';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    const todo = await Todo.findById(id);
    return NextResponse.json(todo);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    const data = await request.json();
    const updated = await Todo.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}


