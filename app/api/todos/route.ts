import { connectDB } from '@/lib/db';
import Todo from '@/models/todo';
import { NextResponse } from 'next/server';

export async function GET() {
    await connectDB();
    const todos = await Todo.find().sort({ createdAt: -1 });
    return NextResponse.json(todos);
}

export async function POST(request: Request) {
    await connectDB();
    const body = await request.json();
    try {
        const todo = await Todo.create(body);
        return NextResponse.json(todo, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 400 });
    }
}
