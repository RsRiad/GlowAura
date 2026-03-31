// create the store
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import imageKit from "@/configs/imageKit";
export async function POST(req) {
    try{
        const { userId } = getAuth(req);
        const formData = await req.formData();
        const name = formData.get("name");
        const username = formData.get("userName");
        const email = formData.get("email");
        const contact = formData.get("contact");
        const address = formData.get("address");
        const description = formData.get("description");
        const image = formData.get("image");
        // check if user is authenticated
        if(!userId){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        // check if all fields are filled
        if(!name || !username || !email || !contact || !address || !description || !image){
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        // check if store already exists
        const store = await prisma.store.findFirst({
            where: {
                userId
            }
        });

        if(store){
            return NextResponse.json({ status: store.status }, { status: 200 });
        }
        // check username is already taken
        const isUserNameTaken = await prisma.store.findFirst({
            where: {
                username: username.toLowerCase()
            }
        });

        if(isUserNameTaken){
            return NextResponse.json({ error: "Username already taken" }, { status: 400 });
        }

        // upload image to imagekit
        const buffer = Buffer.from(await image.arrayBuffer());
        const response = await imageKit.upload({
            file: buffer,
            fileName: image.name,
            folder: "logos"
        });

        //optimize image
        const optimizedImage = imageKit.url({
            path: response.filePath,
            transformation: [
                {quality: "auto"},
                {width: 512},
                {format: "webp"}
            ]
        }); 
        const newStore = await prisma.store.create({
            data: {
                userId,
                name,
                description,
                username: username.toLowerCase(),
                email,
                contact,
                address,
                logo: optimizedImage
            }
        });
        //link store to user
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                store: {
                    connect: {
                        id: newStore.id
                    }
                }
            }
        });


        // // create the store
        // const store = await prisma.store.create({
        //     data: {
        //         name,
        //         userName,
        //         email,
        //         contact,
        //         address,
        //         description,
        //         image,
        //         userId
        //     }
        // });
        return NextResponse.json({ message: "Waiting for approval" });
    }
    catch(error){
        console.log(error);
        return NextResponse.json({ error: error.message || error.code || "Internal server error" }, { status: 400 });
    }
}
//check if user have already register a store if yes then send the store status

export async function GET(req){
    try{
        const { userId } = getAuth(req);
        if(!userId){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const store = await prisma.store.findFirst({
            where: {
                userId
            }
        });
        if(!store){
            return NextResponse.json({ error: "Store not registered" }, { status: 404 });
        }
        return NextResponse.json({ status: store.status }, { status: 200 });
    }
    catch(error){
        console.log(error);
        return NextResponse.json({ error: error.message || error.code || "Internal server error" }, { status: 400 });
    }
}

