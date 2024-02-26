"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Heading from "@/components/Heading";
import { IoIosArrowRoundBack, IoMdTime } from "react-icons/io";
import { useSearchParams } from 'next/navigation';

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  ButtonGroup,
  Input,
  Radio,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AiOutlinePercentage } from "react-icons/ai";

import { IoCloseSharp, IoImageOutline } from "react-icons/io5";
import { CiShoppingTag } from "react-icons/ci";
import { TbShoppingBagDiscount } from "react-icons/tb";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoIosArrowForward } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa6";

export const dynamic = "force-dynamic"

export default function NewDiscount() {

  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  console.log(type);

  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState(null);
  const handleOpen = (value) => setSize(value);


  const [collections, setCollections] = useState([])
  const [allCollections, setAllCollections] = useState([])

  const [searchCollection, setSearchCollection] = useState('')
  const handleCollection = (e)=>{
    if(e.target.name === 'searchCollection'){
      setSearchCollection(e.target.value)
    }
  }

  const [selectedValue, setSelectedValue] = useState('');
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
      
    const newCollections = allCollections.filter((item)=>{
      return item.name.toLowerCase().includes(searchCollection.toLowerCase());
    });
    if (searchCollection === '') {
      setAllCollections([
        {
          name: 'Home Page',
          product: 0,
          avatar: ''
        },
        {
          name: 'New Collection',
          product: 3,
          avatar: ''
        }
      ]);
    } else {
      setAllCollections(newCollections);
    }

  }, [searchCollection])


  const addCollection = (e) => {
    e.preventDefault();

    const newCollections = [...collections];

    // Filter the data
    let data = allCollections.filter((item) => {
      return item.name === selectedValue;
    });

    // Check if data is found
    if (data.length > 0) {
        // Push the first item of the filtered array
        newCollections.push(data[0]);
        console.log(newCollections);

        // Set the updated collections state
        setCollections(newCollections);
    } else {
        console.log("Data not found");
    }
  }

  const deleteCollection = (e, indexToDelete)=>{
    e.preventDefault();

    const newCollections = [...collections];
    newCollections.splice(indexToDelete, 1);
    setCollections(newCollections);
  }

  let label; 
  if(type === 'moneyOffProduct'){
    label = 'Amount off products'
  }
  else if(type === 'buyXgetY'){
    label = 'Buy X get Y'
  }


  return (
    <div className="w-full bg-gray-100 min-h-screen items-center flex flex-col">
      <div className="flex-col max-w-5xl w-full flex gap-6 md:px-8 py-8">
        <div className="flex gap-3 items-center ">
          <Link
            href="/products"
            className="p-1 rounded-md hover:bg-black/10 transition-all"
          >
            <IoIosArrowRoundBack size={20} className="text-[#1a1a1a]" />
          </Link>
          <Heading>Create product discount</Heading>
        </div>

        <div className="flex min-h-screen space-x-5">
          <div className="flex-col w-2/3 space-y-5">

            <Card className="w-full flex-col">
              <CardHeader
                shadow={false}
                floated={false}
                className="flex justify-between shrink-0 rounded-r-none"
              >
                <h1 className="text-sm font-semibold">{label}</h1>
                <h1 className="text-sm font-medium">Product discount</h1>
                
              </CardHeader>
              <CardBody className="px-4">

                <div className="flex-col">

                  <label htmlFor="discountCode" className="block text-sm font-medium leading-6 text-gray-900">
                    Method
                  </label>
                  <ButtonGroup size="sm" className="mt-1">
                    <Button className="bg-gray-300 font-medium text-black">Discount code</Button>
                    <Button className="bg-white font-medium text-black">Automatic discount</Button>
                  </ButtonGroup>

                  <div className="mt-4">
                    <div className="flex justify-between">
                      <label htmlFor="discountCode" className="block text-sm font-medium leading-6 text-gray-900">
                        Discount code
                      </label>
                      <label htmlFor="randomCode" className="block text-sm font-medium leading-6 text-blue-600">
                        Generate random code
                      </label>
                    </div>
                    <input
                      type="number"
                      name="discountCode"
                      id="discountCode"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <h1 className="text-sm tracking-tight mt-1">Customers must enter this code at checkout.</h1>
                  </div>
                </div>

              </CardBody>
            </Card>

            {type === 'moneyOffProduct' && <Card className="w-full flex-col">
              
              <CardBody className="px-4">

                <div className="flex-col space-y-5">

                  <div className="">
                    <label htmlFor="discountValue" className="block text-sm font-medium leading-6 text-gray-900">
                      Discount value
                    </label>
                    
                    <div className="flex space-x-4">
                      <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value='percentage' selected>Percentage</option>
                        <option value="FixedAmount">Fixed Amount</option>
                      </select>
                      <div className="w-72">
                        <Input icon={<AiOutlinePercentage />} />
                      </div>
                    </div>
                    
                  </div>

                  <div className="">
                    <label htmlFor="appliesTo" className="block text-sm font-medium leading-6 text-gray-900">
                      Applies to
                    </label>
                    
                    <select id="appliesTo" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value='speceficCollections' selected>Specefic collections</option>
                      <option value="speceficProducts">Specefic products</option>
                    </select>

                    <div className="flex space-x-3 items-center mt-3">
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search collections..." required />
                      </div>
                      <button onClick={() => handleOpen("sm")} className="py-2 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Browse</button>
                    </div>

                    <div className="mt-2">
                      {collections.map((item, index) => (
                        <div key={index} className="flex mt-2 justify-between items-center border rounded-md py-2 px-3 text-sm text-gray-700">
                          
                          <div className="flex space-x-3">
                            <div className="border border-gray-300 rounded-md items-center my-auto p-2">
                              <IoImageOutline className='text-xl'/>
                            </div>
                            <div className="flex-col">
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="">{item.product}</p>
                            </div>
                          </div>
                          <div>
                            <IoCloseSharp onClick={(e) => deleteCollection(e,index)} className='text-lg cursor-pointer'/>
                          </div>
                          
                        </div>
                      ))}
                    </div>

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
                          Add collections
                        </div>
                        <div>
                          <IoCloseSharp onClick={() => handleOpen(null)} className='text-lg cursor-pointer'/>
                        </div>
                      </DialogHeader>
                      <DialogBody className="py-0">

                        <div className="relative w-full py-3 ">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                          </div>
                          <input name="searchCollection" value={searchCollection} onChange={handleCollection} type="search" id="default-search" className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search collections..." required />
                        </div>

                        {allCollections.map((item, index) => (
                          <div key={index} className="flex justify-between items-center border-t border-b py-2 text-sm text-gray-700">
                            
                            <Radio
                              name="terms"
                              checked={selectedValue === item.name}
                              value={item.name}
                              onChange={handleRadioChange}
                              label={
                                <div className="flex space-x-3">
                                  <div className="border border-gray-300 rounded-md items-center my-auto p-2">
                                    <IoImageOutline className='text-xl'/>
                                  </div>
                                  <div className="flex-col">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="">{item.product} products</p>
                                  </div>
                                </div>
                              }
                            />
                            
                          </div>
                        ))}
                      </DialogBody>
                      <DialogFooter className="flex space-x-2 py-3">
                        <Button
                          variant="text"
                          color="gray"
                          onClick={() => handleOpen(null)}
                          className="mr-1 border shadow-md border-gray-600 py-1 px-2"
                        >
                          <span className="text-gray-700">Cancel</span>
                        </Button>
                        <Button
                          variant="text"
                          color="gray"
                          onClick={(e) => addCollection(e)}
                          className="mr-1 border bg-gray-300 shadow-md border-gray-500 py-1 px-4"
                        >
                          <span className="text-gray-700">Add</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>

                    
                    
                  </div>

                </div>

              </CardBody>
            </Card>}

            {type === 'buyXgetY' && <Card className="w-full flex-col">

              <CardHeader
                shadow={false}
                floated={false}
                className="flex justify-between shrink-0 rounded-r-none"
              >
                <h1 className="text-sm font-semibold">Customer buys</h1>
                
              </CardHeader>
              
              <CardBody className="px-4 flex-col space-y-5">

                <div className="pb-4 border-b border-gray-400">

                  <div className="flex-col space-y-2">

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" class="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm" for="myCheckbox">Minimum quantity of items</label>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" class="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm" for="myCheckbox">Minimum purchase amount</label>
                    </div>

                  </div>

                  <div className="flex-col space-y-4 pt-3">
                    <div className="">

                      <div className="flex space-x-3 w-full">
                        <div className="w-1/3">
                          <label htmlFor="anyItemsFrom" className="block text-sm font-medium leading-6 text-gray-900">
                            Quantity
                          </label>
                          <input
                            type="number"
                            name="discountCode"
                            id="discountCode"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          
                        </div>
                        <div className="w-2/3">
                          <label htmlFor="anyItemsFrom" className="block text-sm font-medium leading-6 text-gray-900">
                            Any items from
                          </label>
                          
                          <select id="anyItemsFrom" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="speceficProducts" selected>Specefic products</option>
                            <option value='speceficCollections'>Specefic collections</option>
                          </select>
                        </div>
                        
                      </div>
                      
                      

                      <div className="flex space-x-3 items-center mt-3">
                        <div className="relative w-full">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                              </svg>
                          </div>
                          <input type="search" id="default-search" className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search products..." required />
                        </div>
                        <button onClick={() => handleOpen("sm")} className="py-2 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Browse</button>
                      </div>

                      <div className="mt-2">
                        {collections.map((item, index) => (
                          <div key={index} className="flex mt-2 justify-between items-center border rounded-md py-2 px-3 text-sm text-gray-700">
                            
                            <div className="flex space-x-3">
                              <div className="border border-gray-300 rounded-md items-center my-auto p-2">
                                <IoImageOutline className='text-xl'/>
                              </div>
                              <div className="flex-col">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="">{item.product}</p>
                              </div>
                            </div>
                            <div>
                              <IoCloseSharp onClick={(e) => deleteCollection(e,index)} className='text-lg cursor-pointer'/>
                            </div>
                            
                          </div>
                        ))}
                      </div>

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
                            Add products
                          </div>
                          <div>
                            <IoCloseSharp onClick={() => handleOpen(null)} className='text-lg cursor-pointer'/>
                          </div>
                        </DialogHeader>
                        <DialogBody className="py-0">

                          <div className="relative w-full py-3 ">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                              </svg>
                            </div>
                            <input name="searchCollection" value={searchCollection} onChange={handleCollection} type="search" id="default-search" className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search collections..." required />
                          </div>

                          {allCollections.map((item, index) => (
                            <div key={index} className="flex justify-between items-center border-t border-b py-2 text-sm text-gray-700">

                              <div className="flex space-x-2 items-center">
                                <input 
                                  checked={selectedValue === item.name}
                                  value={item.name}
                                  onChange={handleRadioChange} 
                                  type="checkbox" id="myCheckbox" 
                                  className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                                <label className="text-sm" for="myCheckbox">
                                  <div className="flex space-x-3">
                                    <div className="border border-gray-300 rounded-md items-center my-auto p-2">
                                      <IoImageOutline className='text-xl'/>
                                    </div>
                                    <div className="flex-col">
                                      <h3 className="font-semibold">{item.name}</h3>
                                      <p className="">{item.product} products</p>
                                    </div>
                                  </div>
                                </label>
                              </div>
                              
                            </div>
                          ))}
                        </DialogBody>
                        <DialogFooter className="flex space-x-2 py-3">
                          <Button
                            variant="text"
                            color="gray"
                            onClick={() => handleOpen(null)}
                            className="mr-1 border shadow-md border-gray-600 py-1 px-2"
                          >
                            <span className="text-gray-700">Cancel</span>
                          </Button>
                          <Button
                            variant="text"
                            color="gray"
                            onClick={(e) => addCollection(e)}
                            className="mr-1 border bg-gray-300 shadow-md border-gray-500 py-1 px-4"
                          >
                            <span className="text-gray-700">Add</span>
                          </Button>
                        </DialogFooter>
                      </Dialog>

                    </div>
                  </div>

                </div>

                <div>

                  <h1 className="text-sm font-semibold">Customer gets</h1>

                  <h1 className="text-sm pt-1 tracking-tight font-medium">Customers must add the quantity of items specified below to their cart.</h1>

                  <div className="flex-col space-y-2 pt-5">

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" class="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm" for="myCheckbox">Minimum quantity of items</label>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" class="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm" for="myCheckbox">Minimum purchase amount</label>
                    </div>

                  </div>

                  <div className="flex-col space-y-4 pt-3">
                    <div className="">

                      <div className="flex space-x-3 w-full">
                        <div className="w-1/3">
                          <label htmlFor="anyItemsFrom" className="block text-sm font-medium leading-6 text-gray-900">
                            Quantity
                          </label>
                          <input
                            type="number"
                            name="discountCode"
                            id="discountCode"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          
                        </div>
                        <div className="w-2/3">
                          <label htmlFor="anyItemsFrom" className="block text-sm font-medium leading-6 text-gray-900">
                            Any items from
                          </label>
                          
                          <select id="anyItemsFrom" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="speceficProducts" selected>Specefic products</option>
                            <option value='speceficCollections'>Specefic collections</option>
                          </select>
                        </div>
                        
                      </div>
                      
                      

                      <div className="flex space-x-3 items-center mt-3">
                        <div className="relative w-full">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                              </svg>
                          </div>
                          <input type="search" id="default-search" className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search products..." required />
                        </div>
                        <button onClick={() => handleOpen("sm")} className="py-2 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Browse</button>
                      </div>

                      <div className="mt-2">
                        {collections.map((item, index) => (
                          <div key={index} className="flex mt-2 justify-between items-center border rounded-md py-2 px-3 text-sm text-gray-700">
                            
                            <div className="flex space-x-3">
                              <div className="border border-gray-300 rounded-md items-center my-auto p-2">
                                <IoImageOutline className='text-xl'/>
                              </div>
                              <div className="flex-col">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="">{item.product}</p>
                              </div>
                            </div>
                            <div>
                              <IoCloseSharp onClick={(e) => deleteCollection(e,index)} className='text-lg cursor-pointer'/>
                            </div>
                            
                          </div>
                        ))}
                      </div>

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
                            Add products
                          </div>
                          <div>
                            <IoCloseSharp onClick={() => handleOpen(null)} className='text-lg cursor-pointer'/>
                          </div>
                        </DialogHeader>
                        <DialogBody className="py-0">

                          <div className="relative w-full py-3 ">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                              </svg>
                            </div>
                            <input name="searchCollection" value={searchCollection} onChange={handleCollection} type="search" id="default-search" className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search collections..." required />
                          </div>

                          {allCollections.map((item, index) => (
                            <div key={index} className="flex justify-between items-center border-t border-b py-2 text-sm text-gray-700">

                              <div className="flex space-x-2 items-center">
                                <input 
                                  checked={selectedValue === item.name}
                                  value={item.name}
                                  onChange={handleRadioChange} 
                                  type="checkbox" id="myCheckbox" 
                                  className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                                <label className="text-sm" for="myCheckbox">
                                  <div className="flex space-x-3">
                                    <div className="border border-gray-300 rounded-md items-center my-auto p-2">
                                      <IoImageOutline className='text-xl'/>
                                    </div>
                                    <div className="flex-col">
                                      <h3 className="font-semibold">{item.name}</h3>
                                      <p className="">{item.product} products</p>
                                    </div>
                                  </div>
                                </label>
                              </div>
                              
                            </div>
                          ))}
                        </DialogBody>
                        <DialogFooter className="flex space-x-2 py-3">
                          <Button
                            variant="text"
                            color="gray"
                            onClick={() => handleOpen(null)}
                            className="mr-1 border shadow-md border-gray-600 py-1 px-2"
                          >
                            <span className="text-gray-700">Cancel</span>
                          </Button>
                          <Button
                            variant="text"
                            color="gray"
                            onClick={(e) => addCollection(e)}
                            className="mr-1 border bg-gray-300 shadow-md border-gray-500 py-1 px-4"
                          >
                            <span className="text-gray-700">Add</span>
                          </Button>
                        </DialogFooter>
                      </Dialog>

                    </div>
                  </div>

                </div>

                <div className="flex-col space-y-2">

                  <h1 className="text-sm font-semibold">At a discounted value</h1>

                  <div className="flex space-x-2 items-center">
                    <input type="checkbox" id="myCheckbox" class="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                    <label className="text-sm font-medium" for="myCheckbox">Amount off each</label>
                  </div>
                  <div className="flex-col ml-6">

                    <div className="relative max-w-sm">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <FaRupeeSign className='textlg'/>:
                      </div>
                      <input
                        type="number"
                        name="amountOffEach"
                        id="amountOffEach"
                        placeholder="0.00"
                        className="block ps-10 w-1/3 rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    
                    <h1 className="text-sm tracking-tight my-1 ml-1">For multiple quantities, the discount amount will be taken off each Y item.</h1>
                  </div>

                  <div className="flex space-x-2 items-center mt-2">
                    <input type="checkbox" id="myCheckbox" class="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                    <label className="text-sm" for="myCheckbox">Free</label>
                  </div>

                </div>

                <div className="flex-col space-y-2 mt-5 border-t border-gray-400">

                  <h1 className="text-sm font-semibold mt-5">Set a maximum number of uses per order</h1>

                  
                  <div className="flex-col ml-6">

                    <input
                      type="number"
                      name="amountOffEach"
                      id="amountOffEach"
                      placeholder="0.00"
                      className="block w-1/3 rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-700 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    
                  </div>

                </div>

              </CardBody>
            </Card>}

            {type === 'moneyOffProduct' && <Card className="w-full flex-col">
              <CardBody className="px-4">
                <div className="flex-col space-y-3">
                  
                  <h1 className="text-sm font-semibold">Minimum purchase requirements</h1>

                  <div className="flex flex-col space-y-2">

                    <div className="flex space-x-2 items-center">
                      <input defaultChecked type="checkbox" id="myCheckbox" class="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" for="myCheckbox">No minimum requirements</label>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" class="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" for="myCheckbox">Minimum purchase amount (Rs)</label>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" class="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" for="myCheckbox">Minimum quantity of items</label>
                    </div>
                    
                  </div>


                </div>
              </CardBody>
            </Card>}

            <Card className="w-full flex-col">
              <CardBody className="px-4">
                <div className="flex-col space-y-3">
                  
                  <h1 className="text-sm font-semibold">Customer eligibility</h1>

                  <div className="flex flex-col space-y-2">

                    <div className="flex space-x-2 items-center">
                      <input defaultChecked type="checkbox" id="myCheckbox" class="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" for="myCheckbox">All customers</label>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" class="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" for="myCheckbox">Specific customer segments</label>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" class="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" for="myCheckbox">Specific customers</label>
                    </div>

                  </div>


                </div>
              </CardBody>
            </Card>
            
            <Card className="w-full flex-col">
              <CardBody className="px-4">
                <div className="flex-col space-y-3">
                  
                  <h1 className="text-sm font-semibold">Maximum discount uses</h1>

                  <div className="flex flex-col space-y-2">

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" class="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" for="myCheckbox">Limit number of times this discount can be used in total</label>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" class="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" for="myCheckbox">Limit to one use per customer</label>
                    </div>
                    
                  </div>

                </div>
              </CardBody>
            </Card>

            <Card className="w-full flex-col">
              <CardBody className="px-4">
                <div className="flex-col space-y-1">
                  
                  <h1 className="text-sm font-semibold">Combinations</h1>
                  <h1 className="text-sm font-medium tracking-tight">This product discount can be combined with:</h1>

                  <div className="flex pt-3 flex-col space-y-2">

                    <div className="flex space-x-2 items-center">
                      <input defaultChecked type="checkbox" id="myCheckbox" class="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" for="myCheckbox">Product discounts</label>
                    </div>

                    {type === 'buyXgetY' && <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" class="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" for="myCheckbox">Order discounts</label>
                    </div>}

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" class="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" for="myCheckbox">Shipping discounts</label>
                    </div>

                  </div>

                </div>
              </CardBody>
            </Card>

            <Card className="w-full flex-col">
              
              <CardBody className="px-4">

                <div className="flex-col space-y-5">

                  <h1 className="text-sm font-semibold">Active Dates</h1>

                  <div>
                    <div className="flex w-full space-x-3">

                      <div className="w-1/2">
                        <label htmlFor="startDate" className="block text-sm font-medium leading-6 text-gray-900">
                          Start date
                        </label>
                        
                        <div className="relative max-w-sm">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                            </svg>
                          </div>
                          <input type="date" className="bg-white ps-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-[6px] px-2 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
                        </div>
                      </div>

                      <div className="w-1/2">
                        <label htmlFor="startTime" className="block text-sm font-medium leading-6 text-gray-900">
                          Start time
                        </label>

                        <div className="relative mb-6">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <IoMdTime className='text-lg' />
                          </div>
                          <select id="time" className="bg-white ps-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value='8:10' selected>8:10 PM</option>
                          </select>
                        </div>
                        
                      </div>

                    </div>

                    <div className="flex w-full space-x-3">

                      <div className="w-1/2">
                        <label htmlFor="endDate" className="block text-sm font-medium leading-6 text-gray-900">
                          End date
                        </label>
                        
                        <div className="relative max-w-sm">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                            </svg>
                          </div>
                          <input type="date" className="bg-white ps-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-[6px] px-2 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
                        </div>
                      </div>

                      <div className="w-1/2">
                        <label htmlFor="endTime" className="block text-sm font-medium leading-6 text-gray-900">
                          End time
                        </label>

                        <div className="relative">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <IoMdTime className='text-lg' />
                          </div>
                          <select id="time" className="bg-white ps-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value='8:10' selected>8:10 PM</option>
                          </select>
                        </div>
                        
                      </div>

                    </div>
                  </div>


                </div>

              </CardBody>
            </Card>
           

          </div>
          <div className="w-1/3 flex-col space-y-5">

            <Card className="w-full flex-col">
              
              <CardBody className="px-4">
              
                <div className="flex-col space-y-5 tracking-tight">

                  <div className="flex-col space-y-2">
                    <h1 className="text-sm font-semibold">Summary</h1>
                    <h1 className="text-sm font-semibold">No discount code yet</h1>
                  </div>
                  <div className="flex-col space-y-2">
                    <h1 className="text-sm font-semibold">Type and method</h1>
                    <ul className="list-disc text-sm px-6">
                      <li>Amount off products</li>
                      <li>Code</li>
                    </ul>
                  </div>

                  <div className="flex-col space-y-2">
                    <h1 className="text-sm font-semibold">Details</h1>
                    <ul className="list-disc text-sm px-6">
                      <li>Can’t combine with other discounts</li>
                    </ul>
                  </div>

                  <div className="flex-col space-y-2">
                    <h1 className="text-sm font-semibold">Performance</h1>
                    <h1 className="text-sm font-medium">Discount is not active yet</h1>
                  </div>

                  
                </div>


              </CardBody>
            </Card>

            <Card className="w-full flex-col">
              <CardBody className="px-4">
                <div className="flex-col space-y-3">
                  
                  <h1 className="text-sm font-semibold">Sales channels</h1>

                  <div className="flex flex-col space-y-2">

                    <div className="flex space-x-2 items-center">
                      <input defaultChecked type="checkbox" id="myCheckbox" class="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm" for="myCheckbox">Point of sales</label>
                    </div>

                  </div>

                </div>
              </CardBody>
            </Card>


            

          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button type="button" className="py-1 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Discard</button>
          <button type="button" className="py-1 px-3 text-sm font-medium text-white focus:outline-none bg-gray-800 rounded-lg border border-gray-400 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Save discount</button>
        </div>

        
      </div>

    </div>
  );
}
