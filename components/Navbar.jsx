"use client";
import { Search, ShoppingCart, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import HydrationGuard from "./HydrationGuard";
import { useUser, useClerk, UserButton, Show } from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const cartCount = useSelector((state) => state.cart.total);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
  };

  return (
    <HydrationGuard>
      <nav className="sticky top-6 z-50 w-[calc(100%-3rem)] max-w-7xl mx-auto glassmorphism rounded-full border border-rose-100/50 shadow-xl shadow-rose-900/5">
        <div className="px-8 flex items-center justify-between py-4 transition-all">
          <Link
            href="/"
            className="relative text-3xl font-black text-slate-800 italic tracking-tighter group hover:scale-105 transition-all duration-500"
          >
            <span className="text-rose-600 group-hover:text-rose-500 transition-colors">
              Glow
            </span>
            Aura<span className="text-rose-600 text-4xl leading-0">.</span>
            <span className="absolute -top-3 -right-12 bg-amber-400 text-white text-[9px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-[0.2em] scale-75 animate-float shadow-sm shadow-amber-100">
              premium
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-10 text-slate-500 font-black uppercase tracking-[0.2em] text-[11px]">
            <Link
              href="/"
              prefetch={false}
              className="hover:text-rose-600 transition-all relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-500 group-hover:w-full"></span>
            </Link>
            <Link
              href="/shop"
              prefetch={false}
              className="hover:text-rose-600 transition-all relative group"
            >
              Collection
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-500 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              prefetch={false}
              className="hover:text-rose-600 transition-all relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-500 group-hover:w-full"></span>
            </Link>
            <Link
              href="/contact"
              prefetch={false}
              className="hover:text-rose-600 transition-all relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-500 group-hover:w-full"></span>
            </Link>

            <form
              onSubmit={handleSearch}
              className="hidden xl:flex items-center w-72 text-sm gap-3 bg-rose-50/50 px-5 py-3 rounded-full border border-rose-100/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-rose-100 transition-all"
            >
              <Search size={18} className="text-rose-300" />
              <input
                className="w-full bg-transparent outline-none placeholder-rose-200 text-slate-700 font-medium normal-case tracking-normal"
                type="text"
                placeholder="Search Silk & Grace..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </form>

            <Link
              href="/cart"
              className="relative flex items-center gap-2.5 text-slate-700 hover:text-rose-600 transition-all group"
            >
              <ShoppingCart
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
              <span className="hidden lg:inline italic lowercase tracking-tight font-medium text-xs">
                cart
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 text-[10px] font-black text-white bg-rose-600 size-5 flex items-center justify-center rounded-full ring-2 ring-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            <Show when="signed-out">
              <button
                onClick={openSignIn}
                className="premium-button py-3 px-10 text-[10px] tracking-[0.2em] font-black uppercase"
              >
                Sign In
              </button>
            </Show>
            <Show when="signed-in">
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    labelIcon={<Package size={16} />}
                    label="My Orders"
                    onClick={() => router.push("/orders")}
                  />
                  <UserButton.Action
                    labelIcon={<ShoppingCart size={16} />}
                    label="Cart"
                    onClick={() => router.push("/cart")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            </Show>
          </div>

          {/* Mobile Menu */}
          <div className="sm:hidden flex items-center gap-4">
            <Link
              href="/cart"
              className="relative text-slate-700 hover:text-rose-600 transition-colors"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 text-[10px] font-black text-white bg-rose-600 size-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <Show when="signed-out">
              <button onClick={openSignIn} className="premium-button py-2 px-6 text-[10px] tracking-widest font-black uppercase">
                Login
              </button>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </div>
      </nav>
    </HydrationGuard>
  );
};

export default Navbar;
