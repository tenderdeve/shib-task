/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { URLS } from "@/constants/urls";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const addressHash = searchParams.get("address_hash");
  const itemsCount = searchParams.get("items_count");
  const value = searchParams.get("value");
  const limit = searchParams.get("limit") || "50";

  try {
    let apiUrl = `${URLS.HODLERS_DATA_BASE_URL}?limit=${limit}`;

    if (addressHash) {
      apiUrl += `&address_hash=${addressHash}`;
    }
    if (itemsCount) {
      apiUrl += `&items_count=${itemsCount}`;
    }
    if (value) {
      apiUrl += `&value=${value}`;
    }

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch holders data: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({
      holders: data.items.map((item: any) => ({
        walletAddress: item.address.hash,
        nfts: parseInt(item.value, 10),
      })),
      totalSupply: data.items[0].token.total_supply,
      nextPageParams: data.next_page_params || null,
      hasMore: !!data.next_page_params,
    });
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    return NextResponse.json(
      { error: "Failed to fetch or process holders data" },
      { status: 500 }
    );
  }
}
