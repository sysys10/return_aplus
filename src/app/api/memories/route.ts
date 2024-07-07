import { NextRequest, NextResponse } from "next/server";
import Memory from "@/app/models/Memory";
import dbConnect from "@/app/lib/dnConnect";

export async function GET() {
  await dbConnect();
  try {
    const memories = await Memory.find({});
    return NextResponse.json(memories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
  
    const newMemory = new Memory(body);
    const savedMemory = await newMemory.save();
    return NextResponse.json(savedMemory, { status: 201 });
  } catch (error: any) {
    console.error("POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const deletedMemory = await Memory.findByIdAndDelete(id);
    if (!deletedMemory) {
      return NextResponse.json({ error: "Memory not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Memory deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}