"use client"
import { React, useEffect, useState } from 'react';

import Card from "@/components/Card";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";
import Link from "next/link";
import Heading from "@/components/Heading";
import LinkMini from "@/components/LinkMini";
import { apiUrl } from "@/lib/utils";
import { Transfer } from "@/types/transfer";
import Datatable from "@/components/products/transfers/Datatable";
import { Supplier } from "@/types/supplier";
import { Location } from "@/types/location";

export const dynamic = "force-dynamic"

export default function TransfersPage() {

  const [locations, setLocations] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [transfers, setTransfers] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch("//api/products/transfers")
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to fetch");
          }
          return res.json();
        })
        .then(data => {
          if(data.length > 0){
            setTransfers((data));
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
  const tags = transfers.flatMap(po => po.tags);

  return (
    <div className="bg-gray-100 min-h-screen h-full md:px-8 py-8">
      <div className=" w-full flex px-4 md:px-0 justify-between">
        <Heading>Transfers</Heading>
      </div>
      <div className="h-8" />

      {
        locations && locations.length > 0 && transfers && transfers.length > 0 ? (
          <Datatable initialTransfers={transfers} locations={locations} suppliers={suppliers} tags={tags} />
        ) : (
          <Card className="flex flex-col items-center justify-center py-16">
            <Image
              src="/orders-home-img.svg"
              width="250"
              height="250"
              alt="No Orders Image"
            />
            <Title>Move inventory between locations</Title>
            <Text className="text-center pb-4 w-96">
              Move and track inventory between your business locations.
            </Text>
            {
              locations && locations.length > 0 ? (
                <LinkMini href="/products/transfers/new" >
                  Add Transfer
                </LinkMini>
              ) : (
                <Text className="">
                  To create a transfer you’ll need more than one location.&nbsp;
                  <Link href="/setting/locations/new" className="text-blue-700 hover:underline">Add Location</Link>
                </Text>
              )
            }
          </Card>
        )
      }
    </div>
  )
}
