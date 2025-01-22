import Image from "next/image";
import React from "react";
import SearcBarLogo from "@/static/search-logo.svg";
import { useNFTData } from "@/app/context/NFTDataContext";

export default function SearchBar() {
  
  const { nftData, setNFTData, value, setValue } = useNFTData();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.trim();
    setValue(searchValue);
    if (searchValue === "") {
      fetchOriginalNFTData();
    } else {
      filterNFTData(searchValue);
    }
  };

  const filterNFTData = (searchValue: string) => {
    if (!nftData || nftData.length === 0) {
      console.warn("NFT data is empty or undefined.");
      return;
    }

    const filteredData = nftData.filter(
      (entry) => entry.walletAddress.toString() === searchValue
    );

    console.log("Filtered Data:", filteredData);
    setNFTData(filteredData);
  };

  const fetchOriginalNFTData = async () => {
    try {
      const response = await fetch("/api/getHoldersList");
      const data = await response.json();
      setNFTData(data.holders || []);
    } catch (error) {
      console.error("Error fetching original NFT data:", error);
    }
  };

  return (
    <div className="flex flex-row border p-2 rounded-md border-zinc-700">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="bg-transparent focus:outline-0 text-white"
        placeholder="Search Holder Address"
      />
      <Image src={SearcBarLogo} alt="search-logo" />
    </div>
  );
}
