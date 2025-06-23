import { connectDB } from '@/lib/db';
import Todo from '@/models/todo';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
    await connectDB();
    const todo = await Todo.findById(params.id);
    return NextResponse.json(todo);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    await connectDB();
    const data = await request.json();
    const updated = await Todo.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    await connectDB();
    await Todo.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
}
