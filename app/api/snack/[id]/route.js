import Snack from "@/models/Snack";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = params; // Extract the ID from the URL params

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const snack = await Snack.findByIdAndDelete(id);

    if (!snack) {
      return NextResponse.json({ error: "Snack not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Deleted successfully", snack },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete snack", details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params; // Extract the ID from the URL params
  const body = await req.json(); // Parse the request body

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    console.log("req.body", body);

    // Update the snack using the ID
    const snack = await Snack.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    // Check if the snack exists
    if (!snack) {
      return NextResponse.json({ error: "Snack not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Updated successfully", snack },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating snack:", error); // Log the error

    return NextResponse.json(
      { error: "Failed to update snack", details: error.message },
      { status: 500 }
    );
  }
}
