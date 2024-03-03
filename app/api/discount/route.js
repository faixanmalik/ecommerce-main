// API endpoint code
import getDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "../utils";
import { parse } from 'url';
const { ObjectId } = require('mongodb');

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

        const parsedUrl = parse(request.url, true);
        const { query } = parsedUrl;
        const id = Object.keys(query)[0];

        if(id){
            const db = await getDb()
            const discount = await db.collection("discounts").findOne({ _id: new ObjectId(id) });
            return NextResponse.json(discount, { status: 201 })
        }
        else{
            const db = await getDb()
            const discounts = await db.collection("discounts").find().toArray();
            return NextResponse.json(discounts, { status: 201 })
        }


    }
    catch (error) {
        return errorResponse(error);
    }
}