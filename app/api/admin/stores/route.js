import { NextResponse } from "next/server";
import { authAdmin } from "@/lib/authAdmin";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

// get all approved stores
export async function GET(req){
    try{
        const {userId} = getAuth(req);
        const isAdmin = await authAdmin(userId);
        if(!isAdmin){
            return NextResponse.json({error: "Unauthorized"}, {status:401})
        }
        const stores = await prisma.store.findMany({
            where:{
                status: "approved"
            },
            include:{
                user: true
            }
        })
        return NextResponse.json({stores})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error: error.message || error.code || "Internal server error"}, {status:400})
    }
}


