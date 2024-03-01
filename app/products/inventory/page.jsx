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

        fetch("/api/products")
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          return res.json();
        })
        .then(data => {
          setVariants(productsToVariantsWithContext(data));
        })
        .catch(error => {
          console.error("Error fetching collections:", error);
          // Handle error state if necessary
        });

        fetch("/api/settings/locations")
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          return res.json();
        })
        .then(data => {
          setLocations(data);
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
          setVendors(data);
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
          setTags(data);
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
          setTypes(data);
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
