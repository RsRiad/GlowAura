import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { authSeller } from "@/lib/authSeller";
import prisma from "@/lib/prisma";

//Get Dashboard data for seller(total order, total earning, total products)

export async function GET(req){
    try{
        const {userId} = getAuth(req);
        const storeId = await authSeller(userId);
        //get all orders of the seller
        const orders = await prisma.order.findMany({
            where:{
                storeId: storeId
            }
        })
        //get all products of the seller
        const products = await prisma.product.findMany({
            where:{
                storeId: storeId
            }
        })
        //get all ratings of the seller
        const rating = await prisma.rating.findMany({
            where:{
                productId: {
                    in: products.map((product) => product.id)
                },
                include:{
                    product: true,
                    user: true
                }
            }
        })

        const dashboardData = {
            totalOrder: orders.length,
            totalEarning: orders.reduce((acc, order) => acc + order.totalAmount, 0),
            totalProducts: products.length,
            rating: rating
        }
        return NextResponse.json({success: true, dashboardData: dashboardData}, {status:200})
    
    }
    catch(error){
        console.log(error);
        return NextResponse.json({error: error.message || error.code || "Internal server error"}, {status:400})
    }
}