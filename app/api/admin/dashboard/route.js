import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { authAdmin } from "@/lib/authAdmin";
import prisma from "@/lib/prisma";

//Get dashboard data for admin (total orders, total products, total users, total stores, total revenue)
export async function GET(req) {
  const { userId } = getAuth(req);
  const isAdmin = await authAdmin(userId);
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const orders = await prisma.order.count();
    const products = await prisma.product.count();
    const users = await prisma.user.count();
    const stores = await prisma.store.count();

    const allOrders = await prisma.order.findMany({
      select: {
        total: true,
        createdAt: true,
      },
    });
    const totalRevenue = allOrders.reduce(
      (acc, order) => acc + order.totalAmount,
      0,
    );
    let revenue = totalRevenue.toFixed(2);

    const dashboardData = {
      orders,
      products,
      users,
      stores,
      revenue,
      allOrders,
    };

    return NextResponse.json({ dashboardData });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.message || error.code || "Internal server error" },
      { status: 400 },
    );
  }
}
