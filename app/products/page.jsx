"use client"
import { React, useEffect, useState } from 'react';

import FilledButton from "@/components/buttons/FilledButton";
import Datatable from "@/components/products/Datatable";
import ExportImportButtons from "@/components/products/ExportImportButtons";
import { apiUrl } from "@/lib/utils";
import { Market } from "@/types/market";
import { SalesChannel } from "@/types/salesChannel";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

export default function ProductsPage() {

  const [products, setProducts] = useState([])
  const [vendors, setVendors] = useState([])
  const [collections, setCollections] = useState([])
  const [productTypes, setProductTypes] = useState([])
  const [tags, setTags] = useState([])
  const [giftCards, setGiftCards] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {

        fetch("/api/products?fields=title,status,variants,createdAt,updatedAt,vendor,category,media")
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          return res.json();
        })
        .then(data => {
          if(data.length > 0){
            setProducts((data));
          }
        })
        .catch(error => {
          console.error("Error fetching collections:", error);
          // Handle error state if necessary
        });

        fetch("/api/vendors")
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          return res.json();
        })
        .then(data => {
          if(data.length > 0){
            setVendors((data));
          }
        })
        .catch(error => {
          console.error("Error fetching collections:", error);
          // Handle error state if necessary
        });

        fetch("/api/products/collections")
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          return res.json();
        })
        .then(data => {
          if(data.length > 0){
            setCollections((data));
          }
        })
        .catch(error => {
          console.error("Error fetching collections:", error);
          // Handle error state if necessary
        });


        fetch("/api/products/types")
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          return res.json();
        })
        .then(data => {
          if(data.length > 0){
            setProductTypes((data));
          }
        })
        .catch(error => {
          console.error("Error fetching collections:", error);
          // Handle error state if necessary
        });


        fetch("/api/products/tags")
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          return res.json();
        })
        .then(data => {
          if(data.length > 0){
            setTags((data));
          }
        })
        .catch(error => {
          console.error("Error fetching collections:", error);
          // Handle error state if necessary
        });


        fetch("/api/products/gift_cards")
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          return res.json();
        })
        .then(data => {
          if(data.length > 0){
            setGiftCards((data));
          }
        })
        .catch(error => {
          console.error("Error fetching collections:", error);
          // Handle error state if necessary
        });

        
       

      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if necessary
      }
      
    };

    fetchData();
  }, []);


  // TODO: fetch these from the API
  const statuses = ["active", "draft"];
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
  const markets = [
    {
      _id: "1",
      name: "US",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      _id: "2",
      name: "CA",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
    {
      _id: "3",
      name: "UK",
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen pt-6 md:pt-8 md:p-8">
      <div className=" mb-8 w-full flex justify-between px-4 md:px-0">
        <h1 className="text-xl font-bold text-[#1a1a1a]">Products</h1>

        <div className=" flex gap-2">
          <ExportImportButtons />
          <FilledButton>
            <Link href="/products/new">Add Product</Link>
          </FilledButton>
        </div>
      </div>

      <Datatable
        initialProducts={products}
        giftCards={giftCards}
        vendors={vendors}
        statuses={statuses}
        tags={tags}
        markets={markets}
        salesChannels={salesChannels}
        collections={collections}
        productTypes={productTypes}
      />
    </div>
  );
}
