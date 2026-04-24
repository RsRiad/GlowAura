import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import imageKit from "@/configs/imageKit";
import { authSeller } from "@/lib/authSeller";

// add a new product
export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        const storeId = await authSeller(userId);
        
        if (!storeId) {
            return NextResponse.json({ error: "Unauthorized: You must be an approved seller" }, { status: 401 });
        }

        // get the data from the form
        const formData = await req.formData();
        const name = formData.get("name");
        const description = formData.get("description");
        const mrp = Number(formData.get("mrp"));
        const price = Number(formData.get("price"));
        const category = formData.get("category");
        
        // Use getAll to retrieve all images sent with the same key
        const images = formData.getAll("images");
        
        if (!name || !description || !mrp || !price || images.length < 1 || !category) {
            return NextResponse.json({ error: "All fields are required and at least one image is needed" }, { status: 400 });
        }

        // upload images to imagekit 
        const imageUrls = await Promise.all(
            images.map(async (image) => {
                const buffer = Buffer.from(await image.arrayBuffer());
                const response = await imageKit.upload({
                    file: buffer,
                    fileName: image.name,
                    folder: "products"
                });
                
                const url = imageKit.url({
                    path: response.filePath,
                    transformation: [
                        { quality: "auto" },
                        { width: '1024' },
                        { format: "webp" }
                    ]
                });
                return url;
            })
        );

        // create the product
        const product = await prisma.product.create({
            data: {
                name,
                description,
                mrp,
                price,
                images: imageUrls,
                category,
                storeId
            }
        });

        return NextResponse.json({ message: "Product added successfully", product });
    }
    catch (error) {
        console.error("Add Product Error:", error);
        return NextResponse.json({ 
            error: error.message || "Internal server error",
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined 
        }, { status: 500 });
    }
}

// get all products of a seller
export async function GET(req) {
    try {
        const { userId } = getAuth(req);
        const storeId = await authSeller(userId);
        
        if (!storeId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const products = await prisma.product.findMany({
            where: {
                storeId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        
        return NextResponse.json({ products });
    }
    catch (error) {
        console.error("Get Products Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}