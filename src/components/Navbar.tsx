"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Logo from "@/static/shibarium-logo.png";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [nft, setNft] = useState<string>("");

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/getNftData");
      const data = await response.json();
      setNft(data.name);
    })();
  });
  return (
    <nav
      className={cn(
        "bg-[#222325] shadow-md py-4 px-6 flex justify-between items-center"
      )}
    >
      <Image src={Logo} alt="Shibarium-Logo" width={150} height={120} />
      {nft ? (
        <p className="font-bold text-white">Top 100 NFT holders of {nft}</p>
      ) : (
        <p></p>
      )}
      <div className="hidden md:flex space-x-6">
        <SearchBar />
      </div>
    </nav>
  );
}
