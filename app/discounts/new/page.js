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
  Button,
  Input,
  Radio,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AiOutlinePercentage } from "react-icons/ai";

import { IoCloseSharp, IoImageOutline } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa6";
import { useCountries } from "use-react-countries";
import { useRouter } from "next/router";

export const dynamic = "force-dynamic"

export default function NewDiscount() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get('type');

  const { countries } = useCountries();
  const [open, setOpen] = React.useState(false);
  const [size, setSize] = React.useState(null);
  const handleOpen = (value) => setSize(value);
  const handleOpenCountry = (value) => setSize(value);


  const [collections, setCollections] = useState([])
  const [allCollections, setAllCollections] = useState([])
  
  const [addedCountries, setAddedCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState(countries)

  const [searchCollection, setSearchCollection] = useState('')
  const [searchCountries, setSearchCountries] = useState('')

  const handleCollection = (e)=>{
    if(e.target.name === 'searchCollection'){
      setSearchCollection(e.target.value)
    }
  }

  const handleCountry = (e)=>{

    if(e.target.name === 'searchCountries'){
      setSearchCountries(e.target.value)
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


  useEffect(() => {
    
    const newCollections = countries.filter((item)=>{
      return item.name.toLowerCase().includes(searchCountries.toLowerCase());
    });
    setFilteredCountries(newCollections)

  }, [searchCountries])


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

        // Set the updated collections state
        setCollections(newCollections);
    } else {
        console.log("Data not found");
    }
  }

  const addCountry = (e) => {
    e.preventDefault();

    const newCountries = [...addedCountries];

    let data = countries.filter((item) => {
      return item.name === selectedValue;
    });

    if (data.length > 0) {
      newCountries.push(data[0]);
      setAddedCountries(newCountries);
    } 
    else {
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
  else if(type === 'moneyOffOrder'){
    label = 'Amount off order'
  }
  else if(type === 'shipping'){
    label = 'Free shipping '
  }













  const [discountCode, setDiscountCode] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [discountType, setDiscountType] = useState('Percentage')
  const [appliesTo, setAppliesTo] = useState('Specefic Collections');


  const [noMinimumRequirements, setNoMinimumRequirements] = useState(false);
  const [minimumPurchaseAmount, setMinimumPurchaseAmount] = useState(false);
  const [minimumQualityOfAmount, setMinimumQualityOfAmount] = useState(false);
  const [allCustomers, setAllCustomers] = useState(false);
  const [specificCustomerSegments, setSpecificCustomerSegments] = useState(false);
  const [specificCustomers, setSpecificCustomers] = useState(false);
  const [limitTimes, setLimitTimes] = useState(false);
  const [limitPerCustomer, setLimitPerCustomer] = useState(false);
  const [otherDiscount, setOtherDiscount] = useState(false);
  const [shippingDiscount, setShippingDiscount] = useState(false);
  const [productDiscount, setProductDiscount] = useState(false)


  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    switch (name) {
      case 'discountCode':
        setDiscountCode(value);
        break;
      case 'discountValue':
        setDiscountValue(value);
        break;
      case 'discountType':
        setDiscountType(value);
        break;
      case 'appliesTo':
        setAppliesTo(value);
        break;
      case 'collections':
        setCollections(collections);
        break;
      case 'noMinimumRequirements':
        setNoMinimumRequirements(checked);
        break;
      case 'minimumPurchaseAmount':
        setMinimumPurchaseAmount(value);
        break;
      case 'minimumQualityOfAmount':
        setMinimumQualityOfAmount(value);
        break;
      case 'allCustomers':
        setAllCustomers(checked);
        break;
      case 'specificCustomerSegments':
        setSpecificCustomerSegments(checked);
        break;
      case 'specificCustomers':
        setSpecificCustomers(checked);
        break;
        case 'limitTimes':
        setLimitTimes(checked);
        break;
      case 'limitPerCustomer':
        setLimitPerCustomer(checked);
        break;
      case 'otherDiscount':
        setOtherDiscount(checked);
        break;
      case 'productDiscount':
        setProductDiscount(checked);
        break;
      case 'shippingDiscount':
        setShippingDiscount(checked);
        break;

      case 'startDate':
        setStartDate(value);
        break;
      case 'endDate':
        setEndDate(value);
        break;
      case 'startTime':
        setStartTime(value);
        break;
      case 'endTime':
        setEndTime(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { status: 'Active', code:'code', used: 0, discountCode, discountValue, discountType, appliesTo, collections, noMinimumRequirements, minimumPurchaseAmount, minimumQualityOfAmount, allCustomers, specificCustomerSegments, specificCustomers, limitTimes, limitPerCustomer, otherDiscount, shippingDiscount, startDate, endDate, startTime, endTime, type };

    try {
      
      const res = await fetch(`/api/discount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log(res)

      if (res.ok) {
        const response = await res.json();
        router.push('/discounts')
        console.log(response); // Log response from API
      } else {
        console.error('Failed to send data to API');
      }
    } catch (error) {
        console.error('Error sending data to API:', error);
    }
  };
  
  


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
          <Heading>Create { type==='moneyOffOrder' ? 'order' : type ==='shipping' ? 'shipping' : 'product' } discount</Heading>
        </div>

        <div className="flex flex-col lg:flex-row min-h-screen space-y-5 lg:space-y-0 lg:space-x-5">
          <div className="flex-col w-full lg:w-2/3 space-y-5">

            <Card className="w-full flex-col">
              <CardHeader
                shadow={false}
                floated={false}
                className="flex justify-between shrink-0 rounded-r-none"
              >
                <h1 className="text-sm text-gray-900 font-semibold">{label}</h1>
                <h1 className="text-sm font-medium">{ type==='moneyOffOrder' ? 'Order' : type ==='shipping' ? 'Shipping' : 'Product' } discount</h1>
                
              </CardHeader>
              <CardBody className="px-4">

                <div className="flex-col">

                  <label htmlFor="discountCode" className="block text-sm font-medium leading-6 text-gray-900">
                    Method
                  </label>
                  <div className="mt-1">
                    <button className="bg-gray-300 rounded-l-md border border-black py-2 text-xs px-3 font-medium lg:font-semibold text-black">Discount code</button>
                    <button className="bg-white rounded-r-md border border-black py-2 text-xs px-3 font-medium lg:font-semibold text-black">Automatic discount</button>
                  </div>

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
                      value={discountCode}
                      onChange={handleChange}
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
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Discount value
                    </label>
                    
                    <div className="flex space-x-4">
                      <select id="discountType" onChange={handleChange} name="discountType" value={discountType} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option defaultValue='Percentage'>Percentage</option>
                        <option value="Fixed Amount">Fixed Amount</option>
                      </select>
                      <div className="w-72 flex items-center">
                        <input
                          type="number"
                          name="discountValue"
                          value={discountValue}
                          onChange={handleChange}
                          id="discountValue"
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <AiOutlinePercentage className="text-black text-lg"/>
                      </div>
                    </div>
                    
                  </div>

                  <div className="">
                    <label htmlFor="appliesTo" className="block text-sm font-medium leading-6 text-gray-900">
                      Applies to
                    </label>
                    
                    <select name="appliesTo" onChange={handleChange} value={appliesTo} id="appliesTo" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option defaultValue='Specefic Collections'>Specefic collections</option>
                      <option value="Specefic Products">Specefic products</option>
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
                          onClick={(e) => {addCollection(e) , handleOpen(null) }}
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

            {type === 'moneyOffOrder' && <Card className="w-full flex-col">
              
              <CardBody className="px-4">

                <div className="flex-col space-y-5">

                  <div className="">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Discount value
                    </label>
                    
                    <div className="flex space-x-4">
                      <select id="discountType" onChange={handleChange} name="discountType" value={discountType} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value='Percentage' selected>Percentage</option>
                        <option value="FixedAmount">Fixed Amount</option>
                      </select>
                      <div className="w-72">
                        <input onChange={discountValue} name="discountValue" value={discountValue} icon={<AiOutlinePercentage />} />
                      </div>
                    </div>
                    
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
                <h1 className="text-sm text-gray-900 font-semibold">Customer buys</h1>
                
              </CardHeader>
              
              <CardBody className="px-4 flex-col space-y-5">

                <div className="pb-4 border-b border-gray-400">

                  <div className="flex-col space-y-2">

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm" htmlFor="myCheckbox">Minimum quantity of items</label>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm" htmlFor="myCheckbox">Minimum purchase amount</label>
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
                                <label className="text-sm" htmlFor="myCheckbox">
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
                      <input type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm" htmlFor="myCheckbox">Minimum quantity of items</label>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm" htmlFor="myCheckbox">Minimum purchase amount</label>
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
                                <label className="text-sm" htmlFor="myCheckbox">
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
                    <input type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                    <label className="text-sm font-medium" htmlFor="myCheckbox">Amount off each</label>
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
                    <input type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                    <label className="text-sm" htmlFor="myCheckbox">Free</label>
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
                  
                  <h1 className="text-sm text-gray-900 font-semibold">Minimum purchase requirements</h1>

                  <div className="flex flex-col space-y-2">

                    <div className="flex space-x-2 items-center">
                      <input onChange={handleChange} name="noMinimumRequirements" checked={noMinimumRequirements} defaultChecked type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">No minimum requirements</label>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <input onChange={handleChange} name="minimumPurchaseAmount" checked={minimumPurchaseAmount} type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">Minimum purchase amount (Rs)</label>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <input onChange={handleChange} name="minimumQualityOfAmount" checked={minimumQualityOfAmount} type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">Minimum quantity of items</label>
                    </div>
                    
                  </div>


                </div>
              </CardBody>
            </Card>}

            {type === 'shipping' && <Card className="w-full flex-col">

              <CardHeader
                shadow={false}
                floated={false}
                className="flex justify-between shrink-0 rounded-r-none"
              >
                <h1 className="text-sm text-gray-900 font-semibold">Countries</h1>
                
              </CardHeader>

              <CardBody className="px-4 flex-col space-y-5">

                <div className="pb-4 border-b border-gray-400">

                  <div className="flex-col space-y-2">

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm" htmlFor="myCheckbox">All countries</label>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm" htmlFor="myCheckbox">Selected countries</label>
                    </div>

                  </div>

                  <div className="flex-col space-y-4 pt-1">
                    <div className="">

                      <div className="flex space-x-3 items-center mt-3">
                        <div className="relative w-full">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                              </svg>
                          </div>
                          <input type="search" id="default-search" className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search countries..." required />
                        </div>
                        <button onClick={() => handleOpenCountry("sm")} className="py-2 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Browse</button>
                      </div>

                      <div className="mt-2">
                        {addedCountries.map(({ name, flags, index }) => (
                          <div key={index} className="flex mt-2 justify-between items-center border rounded-md py-2 px-3 text-sm text-gray-700">
                            
                            <div className="flex space-x-3">
                              <div className="border border-gray-300 rounded-md items-center my-auto p-1">
                                <img
                                  src={flags.svg}
                                  alt={name}
                                  className="h-5 w-5"
                                />
                              </div>
                              <div className="flex-col">
                                <h3 className="font-semibold">{name}</h3>
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
                        handler={handleOpenCountry}
                      >
                        <DialogHeader className="bg-gray-100 flex justify-between">
                          <div className="text-sm">
                            Add countries
                          </div>
                          <div>
                            <IoCloseSharp onClick={() => handleOpenCountry(null)} className='text-lg cursor-pointer'/>
                          </div>
                        </DialogHeader>
                        <DialogBody className="py-0">

                          <div className="relative w-full py-3 ">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                              </svg>
                            </div>
                            <input name="searchCountries" value={searchCountries} onChange={handleCountry} type="search" id="default-search" className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search countries..." required />
                          </div>

                          {filteredCountries.map(({ name, flags, index }) => (
                            <div key={index} className="flex justify-between items-center border-t border-b py-2 text-sm text-gray-700">

                              <div className="flex space-x-2 items-center">
                                <input 
                                  checked={selectedValue === name}
                                  value={name}
                                  onChange={handleRadioChange}
                                  type="checkbox" id="myCheckbox" 
                                  className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                                <label className="text-sm" htmlFor="myCheckbox">
                                  <div className="flex space-x-3">
                                    <div className="border border-gray-300 rounded-md items-center my-auto p-1">
                                      <img
                                        src={flags.svg}
                                        alt={name}
                                        className="h-5 w-5"
                                      />
                                    </div>
                                    <div className="flex-col">
                                      <h3 className="font-semibold">{name}</h3>
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
                            onClick={() => handleOpenCountry(null)}
                            className="mr-1 border shadow-md border-gray-600 py-1 px-2"
                          >
                            <span className="text-gray-700">Cancel</span>
                          </Button>
                          <Button
                            variant="text"
                            color="gray"
                            onClick={(e) => addCountry(e)}
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

                  <h1 className="text-sm font-semibold">Shipping rates</h1>

                  <div className="flex space-x-2 items-center">
                    <input type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                    <label className="text-sm font-medium" htmlFor="myCheckbox">Exclude shipping rates over a certain amount</label>
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
                    
                  </div>

                </div>
              </CardBody>
            </Card>}


            {type === 'shipping' && <Card className="w-full flex-col">
              <CardBody className="px-4">
                <div className="flex-col space-y-3">
                  
                  <h1 className="text-sm text-gray-900 font-semibold">Minimum purchase requirements</h1>

                  <div className="flex flex-col space-y-2">

                    <div className="flex space-x-2 items-center">
                      <input defaultChecked type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">No minimum requirements</label>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">Minimum purchase amount (Rs)</label>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <input type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">Minimum quantity of items</label>
                    </div>

                  </div>


                </div>
              </CardBody>
            </Card>}


            <Card className="w-full flex-col">
              <CardBody className="px-4">
                <div className="flex-col space-y-3">
                  
                  <h1 className="text-sm text-gray-900 font-semibold">Customer eligibility</h1>

                  <div className="flex flex-col space-y-2">

                    <div className="flex space-x-2 items-center">
                      <input name="allCustomers" onChange={handleChange} checked={allCustomers} defaultChecked type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">All customers</label>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <input name="specificCustomerSegments" onChange={handleChange} checked={specificCustomerSegments} type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">Specific customer segments</label>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <input name="specificCustomers" onChange={handleChange} checked={specificCustomers} type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">Specific customers</label>
                    </div>

                  </div>


                </div>
              </CardBody>
            </Card>
            
            <Card className="w-full flex-col">
              <CardBody className="px-4">
                <div className="flex-col space-y-3">
                  
                  <h1 className="text-sm text-gray-900 font-semibold">Maximum discount uses</h1>

                  <div className="flex flex-col space-y-2">

                    <div className="flex space-x-2 items-center">
                      <input value={limitTimes} name="limitTimes" onChange={handleChange} type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">Limit number of times this discount can be used in total</label>
                    </div>

                    <div className="flex space-x-2 items-center">
                      <input value={limitPerCustomer} name="limitPerCustomer" onChange={handleChange} type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">Limit to one use per customer</label>
                    </div>
                    
                  </div>

                </div>
              </CardBody>
            </Card>

            <Card className="w-full flex-col">
              <CardBody className="px-4">
                <div className="flex-col space-y-1">
                  
                  <h1 className="text-sm text-gray-900 font-semibold">Combinations</h1>
                  <h1 className="text-sm font-medium tracking-tight">This product discount can be combined with:</h1>

                  <div className="flex pt-3 flex-col space-y-2">

                    <div className="flex space-x-2 items-center">
                      <input name="productDiscount" value={productDiscount} onChange={handleChange} defaultChecked type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">Product discounts</label>
                    </div>

                    {type === 'buyXgetY' || type === 'moneyOffOrder' && <div className="flex space-x-2 items-center">
                      <input name="otherDiscount" value={otherDiscount} onChange={handleChange} type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">Order discounts</label>
                    </div>}

                    <div className="flex space-x-2 items-center">
                      <input name="shippingDiscount" value={shippingDiscount} onChange={handleChange} type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">Shipping discounts</label>
                    </div>

                  </div>

                </div>
              </CardBody>
            </Card>

            <Card className="w-full flex-col">
              
              <CardBody className="px-4">

                <div className="flex-col space-y-5">

                  <h1 className="text-sm text-gray-900 font-semibold">Active Dates</h1>

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
                          <input value={startDate} name='startDate' onChange={handleChange} type="date" className="bg-white ps-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-[6px] px-2 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
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
                          <select value={startTime} name='startTime' onChange={handleChange} id="time" className="bg-white ps-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                          <input value={endDate} name='endDate' onChange={handleChange} type="date" className="bg-white ps-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-[6px] px-2 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
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
                          <select value={endTime} name='endTime' onChange={handleChange} id="time" className="bg-white ps-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
          <div className="w-full lg:w-1/3 flex-col space-y-5">

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
                      <li>{label}</li>
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
                      <input type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm" htmlFor="myCheckbox">Point of sales</label>
                    </div>

                  </div>

                </div>
              </CardBody>
            </Card>


            

          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button type="button" className="py-1 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Discard</button>
          <button onClick={(e)=>handleSubmit(e)} type="button" className="py-1 px-3 text-sm font-medium text-white focus:outline-none bg-gray-800 rounded-lg border border-gray-400 hover:bg-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100">Save discount</button>
        </div>

        
      </div>
    </div>
  );
}
