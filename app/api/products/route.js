import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
    try {
        let products = await prisma.product.findMany(
            {
                where: { inStock: true },
                include: {
                    rating: {
                        select: {
                            createdAt: true,
                            rating: true,
                            review: true,
                            user: {
                                select: {
                                    name: true,
                                    image: true
                                }
                            }
                        }
                    },
                    store: true,
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        );
        //remove products if store isActive is false
        products = products.filter(product => product.store.isActive);  
        
        return NextResponse.json({ success: true, products }, { status: 200 });
    } catch (error) {
        console.error("GET products error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}