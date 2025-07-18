import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let params: { [x: string]: string | number } = {};
  for (const [key, value] of searchParams.entries()) {
    if (!isNaN(value as any)) {
      params[key] = parseInt(value);
    } else {
      params[key] = value;
    }
  }

  let { pageSize, pageNumber, category, search, min, max, ...rest } = params;

  const filterConditions = Object.keys(rest)
    .map(
      (key) =>
        `count(properties[propertyId == "${key}" && values == "${params[key]}"]) > 0`
    )
    .join(" && ");

  const searchQuery = search ? `&& title match "${search}**"` : "";
  const maxPriceQuery = max ? `&& discountPrice <= ${max}` : "";
  const minPriceQuery = min ? `&& discountPrice >= ${min}` : "";

  const getPaginatedProducts = defineQuery(`
  {
    "total": count(*[_type == "product" && (
      $category in category[]._ref || 
      count(category[_ref in *[_type == "category" && parent._ref == *[_type == "category" && _id == $category][0]._id]._id]) > 0
    )${filterConditions?.length ? `&&${filterConditions}` : ""} ${searchQuery} ${maxPriceQuery} ${minPriceQuery}] | order(_createdAt desc)),
    "items": *[_type == "product" && (
      $category in category[]._ref || 
      count(category[_ref in *[_type == "category" && parent._ref == *[_type == "category" && _id == $category][0]._id]._id]) > 0
    )${filterConditions?.length ? `&&${filterConditions}` : ""} ${searchQuery} ${maxPriceQuery} ${minPriceQuery}] | order(_createdAt desc) [($pageSize * ($pageNumber - 1))...($pageSize * $pageNumber)],
    "pageSize": $pageSize,
    "currentPage": $pageNumber,
    "totalPages": count(*[_type == "product" && (
      $category in category[]._ref || 
      count(category[_ref in *[_type == "category" && parent._ref == *[_type == "category" && _id == $category][0]._id]._id]) > 0
    )${filterConditions?.length ? `&&${filterConditions}` : ""} ${searchQuery} ${maxPriceQuery} ${minPriceQuery}] | order(_createdAt desc)) / $pageSize
  }
`);
  const { data } = await sanityFetch({
    query: getPaginatedProducts,
    params,
  });

  return NextResponse.json({ ...data });
}
