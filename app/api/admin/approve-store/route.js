import { NextResponse } from "next/server";
import { authAdmin } from "@/lib/authAdmin";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req){
    try{
        const {userId} = getAuth(req);
        const {storeId, status} = await req.json();
        if(!storeId){
            return NextResponse.json({error: "missing details: store ID"}, {status:400})
        }
        const isAdmin = await authAdmin(userId);
        if(!isAdmin){
            return NextResponse.json({error: "Unauthorized"}, {status:401})
        }
        if(status === "approved"){
            await prisma.store.update({
                where:{
                    id: storeId
                },
                data:{
                    status: "approved",
                    isActive: true
                }
            })
        }
        else{
            await prisma.store.update({
                where:{
                    id: storeId
                },
                data:{
                    status: "rejected"
                }
            })
        }

        return NextResponse.json({success: true, message: "Store approved successfully"}, {status:200})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error: error.message || error.code || "Internal server error"}, {status:400})
    }
}

// get all pending and rejected stores
export async function GET(req){
    try{
        const {userId} = getAuth(req);
        const isAdmin = await authAdmin(userId);
        if(!isAdmin){
            return NextResponse.json({error: "Unauthorized"}, {status:401})
        }
        const stores = await prisma.store.findMany({
            where:{
                status: {in: ["pending","rejected"]}
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


