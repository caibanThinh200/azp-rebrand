"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-12 border-t pt-8">
      <Tabs
        defaultValue="description"
        onValueChange={setActiveTab}
        className="w-full bg-white p-10 rounded-20"
      >
        <TabsList className="border-b w-fit rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="description"
            className={`w-auto rounded-none px-4 py-2 font-semibold text-base data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none ${activeTab === "description" ? "border-b-2 border-black" : "border-b-0"}`}
          >
            Mô tả
          </TabsTrigger>
          <TabsTrigger
            value="properties"
            className={`rounded-none px-4 py-2 font-semibold text-base data-[state=active]:border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none ${activeTab === "properties" ? "border-b-2 border-black" : "border-b-0"}`}
          >
            Thông số
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="pt-6">
          <h2 className="text-2xl font-bold mb-4">
            Executive Office Chair Deluxe
          </h2>

          <p className="text-gray-700 mb-6">
            Experience unparalleled comfort and support with our Executive
            Office Chair Deluxe. This premium chair is designed for
            professionals who demand the best in ergonomic seating. The chair
            features advanced lumbar support, fully adjustable armrests, and a
            breathable mesh backrest that keeps you cool during long work
            sessions.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2 pl-8">
              <li className="list-disc text-gray-700">
                Premium memory foam seat cushion
              </li>
              <li className="list-disc text-gray-700">
                Multi-directional lumbar support system
              </li>
              <li className="list-disc text-gray-700">
                360-degree swivel base with smooth-rolling casters
              </li>
              <li className="list-disc text-gray-700">
                Height-adjustable pneumatic lift
              </li>
              <li className="list-disc text-gray-700">
                Tilt tension control with multiple locking positions
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Materials</h3>
            <p className="text-gray-700 mb-2">
              Constructed with high-grade materials including:
            </p>
            <ul className="space-y-2 pl-8">
              <li className="list-disc text-gray-700">
                Premium bonded leather upholstery
              </li>
              <li className="list-disc text-gray-700">
                Aircraft-grade aluminum base
              </li>
              <li className="list-disc text-gray-700">
                High-density foam padding
              </li>
              <li className="list-disc text-gray-700">
                Reinforced mesh backing
              </li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="properties" className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="border p-4 rounded-md">
                <h3 className="font-semibold mb-2">Dimensions</h3>
                <ul className="space-y-1">
                  <li className="text-sm text-gray-700">
                    Height: 45-49 (adjustable)
                  </li>
                  <li className="text-sm text-gray-700">Width: 26</li>
                  <li className="text-sm text-gray-700">Depth: 28</li>
                  <li className="text-sm text-gray-700">
                    Seat Height: 18-22 (adjustable)
                  </li>
                </ul>
              </div>

              <div className="border p-4 rounded-md">
                <h3 className="font-semibold mb-2">Weight Capacity</h3>
                <p className="text-sm text-gray-700">Supports up to 300 lbs</p>
              </div>

              <div className="border p-4 rounded-md">
                <h3 className="font-semibold mb-2">Warranty</h3>
                <p className="text-sm text-gray-700">
                  5-year manufacturer warranty
                </p>
              </div>

              <div className="border p-4 rounded-md">
                <h3 className="font-semibold mb-2">Assembly</h3>
                <p className="text-sm text-gray-700">
                  Minimal assembly required, tools included
                </p>
              </div>
            </div>

            <div className="border p-4 rounded-md">
              <h3 className="font-semibold mb-2">Care Instructions</h3>
              <ul className="space-y-1">
                <li className="text-sm text-gray-700">
                  Clean leather surfaces with a damp cloth and mild soap
                </li>
                <li className="text-sm text-gray-700">
                  Vacuum mesh areas to remove dust and debris
                </li>
                <li className="text-sm text-gray-700">
                  Tighten screws periodically to maintain stability
                </li>
                <li className="text-sm text-gray-700">
                  Avoid exposure to direct sunlight for prolonged periods
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
