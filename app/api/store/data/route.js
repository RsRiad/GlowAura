import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { authSeller } from "@/lib/authSeller";
import prisma from "@/lib/prisma";

//get store info and store products
export async function GET(req){
    try{
        const {searchParams} = new URL(req.url)
        const userName = searchParams.get("userName")
        if(!userName){
            return NextResponse.json({error: "missing details: userName"}, {status:400})
        }

        //get store info
        const store = await prisma.store.findUnique({
            where:{
                username: userName,
                isActive: true
            },
            include:{
                Product:{include:{rating:true}}
            }
        })
        if(!store){
            return NextResponse.json({error: "store not found"}, {status:404})
        }
        const products = await prisma.product.findMany({
            where:{
                storeId: store.id
            }
        })
        return NextResponse.json({success: true, store: store, products: products}, {status:200})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error: error.message || error.code || "Internal server error"}, {status:400})
    }
}