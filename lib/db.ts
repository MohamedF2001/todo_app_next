import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://MoussF:mohamed2001@cluster0.rde6y.mongodb.net/todoApi?retryWrites=true&w=majority";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        }).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
