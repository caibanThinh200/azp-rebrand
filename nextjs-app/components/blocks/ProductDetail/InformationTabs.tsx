"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GetAllProductsResult } from "@/sanity.types";
import PortableText from "react-portable-text";

interface ProductTabProps {
  content: GetAllProductsResult[number]["content"];
  properties: GetAllProductsResult[number]["properties"];
}

export default function ProductTabs({ content, properties }: ProductTabProps) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-12 border-t pt-8">
      <Tabs
        defaultValue={content ? "description" : "properties"}
        onValueChange={setActiveTab}
        className="w-full bg-white p-10 rounded-20"
      >
        <TabsList className="border-b w-fit rounded-none h-auto p-0 bg-transparent">
          {content && (
            <TabsTrigger
              value="description"
              className={`w-auto rounded-none px-4 py-2 font-semibold text-base data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none ${activeTab === "description" ? "border-b-2 border-black" : "border-b-0"}`}
            >
              Mô tả
            </TabsTrigger>
          )}
          <TabsTrigger
            value="properties"
            className={`rounded-none px-4 py-2 font-semibold text-base data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none ${activeTab === "properties" ? "border-b-2 border-black" : "border-b-0"}`}
          >
            Thông số
          </TabsTrigger>
        </TabsList>

        {content && (
          <TabsContent value="description" className="pt-6">
            <PortableText className="whitespace-pre-line" content={content as object[]} />
          </TabsContent>
        )}

        <TabsContent value="properties" className="pt-6">
          <div className="flex flex-col gap-5">
            {properties?.map((property) => (
              <div key={property?._key} className="flex gap-2 items-center">
                <span className="font-bold">{property?.title}:</span>
                <span>{property?.values}</span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
