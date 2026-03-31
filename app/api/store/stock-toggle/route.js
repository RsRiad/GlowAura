import { NextResponse } from "next/server";
import { authSeller } from "@/lib/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";


export async function POST(req){
    try{
        const {userId} = getAuth(req);
        const {productId} = await req.json();

        if(!productId){
            return NextResponse.json({error: "missing details: product ID"},{status:400})

        }
        const storeId = authSeller(userId);

        if(!storeId){
            return NextResponse.json({error: "unauthorized"},{status:401})
        }

        const product = await prisma.product.findUnique({
            where:{
                id: productId,
                storeId: storeId
            }
        })

        if(!product){
            return NextResponse.json({error: "product not found"}, {status:404})
        }

        await prisma.product.update({
            where:{
                id: productId
            },
            data:{
                isStock: !product.isStock
            }
        })

        return NextResponse.json({success: true, message: "Product Stock updated successfully"}, {status:200})
    }
    catch(error){
        console.log(error);
        return NextResponse.json({ error: error.message || error.code || "Internal server error" }, { status: 400 });
    }


}