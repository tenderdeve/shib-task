"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type NFTData = {
  walletAddress: string;
  nfts: number;
};

type NFTDataContextType = {
  nftData: NFTData[];
  setNFTData: React.Dispatch<React.SetStateAction<NFTData[]>>;
  totalSupply: number;
  setTotalSupply: React.Dispatch<React.SetStateAction<number>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const NFTDataContext = createContext<NFTDataContextType | undefined>(undefined);

export const NFTDataProvider = ({ children }: { children: ReactNode }) => {
  const [nftData, setNFTData] = useState<NFTData[]>([]);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <NFTDataContext.Provider
      value={{
        nftData,
        setNFTData,
        totalSupply,
        setTotalSupply,
        value,
        setValue,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </NFTDataContext.Provider>
  );
};

export const useNFTData = () => {
  const context = useContext(NFTDataContext);
  if (!context) {
    throw new Error("useNFTData must be used within an NFTDataProvider");
  }
  return context;
};
