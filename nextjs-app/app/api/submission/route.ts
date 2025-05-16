import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const result = await client.create(body).catch((e) => {
    throw new Error("Err", e);
  });
  return new NextResponse("Create success");
};
