import { URLS } from "@/constants/urls";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(URLS.NFT_DATA);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch holders data: ${response.statusText}`);
    }

    return NextResponse.json({
      name: data.name,
    });
  } catch (error:unknown) {
    return NextResponse.json({
      error: error,
      status: 500,
    });
  }
}
