"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CopySvg from "@/static/copy-to-clipboard-logo.svg";
import WalletSvg from "@/static/wallet-logo.svg";
import Image from "next/image";
import { parseAddress } from "@/utils/parseAddress";
import { quantityPercentage } from "@/utils/quantityPercentage";
import { useState } from "react";
import { CardProps } from "@/constants/types";
// import { useNFTData } from "@/app/context/NFTDataContext";

const NftCard = ({ nftData, totalSupply }: CardProps) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showText, setShowText] = useState<boolean>(false);
  const [showAddress, setShowAddress] = useState<boolean>(false);
  // const { nftData, setNFTData, value, setValue } = useNFTData();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(nftData.walletAddress);
      setCopySuccess(true);

      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setCopySuccess(false);
    }
  };

  return (
    <div className="overflow-hidden">
      <Card className="w-54 bg-[#1a202d] shadow-md border-none">
        <CardHeader className="flex flex-row items-center relative md:justify-between">
          <div className="flex flex-row items-center mt-1.5 gap-1">
            <Image src={WalletSvg} alt={"wallet"} style={{ width: "20px" }} />
            <CardTitle
              className="text-xl text-white text-center cursor-default"
              onMouseEnter={() => setShowAddress(true)}
              onMouseLeave={() => setShowAddress(false)}
            >
              {parseAddress(nftData.walletAddress)}
            </CardTitle>
          </div>
          <div
            id="tooltip-copy-npm-install-copy-button"
            role="tooltip"
            className={`absolute z-10 inline-block px-3 py-2 text-xs font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm top-14  ${
              showAddress ? "opacity-100" : "opacity-0 invisible"
            } transform translate-x-4 tooltip dark:bg-gray-700`}
          >
            <span className="block w-32 break-words">
              {nftData.walletAddress}
            </span>
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>

          <Image
            src={CopySvg}
            alt={"copy"}
            className="cursor-pointer"
            onClick={copyToClipboard}
            onMouseEnter={() => setShowText(true)}
            onMouseLeave={() => setShowText(false)}
          />
          <div
            id="tooltip-copy-npm-install-copy-button"
            role="tooltip"
            className={`absolute z-10 inline-block px-3 py-2 text-sm font-medium right-4 text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm top-14 ${
              copySuccess || showText ? "opacity-100" : "opacity-0 invisible"
            } transform translate-x-4 tooltip dark:bg-gray-700`}
          >
            <span>{copySuccess ? "Copied!" : "Copy to clipboard"}</span>
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-between">
            <p className="text-white">Quantity:</p>
            <p className="text-[#63b3ed]">
              {nftData.nfts}/{totalSupply}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-green-500 h-2.5 transition-all duration-300 ease-in-out"
              style={{
                width: `${
                  (quantityPercentage(nftData.nfts, totalSupply) / 10) * 100
                }%`,
              }}
            ></div>
          </div>
          <p className="ml-1 text-green-500 text-sm">
            {quantityPercentage(nftData.nfts, totalSupply).toFixed(2)}%
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NftCard;
