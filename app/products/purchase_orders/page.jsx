"use client"
import { React, useEffect, useState } from 'react';

import Card from "@/components/Card";
import Heading from "@/components/Heading";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Datatable from "@/components/products/purchase_orders/Datatable";
import { PurchaseOrder } from "@/types/purchaseOrder";
import Link from "next/link";
import FilledButton from "@/components/buttons/FilledButton";
import { apiUrl } from "@/lib/utils";
import { Location } from "@/types/location";
import { Supplier } from "@/types/supplier";

export const dynamic = "force-dynamic";

export default function PurchaseOrdersPage() {

  const [purchaseOrders, setPurchaseOrders] = useState([])
  const [locations, setLocations] = useState([])
  const [suppliers, setSuppliers] = useState([])

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch("/api/products/purchase_orders")
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          return res.json();
        })
        .then(data => {
          if(data.length > 0){
            setPurchaseOrders((data));
          }
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
          if(data.length > 0){
            setLocations((data));
          }
        })
        .catch(error => {
          console.error("Error fetching collections:", error);
          // Handle error state if necessary
        });

        fetch("/api/suppliers")
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          return res.json();
        })
        .then(data => {
          if(data.length > 0){
            setSuppliers((data));
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


  //TODO:
  const tags = purchaseOrders.flatMap(po => po.tags);

  return (
    <div className="bg-gray-100 md:px-8 min-h-screen py-8">
      <div className=" flex px-4 md:px-0 items-center justify-between">
        <Heading className="!pb-0">Purchase Orders</Heading>

        <FilledButton>
          <Link href="/products/purchase_orders/new">
            Create<span className="hidden sm:inline"> Purchase Order</span>
          </Link>
        </FilledButton>
      </div>
      <div className="h-8" />

      {purchaseOrders && purchaseOrders.length > 0 ? (
        <Datatable initialPurchaseOrders={purchaseOrders} tags={tags} locations={locations} suppliers={suppliers} />
      ) : (
        <Card className="flex flex-col items-center justify-center py-16">
          <Image
            src="/orders-home-img.svg"
            width="250"
            height="250"
            alt="No Orders Image"
          />
          <Title>Manage your purchase orders</Title>
          <Text className="text-center pb-4 w-96">
            Track and receive inventory ordered from suppliers.
          </Text>

          <FilledButton>
            <Link href="/products/purchase_orders/new">
              Create Purchase Order
            </Link>
          </FilledButton>
        </Card>
      )}
    </div>
  );
}
