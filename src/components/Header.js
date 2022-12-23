import React from "react";
import Image from "next/image";
import { MenuIcon, SearchIcon, ShoppingCartIcon } from "@heroicons/react/solid";
import { logo } from "../assets";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);

  return (
    <header>
      {/* top nav */}
      <div className="flex flex-grow items-center bg-amazon_blue p-1 py-2">
        <div className="mt-2 flex flex-grow items-center  sm:flex-grow-0">
          <Image
            onClick={() => router.push("/")}
            src={logo}
            width={150}
            height={40}
            className="h-[40px] w-[150px] cursor-pointer object-contain"
            alt="logo"
          />
        </div>

        {/* SearchBar */}
        <div className="hidden h-10 flex-grow cursor-pointer items-center rounded-md bg-yellow-400 hover:bg-yellow-500 sm:flex">
          <input
            className="h-full w-6 flex-shrink flex-grow rounded-l-md p-2 px-4 focus:outline-none"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/* Right  section */}
        <div className="mx-6 flex items-center space-x-6 whitespace-nowrap text-xs text-white">
          <div onClick={!session ? signIn : signOut} className="link">
            {session ? `Hello, ${session.user.name}` : "Sign In"}
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>

          <div onClick={() => router.push("/Orders")} className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div
            onClick={() => router.push("/checkout")}
            className="link relative flex items-center"
          >
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-yellow-400 text-center text-black md:right-10">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="mt-2 hidden font-extrabold md:inline md:text-sm">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* bottom nav */}
      <div className="flex items-center space-x-3 bg-amazon_blue-light p-2 pl-6 text-sm text-white">
        <p className="link flex items-center">
          <MenuIcon className="mr-1 h-6" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shooper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
