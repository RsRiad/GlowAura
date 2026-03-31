import { NextResponse } from "next/server";
import { authAdmin } from "@/lib/authAdmin";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

//toggle store is active
export async function POST(req){
    try{
        const {userId} = getAuth(req);
        const isAdmin = await authAdmin(userId);
        if(!isAdmin){
            return NextResponse.json({error: "Unauthorized"}, {status:401})
        }
        const {storeId} = await req.json();
        if(!storeId){
            return NextResponse.json({error: "missing details: store ID"}, {status:400})
        }
        //find the store
        const store = await prisma.store.findUnique({
            where:{
                id: storeId
            }
        })
        if(!store){
            return NextResponse.json({error: "Store not found"}, {status:404})
        }
        //toggle the store
        await prisma.store.update({
            where:{
                id: storeId
            },
            data:{
                isActive: !store.isActive
            }
        })
        return NextResponse.json({success: true, message: "Store updated successfully"})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error: error.message || error.code || "Internal server error"}, {status:400})
    }
}


