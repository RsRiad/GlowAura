import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { stripe } from "../../../lib/stripe";

export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        const { addressId, paymentMethod, items } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!addressId || !items || items.length === 0) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Group items by storeId
        const itemsByStore = items.reduce((acc, item) => {
            if (!acc[item.storeId]) {
                acc[item.storeId] = [];
            }
            acc[item.storeId].push(item);
            return acc;
        }, {});

        const orders = [];
        let fullAmount = 0;

        // Create an order for each store
        for (const storeId in itemsByStore) {
            const storeItems = itemsByStore[storeId];
            const total = storeItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            fullAmount += total;

            const order = await prisma.order.create({
                data: {
                    userId,
                    storeId,
                    addressId,
                    total,
                    paymentMethod,
                    orderItems: {
                        create: storeItems.map(item => ({
                            productId: item.id,
                            quantity: item.quantity,
                            price: item.price
                        }))
                    }
                }
            });
            orders.push(order);
        }

        if (paymentMethod === 'STRIPE') {
            const origin = req.headers.get("origin")
            const checkoutSession = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Order Payment",
                        },
                        unit_amount: Math.round(fullAmount * 100),
                    },
                    quantity: 1,
                }],
                mode: "payment",
                success_url: `${origin}/loading?nextUrl=/orders`,
                cancel_url: `${origin}/cart`,
                metadata: {
                    userId,
                    orderIds: orders.map(o => o.id).join(","),
                    appId: "Glow Aura"
                }
            })
            return NextResponse.json({ success: true, session: checkoutSession });
        }

        // Clear user's cart in DB for non-stripe (COD) payments
        await prisma.user.update({
            where: { id: userId },
            data: { cart: {} }
        });

        return NextResponse.json({ success: true, orders }, { status: 201 });
    } catch (error) {
        console.error("POST order error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const orders = await prisma.order.findMany({
            where: {
                userId: userId
            },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                },
                store: true,
                address: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json({ success: true, orders }, { status: 200 });
    } catch (error) {
        console.error("GET orders error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
