// pages/discounts.tsx
"use client"

import React, { useEffect, useState } from "react";
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
  Typography,
  Card as MaterialCard
} from "@material-tailwind/react";
import { IoCloseSharp, IoSearchOutline } from "react-icons/io5";
import { CiShoppingTag } from "react-icons/ci";
import { TbArrowsSort, TbShoppingBagDiscount } from "react-icons/tb";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoIosArrowForward } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { CgSortAz } from "react-icons/cg";
import { BiSortAlt2 } from "react-icons/bi";
import { useRouter } from "next/navigation";

const DiscountsPage = () => {

  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState(null);
  const handleOpen = (value) => setSize(value);
  const [buttonIndex, setButtonIndex] = useState(0)

  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      const res = await fetch(`api/discount`);
      const data = await res.json();
      setDiscounts(data);
    };

    fetchDiscounts();
  }, []);


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


  const TABLE_HEAD = ["Title", "Status", "Method", "Type", "Combinations", "Used"];
  const tableButtons = [
    {
      name: 'All',
    },
    {
      name: 'Active',
    },
    {
      name: 'Scheduled',
    },
    {
      name: 'Expired',
    },
  ]

  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768); // assuming 'md' breakpoint is 768px
    };

    // Initial check on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const openDiscount = (id, type) => {
    console.log('function',  id, type)
    router.push(`discounts/new?id=${id}&type=${type}`)
  }

  return (
    <div className="py-5">
      <div className="flex px-1 md:px-5 mb-5 justify-between items-center">
        <Heading>Discounts</Heading>
        <div className="flex justify-center items-center gap-2">
          <OutlinedButton>Export</OutlinedButton>
          <FilledButton className="py-[5px]" onClick={() => handleOpen("sm")}>Create Discount</FilledButton>
        </div>
      </div>


      {discounts.length === 0 && <Card className="flex flex-col items-center justify-center py-16">
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
      </Card>}


      {discounts.length != 0 &&  <MaterialCard className="px-1 w-full">

        <div className="flex justify-between items-center py-2 px-0 md:px-2">

          <div className="flex items-center space-x-1 md:space-x-4">
            {tableButtons.map((item, index)=>{
              return <button key={index} onClick={()=>setButtonIndex(index)} className={`font-semibold text-xs md:text-sm px-1 py-1 ${buttonIndex === index ? 'bg-gray-200 rounded-md' : ''}`}>{item.name}</button>
            })}
            <FaPlus className='text-xs md:text-sm'/>
          </div>

          <div className="flex space-x-1 md:space-x-2 items-center">
            <div className="flex space-x-1 items-center bg-gray-50 px-1 border border-gray-300 rounded-lg shadow-xl">
              <IoSearchOutline className='text-lg md:text-xl font-semibold' />
              <CgSortAz className='text-2xl md:text-3xl' />
            </div>
            <div className="flex space-x-1 items-center bg-gray-50 px-1 py-1 border border-gray-300 rounded-lg shadow-xl">
              <TbArrowsSort className='text-lg md:text-xl font-semibold' />
            </div>
          </div>

        </div>
        <table className="w-full shadow-lg min-w-max table-auto text-left">
          <thead>
            {isMediumScreen ? (<tr className="">
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="bg-[#f1f1f1] border-b border-t border-blue-gray-100 p-2 py-3 "
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>) : ''}
          </thead>
          <tbody>
          {discounts.map((item, index) => {

            const isLast = index === discounts.length - 1;
            const classes = isLast ? "p-3" : "p-3 border-b border-blue-gray-50";

            return isMediumScreen ? (
              <tr onClick={()=> openDiscount(item._id, item.type)} key={index} className="col cursor-pointer">
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex-col font-normal text-xs"
                  >
                    <div className="font-bold text-sm">{item.discountCode}</div>
                    <div className="font-semibold">{item.discountValue}% off {item.collections[0].title} - <span>{item.limitPerCustomer === true ? 'One use per customer' : ''}</span></div>
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className={`font-semibold py-1 rounded-lg text-center ${item.status === 'Active' ? 'bg-[#92cb32]' : 'bg-red-400'} text-xs`}
                  >
                    {item.status}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold text-sm"
                  >
                    {item.code}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium text-xs"
                  >
                    <div className="font-medium">Amount off products</div>
                    <div className="font-medium">{item.productDiscount === true ? 'Product Discount' : item.shippingDiscount === true ? 'Shipping Discount' : ''}</div>
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium text-xs"
                  >
                    {item.productDiscount === true ? 'Product Discount' : item.shippingDiscount === true ? 'Shipping Discount' : ''}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium text-xs"
                  >
                    {item.used}
                  </Typography>
                </td>
              </tr>
            ) : (
             <div key={index} className="px-1 md:px-5 py-4 md:py-5 w-full flex justify-between items-center">
                <div className="">
                  <div className="font-bold text-sm">{item.discountCode} - ({item.used} used)</div>
                  <div className="font-semibold text-xs">{item.discountValue}% off {item.collections[0].title} - <span>{item.limitPerCustomer === true ? 'One use per customer' : ''}</span></div>
                </div>
                {/* <div>
                  <div className={`font-semibold px-2 py-1 rounded-lg text-center ${item.status === 'Active' ? 'bg-[#92cb32]' : 'bg-red-400'} text-xs`}>
                    {item.status}
                  </div>
                </div> */}
             </div>
            );
          })}
          </tbody>
        </table>
        
      </MaterialCard>}

      


      <Dialog
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl" ||
          size === "xxl"
        }
        size={ isMediumScreen === false ? 'xxl' : "sm"}
        className=""
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
        <DialogBody className="">
          {discountData.map((item, index) => (
            <Link href={item.link} onClick={()=> handleOpen(null)} key={index} className="items-center my-4 text-sm text-gray-700">
              <div className={`${isMediumScreen === false ?'flex-col' : 'flex'} justify-between items-center py-3 w-full border-b-2`}>
                <div className="">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="py-1">{item.desc}</p>
                </div>
                <div className="flex items-center">
                  <div className="flex py-1 space-x-1 bg-gray-300 rounded-lg px-3 text-gray-800">
                    <item.icon className='text-lg'/>
                    <p>{item.label}</p>
                  </div>
                  <div>
                    <IoIosArrowForward className='text-lg ml-2 text-gray-600'/>
                  </div>
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
      <div className="mt-3 text-sm text-gray-800 flex justify-center items-center font-semibold">
        Learn more about <span className="text-blue-600 font-bold underline ml-1">discounts</span>
      </div>
    </div>
  );
};

export default DiscountsPage;
