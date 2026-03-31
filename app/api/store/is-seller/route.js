import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { authSeller } from "@/lib/authSeller"; 
import prisma from "@/lib/prisma";


//auth seller

export async function GET(req){
    try{
        const {userId} = getAuth(req);
        const isSeller = await authSeller(userId);
        if(!isSeller){
            return NextResponse.json({error: "unauthorized"}, {status:401})
        }
        const storeInfo = await prisma.store.findUnique({
            where:{
                userId: userId
            }
        })
        return NextResponse.json({success: true, isSeller: isSeller, storeInfo: storeInfo}, {status:200})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error: error.message || error.code || "Internal server error"}, {status:400})
    }
}