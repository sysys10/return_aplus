// app/api/corememories/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/dnConnect";
import CoreMemory from "@/app/models/CoreMemory";

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const corememories = await CoreMemory.find({});
    return NextResponse.json(corememories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const newCoreMemory = new CoreMemory(body);
    const savedCoreMemory = await newCoreMemory.save();
    return NextResponse.json(savedCoreMemory, { status: 201 });
  } catch (error: any) {
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
    const deletedCoreMemory = await CoreMemory.findByIdAndDelete(id);
    if (!deletedCoreMemory) {
      return NextResponse.json({ error: "Core memory not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Core memory deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}