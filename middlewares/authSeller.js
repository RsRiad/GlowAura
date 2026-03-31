

const authSeller = async (userId) => {
    try{
        const user =await prisma.user.findUnique({
            where: {
                id: userId,
                include: {
                    store: true
                }
            }
        });

       if(user.store){
        if(user.store.status === "approved"){
            return user.store.id;
        }
        else return false;
       }


        if(!user){
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ status: user.status }, { status: 200 });
    }
    catch{

    }
} 