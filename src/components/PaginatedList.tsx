/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import NftCard from "./NftCard";
import { FetchResponse, NFTData } from "@/constants/types";
import { useNFTData } from "../app/context/NFTDataContext";
import LoadingBar from "@/static/loading-bar.svg";
import Image from "next/image";

const fetchNFTData = async (params = {}): Promise<FetchResponse> => {
  const query = new URLSearchParams(params).toString();
  const url = `/api/getHoldersList?${query}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch NFT data");
  }
  return await response.json();
};

const PaginatedList = () => {
  const {
    nftData,
    setNFTData,
    totalSupply,
    setTotalSupply,
    value,
    isLoading,
    setIsLoading,
  } = useNFTData();

  const [localQueue, setLocalQueue] = useState<NFTData[]>([]);

  const [nextPageParams, setNextPageParams] = useState<
    Record<string, string | null>
  >({});
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { ref, inView } = useInView();

  const loadMoreFromQueue = () => {
    setIsLoading(true);
    const remainingSlots = 100 - nftData.length;
    if (remainingSlots <= 0) {
      setHasMore(false);
      setIsLoading(false);
      return;
    }

    const nextBatch = localQueue.slice(0, Math.min(10, remainingSlots));
    setNFTData((prev) => [...prev, ...nextBatch]);
    setLocalQueue((prev) => prev.slice(nextBatch.length));
    setIsLoading(false);
  };

  const fetchAndQueueData = async () => {
    if (nftData.length >= 100) {
      setHasMore(false);
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchNFTData(nextPageParams);
      if (totalSupply != data.totalSupply) setTotalSupply(data.totalSupply);
      setLocalQueue(data.holders);
      setNextPageParams(data.nextPageParams || {});
      setHasMore(data.hasMore && nftData.length + data.holders.length < 100);
      loadMoreFromQueue();
    } catch {
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (inView && !isLoading && !value) {
      if (localQueue.length === 0 && hasMore) {
        fetchAndQueueData();
      } else if (localQueue.length > 0) {
        loadMoreFromQueue();
      }
    }
  }, [inView, localQueue, hasMore, isLoading]);

  useEffect(() => {
    fetchAndQueueData();
  }, []);

  return (
    <div className="w-full h-[90vh] overflow-auto p-10">
      {<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {nftData.map((item, index) => (
            <NftCard nftData={item} key={index} totalSupply={totalSupply} />
          ))}
        </div>}
      {isLoading &&
        <div className="flex justify-center top-[100%]">
          <Image src={LoadingBar} alt={"loading..."} />
        </div>}
      {!isLoading && nftData.length===0 && <p className="text-center text-gray-400 mt-4">
          No such address found!
        </p>}
      <div ref={ref} className="h-10 w-full"></div>
      {!hasMore && !isLoading && (
        <p className="text-center text-gray-400 mt-4">
          {nftData.length === 100
            ? "Limit of 100 holders reached."
            : nftData.length===0 ? "End of the list." : ""}
        </p>
      )}
    </div>
  );
};

export default PaginatedList;
