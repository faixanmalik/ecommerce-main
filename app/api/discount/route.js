// API endpoint code
import getDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "../utils";

// TODO: implement actual vendor route
export async function POST(request) {
    try {
        const data = await request.json(); // Parse JSON from request body
        const db = await getDb()

        const insertResult = await db.collection("discounts").insertOne(data)
        return NextResponse.json(insertResult, { status: 201 })

    }
    catch (error) {
        return errorResponse(error);
    }
}


export async function GET(request) {
    try {

        const db = await getDb()
        const discounts = await db.collection("discounts").find().toArray();

        // const insertResult = await db.collection("discounts").insertOne(data)
        return NextResponse.json(discounts, { status: 201 })

    }
    catch (error) {
        return errorResponse(error);
    }
}