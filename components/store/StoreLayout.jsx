"use client";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import SellerNavbar from "./StoreNavbar";
import SellerSidebar from "./StoreSidebar";
import { useUser, useAuth, SignIn } from "@clerk/nextjs";
import axios from "axios";

const StoreLayout = ({ children }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(true);
  const [storeInfo, setStoreInfo] = useState(null);

  const fetchIsSeller = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`/api/store/is-seller`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsSeller(data.isSeller);
      setStoreInfo(data.storeInfo);
    } catch (error) {
      console.log(error);
      setIsSeller(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchIsSeller();
    } 
    // else {
    //   setIsSeller(false);
    //   setLoading(false);
    // }
  }, [user]);

  return loading ? (
    <Loading />
  ) : isSeller ? (
    <div className="flex flex-col h-screen">
      <SellerNavbar />
      <div className="flex flex-1 items-start h-full overflow-y-scroll no-scrollbar">
        <SellerSidebar storeInfo={storeInfo} />
        <div className="flex-1 h-full p-8 lg:px-14 lg:py-12 overflow-y-scroll bg-[#fffcfc]">
          {children}
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-2xl sm:text-4xl font-semibold text-slate-400">
        You are not authorized to access this page
      </h1>
      <Link
        href="/"
        className="bg-slate-700 text-white flex items-center gap-2 mt-8 p-2 px-6 max-sm:text-sm rounded-full"
      >
        Go to home <ArrowRightIcon size={18} />
      </Link>
    </div>
  );

  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded || loading) {
    return <Loading />;
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-6 bg-[#fff1f2] overflow-hidden">
        {/* Background Decor */}
        <div className="aura-glow top-0 -left-20 w-[600px] h-[600px] bg-rose-200"></div>
        <div className="aura-glow -bottom-40 -right-20 w-[500px] h-[500px] bg-amber-100"></div>

        <div className="w-full max-w-md animate-reveal">
          {/* Brand Section */}
          <div className="flex flex-col items-center mb-10 text-center">
            <Link
              href="/"
              className="relative text-5xl font-black text-slate-800 italic tracking-tighter mb-4"
            >
              <span className="text-rose-600">Glow</span>Aura
              <span className="text-rose-600 text-6xl leading-0">.</span>
              <p className="absolute -top-2 -right-16 bg-amber-400 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-[0.2em] shadow-sm">
                Store
              </p>
            </Link>
            <p className="text-slate-400 font-medium italic text-sm max-w-xs">
              Manage your collection and grow your business with executive
              style.
            </p>
          </div>

          {/* Auth Card */}
          <div className="">
            <SignIn routing="hash" />
          </div>

          {/* Footer Nav */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-rose-600 transition-all group"
            >
              <ArrowRightIcon className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // if (isSeller) {
  //     return (
  //         <div className="flex flex-col h-screen">
  //             <SellerNavbar />
  //             <div className="flex flex-1 items-start h-full overflow-y-scroll no-scrollbar">
  //                 <SellerSidebar storeInfo={storeInfo} />
  //                 <div className="flex-1 h-full p-8 lg:px-14 lg:py-12 overflow-y-scroll bg-[#fffcfc]">
  //                     {children}
  //                 </div>
  //             </div>
  //         </div>
  //     )
  // }

  // return (
  //     <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
  //         <h1 className="text-2xl sm:text-4xl font-semibold text-slate-400">You are not authorized to access this page</h1>
  //         <Link href="/" className="bg-slate-700 text-white flex items-center gap-2 mt-8 p-2 px-6 max-sm:text-sm rounded-full">
  //             Go to home <ArrowRightIcon size={18} />
  //         </Link>
  //     </div>
  // )
};

export default StoreLayout;
