"use client"
import { useEffect, useState } from 'react';

import Datatable from "@/components/products/inventory/Datatable";
import { apiUrl } from "@/lib/utils";
import { Product, VariantWithContext } from "@/types/product";
import React from "react";
import { Location } from "@/types/location";
import { Vendor } from "@/types/vendor";
import { SalesChannel } from "@/types/salesChannel";
import { productsToVariantsWithContext } from "@/lib/products/utils";

export const dynamic = "force-dynamic";

export default function InventoryPage() {

  const [variants, setVariants] = useState([]);
  const [locations, setLocations] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [types, setTypes] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await fetch(apiUrl("/api/products"), {
          cache: "no-cache"
        });
        const locationsRes = await fetch(apiUrl("/api/settings/locations"), {
          cache: "no-cache"
        });
        const vendorsRes = await fetch(apiUrl("/api/vendors"), {
          cache: "no-cache"
        });
        const typesRes = await fetch(apiUrl("/api/products/types"), {
          cache: "no-cache"
        });
        const tagsRes = await fetch(apiUrl("/api/products/tags"), {
          cache: "no-cache"
        });

        if (!productsRes.ok) throw new Error("Failed to fetch products");
        if (!locationsRes.ok) throw new Error("Failed to fetch locations");
        if (!vendorsRes.ok) throw new Error("Failed to fetch vendors");
        if (!typesRes.ok) throw new Error("Failed to fetch types");
        if (!tagsRes.ok) throw new Error("Failed to fetch tags");

        const [
          productsData,
          locationsData,
          vendorsData,
          typesData,
          tagsData
        ] = await Promise.all([
          productsRes.json(),
          locationsRes.json(),
          vendorsRes.json(),
          typesRes.json(),
          tagsRes.json()
        ]);

        setVariants(productsToVariantsWithContext(productsData));
        setLocations(locationsData);
        setVendors(vendorsData);
        setTypes(typesData);
        setTags(tagsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if necessary
      }
    };

    fetchData();
  }, []);

  
  //TODO:
  const salesChannels = [
    {
      _id: "1",
      name: "Online Store",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      _id: "2",
      name: "POS",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  ];


  return (
    <div className="bg-gray-100 min-h-screen md:px-8 py-8">
      <div className="bg-gray-100 min-h-screen md:px-8 py-8">
        <Datatable
          initialVariants={variants}
          allLocations={locations}
          vendors={vendors}
          productTags={tags}
          productTypes={types}
          salesChannels={salesChannels}
        />
      </div>
    </div>
  );
}
