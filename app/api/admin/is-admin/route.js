import { getAuth } from "@clerk/nextjs/server";
import { authAdmin } from "@/middlewares/authAdmin";
import { NextResponse } from "next/server";


export async function GET(req){
    try{
        const {userId} = getAuth(req);
        if(!userId){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const isAdmin = await authAdmin(userId);
        if(!isAdmin){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json({ isAdmin });
    }
    catch(error){
        console.log(error);
        return NextResponse.json({ error: error.message || error.code || "Internal server error" }, { status: 400 });
    }
}