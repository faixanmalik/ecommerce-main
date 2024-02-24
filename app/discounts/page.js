// pages/discounts.tsx
"use client"

import React from "react";
import Link from "next/link";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import Image from "next/image";
import Title from "@/components/Title";
import Text from "@/components/Text";
import FilledButton from "@/components/buttons/FilledButton";
import OutlinedButton from "@/components/buttons/OutlinedButton";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { IoCloseSharp } from "react-icons/io5";
import { CiShoppingTag } from "react-icons/ci";
import { TbShoppingBagDiscount } from "react-icons/tb";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoIosArrowForward } from "react-icons/io";

const DiscountsPage = () => {

  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState(null);
  const handleOpen = (value) => setSize(value);


  let discountData = [
    {
      name:'Amount off products',
      desc:'Discount specefic products or collections of products.',
      label:'Product discount',
      link:'/discounts/new?type=moneyOffProduct',
      icon: CiShoppingTag 
    },
    {
      name:'Buy X get Y',
      desc:'Discount products based on a customer&apos;s purchase.',
      label:'Product discount',
      link:'/discounts/new?type=buyXgetY',
      icon: CiShoppingTag 
    },
    {
      name:'Amount off order',
      desc:'Discount the total order amount.',
      label:'Order discount',
      link:'/discounts/new?type=moneyOffOrder',
      icon: TbShoppingBagDiscount 
    },
    {
      name:'Free Shipping',
      desc:'Offer free shipping on an order',
      label:'Shipping discount',
      link:'/discounts/new?type=shipping',
      icon: LiaShippingFastSolid  
    },
  ]

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <Heading>Discounts</Heading>
        <div className="flex justify-center items-center gap-5 mb-5">
          <OutlinedButton>Export</OutlinedButton>
          <FilledButton>Create Discount</FilledButton>
        </div>
      </div>
      <Card className="flex flex-col items-center justify-center py-16">
        <Image
          src="/discount-img.svg"
          width="250"
          height="250"
          alt="Discounts Image"
        />
        <Title>Manage discounts and promotions</Title>
        <Text className="text-center pb-4 w-96">
          Create discount codes and automatic discounts that apply at checkout.
          You can also use discounts with compare at prices.
        </Text>
        <FilledButton onClick={() => handleOpen("sm")}>Create Discount</FilledButton>
      </Card>
      <Dialog
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl" ||
          size === "xxl"
        }
        size={size || "md"}
        handler={handleOpen}
      >
        <DialogHeader className="bg-gray-100 flex justify-between">
          <div className="text-sm">
            Select discount type
          </div>
          <div>
            <IoCloseSharp onClick={() => handleOpen(null)} className='text-lg cursor-pointer'/>
          </div>
        </DialogHeader>
        <DialogBody className="py-0">
          {discountData.map((item, index) => (
            <Link href={item.link} key={index} className="flex justify-between items-center border-b-2 my-4 text-sm text-gray-700">
              <div className="">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="py-1">{item.desc}</p>
              </div>
              <div className="flex">
                <div className="flex space-x-1 bg-gray-300 rounded-lg px-3 text-gray-800">
                  <item.icon className='text-lg'/>
                  <p>{item.label}</p>
                </div>
                <div>
                  <IoIosArrowForward className='text-lg ml-2 text-gray-600'/>
                </div>
              </div>
            </Link>
          ))}
        </DialogBody>
        <DialogFooter className="pt-0 pb-3">
          <Button
            variant="text"
            color="gray"
            onClick={() => handleOpen(null)}
            className="mr-1 border lowercase shadow-md border-gray-800 py-1 px-2"
          >
            <span className="text-gray-700">Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div className="mt-3 text-sm text-gray-800 flex justify-center items-center">
        Learn more about discounts
      </div>
    </div>
  );
};

export default DiscountsPage;
