import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import imageKit from "@/configs/imageKit";



// add a new product
export async function POST(req){
    try{
        const {userId} = getAuth(req);
        const storeId = await authSeller(userId);
        if(!storeId){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        // get the data from the form
        const formData = await req.formData();
        const name = formData.get("name");
        const description = formData.get("description");
        const mrp = Number(formData.get("mrp"));
        const price = Number(formData.get("price"));
        const images = formData.get("images");
        const category = formData.get("category");
        
        if(!name || !description || !mrp || !price || images.length<1 || !category){
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        // upload images to imagekit 
        const imageUrl = await Promise.all(
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
                        {quality: "auto"},
                        {width: '1024'},
                        {format: "webp"}
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
                images: imageUrl,
                category,
                storeId
            }
        });

        return NextResponse.json({ message: "Product added successfully" });
    }
    catch(error){
        console.log(error);
        return NextResponse.json({ error: error.message || error.code || "Internal server error" }, { status: 400 });
    }
}

// get all products of a seller
export async function GET(req){
    try{
        const {userId} = getAuth(req);
        const storeId = await authSeller(userId);
        if(!storeId){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const products = await prisma.product.findMany({
            where: {
                storeId
            }
        });
        return NextResponse.json({ products });
    }
    catch(error){
        console.log(error);
        return NextResponse.json({ error: error.message || error.code || "Internal server error" }, { status: 400 });
    }
}