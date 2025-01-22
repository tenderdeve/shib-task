export interface NFTData {
  walletAddress: string;
  nfts: number;
}

export interface FetchResponse {
  holders: NFTData[];
  nextPageParams: Record<string, string | null>;
  hasMore: boolean;
  totalSupply: number;
}

export interface CardProps {
  nftData: NFTData;
  totalSupply: number;
}
