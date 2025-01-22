import Image from "next/image";
import React, { useState } from "react";
import SearcBarLogo from "@/static/search-logo.svg";
import SearcBarLogoActive from "@/static/search-logo-active.svg";
import { useNFTData } from "@/app/context/NFTDataContext";

export default function SearchBar() {
  const { nftData, setNFTData, value, setValue, setIsLoading } = useNFTData();
  const [isActive, setIsActive] = useState<boolean>(false);
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
    setIsLoading(true);
    if (!nftData || nftData.length === 0) {
      setIsLoading(false);
      return;
    }

    const filteredData = nftData.filter(
      (entry) => entry.walletAddress.toString() === searchValue
    );

    setNFTData(filteredData);
    setIsLoading(false);
  };

  const fetchOriginalNFTData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/getHoldersList");
      const data = await response.json();
      setNFTData(data.holders || []);
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-row border py-2 px-4 border-none rounded-lg bg-[#ffffff1a] hover:bg-[#fff3]"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="bg-transparent focus:outline-0 text-white"
        placeholder="Search Holder Address"
      />
      {!isActive && <Image src={SearcBarLogo} alt="search-logo" />}
      {isActive && <Image src={SearcBarLogoActive} alt="search-logo" />}
    </div>
  );
}
