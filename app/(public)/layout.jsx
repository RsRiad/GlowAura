'use client'
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/lib/features/product/productSlice";
import { useUser,useAuth } from "@clerk/nextjs";
import { fetchCart, uploadCart } from "@/lib/features/cart/cartSlice";
import { fetchAddress } from "@/lib/features/address/addressSlice";

export default function PublicLayout({ children }) {

    const {user} = useUser();
    const {getToken} = useAuth();
    const {cartItems, isCartLoaded} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts({}));
    }, []);
    useEffect(() => {
        if(user){
            dispatch(fetchCart({getToken}));
            dispatch(fetchAddress({getToken}));
        }
    }, [user]);
    
    useEffect(() => {
        if (isCartLoaded && user && cartItems && Object.keys(cartItems).length > 0) {
            dispatch(uploadCart({ getToken, cartItems }));
        }
    }, [cartItems, isCartLoaded, user]);

    return (
        <>
            <Banner />
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
