"use client"

import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
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
} from "@material-tailwind/react";
import { AiOutlinePercentage } from "react-icons/ai";

import { IoCloseSharp, IoImageOutline } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa6";
import { useCountries } from "use-react-countries";
import { useRouter } from "next/navigation";
import moment from 'moment/moment';
import { nanoid, customAlphabet } from 'nanoid'


export const dynamic = "force-dynamic"

export default function NewDiscount() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const type = searchParams.get('type');



  const [discountCode, setDiscountCode] = useState('');
  const [discountTitle, setDiscountTitle] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [discountType, setDiscountType] = useState('Percentage')
  const [appliesTo, setAppliesTo] = useState('Specific Collections');

  const [noMinimumRequirements, setNoMinimumRequirements] = useState(true);

  const [minimumPurchasechqbox, setMinimumPurchasechqbox] = useState(false);
  const [minimumPurchaseAmount, setMinimumPurchaseAmount] = useState('');

  const [minimumQuantitychqbox, setMinimumQuantitychqbox] = useState(false);
  const [minimumQuantityOfAmount, setMinimumQuantityOfAmount] = useState('');

  const [allCustomers, setAllCustomers] = useState(true);
  const [specificCustomerSegments, setSpecificCustomerSegments] = useState(false);

  const [specificCustomerschq, setSpecificCustomerschq] = useState(false);
  const [specificCustomers, setSpecificCustomers] = useState([]);

  const [limitTimes, setLimitTimes] = useState(false);
  const [limitTimeschq, setLimitTimeschq] = useState(false);
  const [limitPerCustomer, setLimitPerCustomer] = useState(false);
  const [otherDiscount, setOtherDiscount] = useState(false);
  const [shippingDiscount, setShippingDiscount] = useState(false);
  const [productDiscount, setProductDiscount] = useState(false)

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {

    if(id){
      const fetchDiscount = async () => {
        const res = await fetch(`/api/discount?${id}`);
        const discountData = await res.json();


        setDiscountCode(discountData.discountCode);
        setCollections(discountData.collections);
        setDiscountValue(discountData.discountValue);
        setDiscountType(discountData.discountType);
        setAppliesTo(discountData.appliesTo);

        setNoMinimumRequirements(discountData.noMinimumRequirements);
        setMinimumPurchasechqbox(discountData.minimumPurchasechqbox);
        setMinimumPurchaseAmount(discountData.minimumPurchaseAmount);
        setMinimumQuantityOfAmount(discountData.minimumQuantityOfAmount);
        setMinimumQuantitychqbox(discountData.minimumQuantitychqbox);
        setAllCustomers(discountData.allCustomers);
        setSpecificCustomerSegments(discountData.specificCustomerSegments);

        setSpecificCustomerschq(discountData.specificCustomerschq);
        setSpecificCustomers(discountData.specificCustomers);

        setLimitTimes(discountData.limitTimes);
        setLimitTimeschq(discountData.limitTimeschq);
        setLimitPerCustomer(discountData.limitPerCustomer);
        setOtherDiscount(discountData.otherDiscount);
        setShippingDiscount(discountData.shippingDiscount);
        setProductDiscount(discountData.productDiscount);

        setStartDate(discountData.startDate);
        setEndDate(discountData.endDate);
        setStartTime(discountData.startTime);
        setEndTime(discountData.endTime);
      };
      fetchDiscount();
    }
    
  }, [id])
  

  const { countries } = useCountries();
  const handleOpenCountry = (value) => setSize(value);


  const [searchCollection, setSearchCollection] = useState('')
  const [collections, setCollections] = useState([])
  const [dbCollections, setDbCollections] = useState([])

  const [searchProduct, setSearchProduct] = useState('')
  const [products, setProducts] = useState([])
  const [dbProducts, setDbProducts] = useState([])
  
  
  const [searchCustomer, setSearchCustomer] = useState('')
  const [customers, setCustomers] = useState([])
  const [dbCustomers, setDbCustomers] = useState([])







  
  const [searchCountries, setSearchCountries] = useState('')
  const [addedCountries, setAddedCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState(countries)
  

  const handleSearch = (e)=>{
    if(e.target.name === 'searchCollection'){
      setSearchCollection(e.target.value)
    }
    else if(e.target.name === 'searchProduct'){
      setSearchProduct(e.target.value)
    }
    else if(e.target.name === 'searchCustomer'){
      setSearchCustomer(e.target.value)
    }
    else if(e.target.name === 'searchCountries'){
      setSearchCountries(e.target.value)
    }
  }
  

  const [selectedValue, setSelectedValue] = useState('');
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };
  

  useEffect(() => {
      
    const newCollections = dbCollections?.filter((item)=>{
      return item.title.toLowerCase().includes(searchCollection.toLowerCase());
    });
    setDbCollections(newCollections);

    const newProducts = dbProducts?.filter((item)=>{
      return item.title.toLowerCase().includes(searchProduct.toLowerCase());
    });
    setDbProducts(newProducts);

    const newCustomers = dbCustomers?.filter((item)=>{
      return item.email.toLowerCase().includes(searchCustomer.toLowerCase());
    });
    setDbCustomers(newCustomers);

  }, [searchCollection, searchProduct, searchCustomer])



  useEffect(() => {

    const fetchData = async () => {

      
      const collectionRes = await fetch(`/api/products/collections`);
      const dbcollections = await collectionRes.json();
      setDbCollections(dbcollections);
      
      
      const productsRes = await fetch(`/api/products?fields=title,status,variants,createdAt,updatedAt,vendor,category,media`);
      const dbProducts = await productsRes.json();
      setDbProducts(dbProducts);
      

      const customerRes = await fetch(`/api/customers`);
      const dbCustomers = await customerRes.json();
      setDbCustomers(dbCustomers);

    };
    fetchData();

  }, [])
  


  useEffect(() => {
    
    const newCollections = countries.filter((item)=>{
      return item.name.toLowerCase().includes(searchCountries.toLowerCase());
    });
    setFilteredCountries(newCollections)

  }, [searchCountries])


  


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

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    switch (name) {
      case 'discountCode':
        setDiscountCode(value);
        break;
      case 'discountTitle':
        setDiscountTitle(value);
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
        setMinimumPurchasechqbox(false);
        setMinimumQuantitychqbox(false);
        break;

      case 'minimumPurchasechqbox':
        setMinimumPurchasechqbox(checked);
        setNoMinimumRequirements(false);
        setMinimumQuantitychqbox(false);

        break;

      case 'minimumQuantitychqbox':
        setMinimumQuantitychqbox(checked);
        setMinimumPurchasechqbox(false);
        setNoMinimumRequirements(false);
        break;


      case 'minimumPurchaseAmount':
        setMinimumPurchaseAmount(value);
        break;
        
      case 'minimumQuantityOfAmount':
        setMinimumQuantityOfAmount(value);
        break;

      
      case 'allCustomers':
        setAllCustomers(checked);
        setSpecificCustomerschq(false);
        break;
      case 'specificCustomerschq':
        setSpecificCustomerschq(checked);
        setAllCustomers(false);
        break;

      case 'specificCustomerSegments':
        setSpecificCustomerSegments(checked);
        break;
      case 'specificCustomers':
        setSpecificCustomers(value);
        break;
      case 'limitTimes':
        setLimitTimes(value);
        break;
      case 'limitTimeschq':
        setLimitTimeschq(checked);
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

    const data = { status: 'Active', code:'code', used: 0, discountCode, discountValue, discountType, appliesTo, collections, noMinimumRequirements, minimumPurchaseAmount, minimumQuantityOfAmount, allCustomers, specificCustomerSegments, specificCustomers, limitTimes, limitPerCustomer, otherDiscount, shippingDiscount, startDate, endDate, startTime, endTime, type };

    try {
      
      const res = await fetch(`/api/discount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const response = await res.json();
        router.push('/discounts')
      } else {
        console.error('Failed to send data to API');
      }
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };



  const [openCollectionModal, setOpenCollectionModal] = useState(false)
  const [openProductModal, setOpenProductModal] = useState(false)
  const [openCustomerModal, setOpenCustomerModal] = useState(false)
  const [openDiscountModal, setOpenDiscountModal] = useState(false)
  const cancelButtonRef = useRef(null)

  const [discountMethod, setDiscountMethod] = useState('discountCode')

  const [selectedCollections, setSelectedCollections] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([])
  const [selectedCustomers, setSelectedCustomers] = useState([])

  const handleCheckBox = (event, item, type) => {
    const isChecked = event.target.checked;

    if(type === 'Collections'){
      if (isChecked) {
        // Add the selected item to the array
        setSelectedCollections([...selectedCollections, item]);
      } else {
        // Remove the deselected item from the array
        setSelectedCollections(selectedCollections.filter(selectedItem => selectedItem !== item));
      }
    }
    else if(type === 'Products'){
      item.selectedVariants = []
      if (isChecked) {
        // Add the selected item to the array
        setSelectedProducts([...selectedProducts, item]);
      } else {
        // Remove the deselected item from the array
        setSelectedProducts(selectedProducts.filter(selectedItem => selectedItem !== item));
      }
    }
    
    else if(type === 'Customers'){
      if (isChecked) {
        // Add the selected item to the array
        setSelectedCustomers([...selectedCustomers, item]);
      } else {
        // Remove the deselected item from the array
        setSelectedCustomers(selectedCustomers.filter(selectedItem => selectedItem !== item));
      }
    }
    
  };

  const handleVariantCheckBox = (event, variant, item) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      if (!item.selectedVariants.includes(variant)) {
        // Variant is not already selected, add it
        item.selectedVariants.push(variant);
        setSelectedProducts([...selectedProducts, item]);
      }
    } else {
      // Remove the deselected variant from the array
      item.selectedVariants = item.selectedVariants.filter(v => v !== variant);
      setSelectedProducts([...selectedProducts.filter(p => p.id !== item.id), item]);
    }
    
  };

  const addCollection = (e) => {
    e.preventDefault();
    setCollections(selectedCollections);
    setOpenCollectionModal(false);
  }

  function removeDuplicates(array) {
    let uniqueIds = {};
    return array.filter(obj => {
      if (!uniqueIds[obj._id]) {
          uniqueIds[obj._id] = true;
          return true;
      }
      return false;
    });
  }

  const addProduct = (e) => {
    e.preventDefault();

    const uniqueArrayOfObjects = removeDuplicates(selectedProducts);
    setProducts(uniqueArrayOfObjects);
    setOpenProductModal(false);
  }
  
  const addCustomer = (e) => {
    e.preventDefault();
    setCustomers(selectedCustomers);
    setOpenProductModal(false);
  }

  const delCollection = (e, indexToDelete)=>{
    e.preventDefault();

    const newData = [...collections];
    newData.splice(indexToDelete, 1);
    setCollections(newData);
  }

  const delProducts = (e, indexToDelete)=>{
    e.preventDefault();

    const newData = [...products];
    newData.splice(indexToDelete, 1);
    setProducts(newData);
  }

  const delCustomers = (e, indexToDelete)=>{
    e.preventDefault();

    const newData = [...customers];
    newData.splice(indexToDelete, 1);
    setCustomers(newData);
  }

  const delCountries = (e, indexToDelete)=>{
    e.preventDefault();

    const newData = [...addedCountries];
    newData.splice(indexToDelete, 1);
    setAddedCountries(newData);
  }

  const generateRandomCode = () => {
    const customAlphabetGenerator = customAlphabet('123456789abcdefghijklmnopqrstuvwxyz', 12);
    const randomCode = customAlphabetGenerator();
    setDiscountCode(randomCode);
  };


  const deleteDiscount = (id)=>{
    console.log(id)
  }

  return (
    <div className="mx-0 md:mx-0 font-sans bg-gray-100 min-h-screen items-center flex flex-col">
      <div className="flex-col w-full md:max-w-5xl md:w-full flex gap-6 md:px-8 py-8">

        <div className="flex gap-3 items-center">
          <div
            onClick={()=>setOpenDiscountModal(true)}
            className="p-1 rounded-md hover:bg-black/10 transition-all"
          >
            <IoIosArrowRoundBack size={20} className="text-[#1a1a1a]" />
          </div>
          {id ?
            <Heading>{discountCode}</Heading>
            : <Heading>Create { type==='moneyOffOrder' ? 'order' : type ==='shipping' ? 'shipping' : 'product' } discount</Heading>
          }
        </div>

        <div className="flex flex-col lg:flex-row min-h-screen space-y-4 lg:space-y-0 lg:space-x-5">
          <div className="flex-col w-full lg:w-2/3 space-y-4 sm:space-y-5">

            

            <Card className="w-full rounded-none sm:rounded-xl  bg-[#ffffff] flex-col border border-gray-300">
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
                  {!id && <div>
                    <label htmlFor="discountCode" className="block text-sm font-medium leading-6 text-gray-900">
                      Method
                    </label>
                    <div className="mt-1">
                      <button onClick={()=>{setDiscountMethod('discountCode')}} className={`${discountMethod === 'discountCode' ? 'bg-[#cccccc]' : 'bg-white'} rounded-l-md shadow-inner border border-black py-2 text-xs px-3 font-medium lg:font-semibold text-black`}>Discount code</button>
                      <button onClick={()=>{setDiscountMethod('automaticDiscount')}} className={`${discountMethod === 'automaticDiscount' ? 'bg-[#cccccc]' : 'bg-white'} shadow-inner rounded-r-md border border-black py-2 text-xs px-3 font-medium lg:font-semibold text-black`}>Automatic discount</button>
                    </div>
                  </div>}

                  { discountMethod === 'discountCode' ?  <div className="mt-4">
                    <div className="flex justify-between">
                      <label htmlFor="discountCode" className="block text-sm font-medium leading-6 text-gray-900">
                        Discount code
                      </label>
                      <label onClick={generateRandomCode} htmlFor="discountCode" className="cursor-pointer block text-sm font-medium leading-6 text-blue-600">
                        Generate random code
                      </label>
                    </div>
                    <input
                      type="text"
                      name="discountCode"
                      value={discountCode}
                      onChange={handleChange}
                      id="discountCode"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <h1 className="text-sm tracking-tight mt-1">Customers must enter this code at checkout.</h1>
                  </div> 
                  : <div className="mt-4">
                    <div className="flex justify-between">
                      <label htmlFor="discountTitle" className="block text-sm font-medium leading-6 text-gray-900">
                        Title
                      </label>
                    </div>
                    <input
                      type="text"
                      name="discountTitle"
                      value={discountTitle}
                      onChange={handleChange}
                      id="discountTitle"
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <h1 className="text-sm tracking-tight mt-1">Customers will see this in their cart and at checkout.</h1>
                  </div>}

                  
                </div>

              </CardBody>
            </Card>

            {type === 'moneyOffProduct' && <Card className="w-full rounded-none sm:rounded-xl bg-[#ffffff] flex-col border border-gray-300">
              <CardBody className="px-4">

                <div className="flex-col space-y-5">

                  <div className="">
                    <label className="block text-sm font-semibold leading-6 text-gray-900">
                      Discount value
                    </label>
                    
                    <div className="flex space-x-4">
                      <select id="discountType" onChange={handleChange} name="discountType" value={discountType} className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option defaultValue='Percentage'>Percentage</option>
                        <option value="Fixed Amount">Fixed Amount</option>
                      </select>
                      <div className="w-72 flex items-center">
                        <div className="relative w-full">
                          {discountType === 'Percentage' 
                            ?<div className="absolute inset-y-0 end-0 flex items-center pe-7 pointer-events-none">
                              <AiOutlinePercentage className="text-black text-lg"/>
                            </div>
                            :<div className="absolute inset-y-0 end-0 flex items-center ps-3 pointer-events-none">
                              <FaRupeeSign  className="text-black text-lg"/>
                            </div>
                          }
                          <input
                            type="number"
                            name="discountValue"
                            value={discountValue}
                            onChange={handleChange}
                            id="discountValue"
                            className="block w-full rounded-md py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        {/* <input
                          type="number"
                          name="discountValue"
                          value={discountValue}
                          onChange={handleChange}
                          id="discountValue"
                          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <AiOutlinePercentage className="text-black text-lg"/> */}
                      </div>
                    </div>
                    
                  </div>

                  <div className="">
                    <label htmlFor="appliesTo" className="block text-sm font-semibold leading-6 text-gray-900">
                      Applies to
                    </label>
                    
                    <select name="appliesTo" onChange={handleChange} value={appliesTo} id="appliesTo" className="bg-white border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option defaultValue='Specific Collections'>Specific Collections</option>
                      <option value="Specific Products">Specific products</option>
                    </select>

                    <div className="flex space-x-3 items-center mt-3">
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                          </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-500 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-500 placeholder-gray-700 dark:text-white" placeholder={`${appliesTo === 'Specific Collections' ? 'Search collections...' :'Search products...'}`} required />
                      </div>

                        {appliesTo === 'Specific Collections' ? (
                          <button onClick={() => setOpenCollectionModal(true)} className="py-2 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-500 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Browse</button>
                        ) : (
                          <button onClick={() => setOpenProductModal(true)} className="py-2 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-500 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Browse</button>
                        )}
                      </div>

                    <div className="mt-2">
                      {appliesTo === 'Specific Collections' && (
                        collections.map((item, index) => {
                          return (
                            <div key={index} className="flex mt-2 justify-between items-center border rounded-md py-2 px-3 text-sm text-gray-700">
                              <div className="flex space-x-3">
                                <div className="border border-gray-300 rounded-md items-center my-auto p-2">
                                  <IoImageOutline className='text-xl'/>
                                </div>
                                <div className="flex-col">
                                  <h3 className="font-semibold">{item.title}</h3>
                                  <p className="">{item?.products?.length}</p>
                                </div>
                              </div>
                              <div>
                                <IoCloseSharp onClick={(e) => delCollection(e,index)} className='text-lg cursor-pointer'/>
                              </div>
                            </div>
                          );
                        })
                      )}
                      {appliesTo === 'Specific Products' && (
                        products.map((item, index) => {
                          return (
                            <div key={index} className="flex mt-2 justify-between items-center border rounded-md py-2 px-3 text-sm text-gray-700">
                              <div className="flex space-x-3">
                                <div className="border border-gray-300 rounded-md items-center my-auto p-2">
                                  <IoImageOutline className='text-xl'/>
                                </div>
                                <div className="flex-col">
                                  <h3 className="font-semibold">{item.title}</h3>
                                  <p className="">({item?.selectedVariants?.length} of {item?.variants?.length} selected)</p>
                                </div>
                              </div>
                              <div className="flex space-x-3">
                                <h3 onClick={() => setOpenProductModal(true)} className="font-medium tracking-wide text-blue-700 cursor-pointer">Edit</h3>
                                <IoCloseSharp onClick={(e) => delProducts(e,index)} className='text-lg cursor-pointer'/>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                </div>

              </CardBody>
            </Card>}

            {type === 'moneyOffOrder' && <Card className="w-full rounded-none sm:rounded-xl bg-[#ffffff] flex-col border border-gray-300">
              
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

            {type === 'buyXgetY' && <Card className="w-full rounded-none sm:rounded-xl bg-[#ffffff] flex-col border border-gray-300">

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
                            <option defaultValue="Specific Products">Specific products</option>
                            <option value='Specific Collections'>Specific collections</option>
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
                          <input type="search" id="default-search" className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={`${appliesTo ==='Specific Collections' ? 'Search collections...' : 'Search products...'}`} required />
                        </div>
                        <button onClick={() => setOpenCollectionModal(true)} className="py-2 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Browse</button>
                      </div>

                      <div className="mt-2">
                        {collections.map((item, index) => (
                          <div key={index} className="flex mt-2 justify-between items-center border rounded-md py-2 px-3 text-sm text-gray-700">
                            
                            <div className="flex space-x-3">
                              <div className="border border-gray-300 rounded-md items-center my-auto p-2">
                                <IoImageOutline className='text-xl'/>
                              </div>
                              <div className="flex-col">
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="">{item.products.length}</p>
                              </div>
                            </div>
                            <div>
                              <IoCloseSharp onClick={(e) => delCollection(e,index)} className='text-lg cursor-pointer'/>
                            </div>
                            
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>

                <div>

                  <h1 className="text-sm font-semibold">Customer gets</h1>
                  <h1 className="text-sm pt-1 tracking-tight font-medium">Customers must add the quantity of items specified below to their cart.</h1>
                  <div className="flex-col space-y-2 pt-5">

                    <div className="flex space-x-2 items-center">
                      <input checked type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
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
                            <option defaultValue="Specific Products">Specific products</option>
                            <option value='Specific Collections'>Specific collections</option>
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
                        <button onClick={() => setOpenCollectionModal(true)} className="py-2 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Browse</button>
                      </div>

                      <div className="mt-2">
                        {collections.map((item, index) => (
                          <div key={index} className="flex mt-2 justify-between items-center border rounded-md py-2 px-3 text-sm text-gray-700">
                            
                            <div className="flex space-x-3">
                              <div className="border border-gray-300 rounded-md items-center my-auto p-2">
                                <IoImageOutline className='text-xl'/>
                              </div>
                              <div className="flex-col">
                                <h3 className="font-semibold">{item.title}</h3>
                                <p className="">{item.products.length}</p>
                              </div>
                            </div>
                            <div>
                              <IoCloseSharp onClick={(e) => delCollection(e,index)} className='text-lg cursor-pointer'/>
                            </div>
                            
                          </div>
                        ))}
                      </div>
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

            {type === 'moneyOffProduct' || type === 'shipping' ? <Card className="w-full rounded-none sm:rounded-xl bg-[#ffffff] flex-col border border-gray-300">
              <CardBody className="px-4">
                <div className="flex-col space-y-3">
                  
                  <h1 className="text-sm text-gray-900 font-semibold">Minimum purchase requirements</h1>

                  <div className="flex flex-col space-y-2">

                    <div className="flex space-x-2 items-center">
                      <input onChange={handleChange} name="noMinimumRequirements" checked={noMinimumRequirements} defaultChecked type="checkbox" id="noMinimumRequirements" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">No minimum requirements</label>
                    </div>

                    <div className="flex-col space-y-2 items-center">
                      <div className="flex space-x-2 items-center">
                        <input onChange={handleChange} name="minimumPurchasechqbox" checked={minimumPurchasechqbox} type="checkbox" id="minimumPurchasechqbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                        <label className="text-sm tracking-tight" htmlFor="myCheckbox">Minimum purchase amount (Rs)</label>
                      </div>
                      {minimumPurchasechqbox === true && <div className="flex-col space-y-1 ml-3 md:ml-7">
                        <input
                          type="number"
                          name="minimumPurchaseAmount"
                          value={minimumPurchaseAmount}
                          onChange={handleChange}
                          id="minimumPurchaseAmount"
                          placeholder="0.00"
                          className="block w-1/3 rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <h1 className="text-xs tracking-tight">Applies only to selected collections.</h1>
                      </div>}
                    </div>


                    <div className="flex-col space-y-2 items-center">
                      <div className="flex space-x-2 items-center">
                        <input onChange={handleChange} name="minimumQuantitychqbox" checked={minimumQuantitychqbox} type="checkbox" id="minimumQuantitychqbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                        <label className="text-sm tracking-tight" htmlFor="myCheckbox">Minimum quantity of items</label>
                      </div>
                      {minimumQuantitychqbox === true && <div className="flex-col space-y-1 ml-3 md:ml-7">
                        <input
                          type="number"
                          name="minimumQuantityOfAmount"
                          value={minimumQuantityOfAmount}
                          onChange={handleChange}
                          id="minimumQuantityOfAmount"
                          className="block w-1/3 rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <h1 className="text-xs tracking-tight">Applies only to selected collections.</h1>
                      </div>}
                    </div>

                  </div>

                </div>
              </CardBody>
            </Card> : ''}

            {type === 'shipping' && <Card className="w-full rounded-none sm:rounded-xl bg-[#ffffff] flex-col border border-gray-300">

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
                              <IoCloseSharp onClick={(e) => delCountries(e,index)} className='text-lg cursor-pointer'/>
                            </div>
                            
                          </div>
                        ))}
                      </div>

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

            <Card className="w-full rounded-none sm:rounded-xl bg-[#ffffff] flex-col border border-gray-300">
              <CardBody className="px-4">
                <div className="flex-col space-y-3">
                  
                  <h1 className="text-sm text-gray-900 font-semibold">Customer eligibility</h1>

                  <div className="flex flex-col space-y-2">

                    <div className="flex space-x-2 items-center">
                      <input name="allCustomers" onChange={handleChange} checked={allCustomers} defaultChecked type="checkbox" id="allCustomers" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">All customers</label>
                    </div>

                    {/* <div className="flex space-x-2 items-center">
                      <input name="specificCustomerSegments" onChange={handleChange} checked={specificCustomerSegments} type="checkbox" id="myCheckbox" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">Specific customer segments</label>
                    </div> */}

                    


                    <div className="flex-col space-y-2 items-center">
                      <div className="flex space-x-2 items-center">
                        <input name="specificCustomerschq" onChange={handleChange} checked={specificCustomerschq} type="checkbox" id="specificCustomerschq" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                        <label className="text-sm tracking-tight" htmlFor="myCheckbox">Specific customers</label>
                      </div>
                      {specificCustomerschq === true && <div className="flex-col space-y-1">
                        <div className="flex space-x-3 items-center mt-3">
                          <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                              </svg>
                            </div>
                            <input type="search" id="default-search" className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search customers..." required />
                          </div>
                          <button onClick={() => setOpenCustomerModal(true)} className="py-2 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Browse</button>
                        </div>

                        <div className="mt-2">
                          {customers.map((item, index) => {
                            return <div key={index} className="flex mt-2 justify-between items-center border rounded-md py-2 px-3 text-sm text-gray-700">
                              
                              <div className="flex space-x-3">
                                <div className="border border-gray-300 rounded-md items-center my-auto p-2">
                                  <IoImageOutline className='text-xl'/>
                                </div>
                                <div className="flex-col">
                                  <h3 className="font-semibold">{item.firstName + '' + item.lastName}</h3>
                                  <p className="">{item.email}</p>
                                </div>
                              </div>
                              <div>
                                <IoCloseSharp onClick={(e) => delCustomers(e,index)} className='text-lg cursor-pointer'/>
                              </div>
                            </div>
                          })}
                        </div>

                      </div>}
                    </div>

                  </div>


                </div>
              </CardBody>
            </Card>
            
            <Card className="w-full rounded-none sm:rounded-xl bg-[#ffffff] flex-col border border-gray-300">
              <CardBody className="px-4">
                <div className="flex-col space-y-3">
                  
                  <h1 className="text-sm text-gray-900 font-semibold">Maximum discount uses</h1>

                  <div className="flex flex-col space-y-2">

                    <div className="flex space-x-2 items-center">
                      <input checked={limitTimeschq} name="limitTimeschq" onChange={handleChange} type="checkbox" id="limitTimeschq" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">Limit number of times this discount can be used in total</label>
                    </div>
                    {limitTimeschq === true && <div className="flex-col space-y-1 ml-3 md:ml-7">
                      <input
                        type="number"
                        name="limitTimes"
                        value={limitTimes}
                        onChange={handleChange}
                        id="limitTimes"
                        className="block w-1/3 rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>}

                    <div className="flex space-x-2 items-center">
                      <input checked={limitPerCustomer} name="limitPerCustomer" onChange={handleChange} type="checkbox" id="limitPerCustomer" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">Limit to one use per customer</label>
                    </div>
                    
                    
                  </div>

                </div>
              </CardBody>
            </Card>

            <Card className="w-full rounded-none sm:rounded-xl bg-[#ffffff] flex-col border border-gray-300">
              <CardBody className="px-4">
                <div className="flex-col space-y-1">
                  
                  <h1 className="text-sm text-gray-900 font-semibold">Combinations</h1>
                  <h1 className="text-sm font-medium tracking-tight">{discountCode || discountTitle || 'This product discount'} can be combined with:</h1>

                  <div className="flex pt-3 flex-col space-y-2">

                    <div className="flex space-x-2 items-center">
                      <input name="productDiscount" checked={productDiscount} onChange={handleChange} defaultChecked type="checkbox" id="productDiscount" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">Product discounts</label>
                    </div>
                    {productDiscount === true && <div className="flex-col space-y-1 ml-3 md:ml-7">
                      <h1 className="text-sm tracking-tight mt-0">If an item is eligible for multiple product discounts, only the largest will apply.</h1>
                    </div>}

                    {type === 'buyXgetY' || type === 'moneyOffOrder' && <div className="flex space-x-2 items-center">
                      <input name="otherDiscount" checked={otherDiscount} onChange={handleChange} type="checkbox" id="otherDiscount" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">Order discounts</label>
                    </div>}

                    <div className="flex space-x-2 items-center">
                      <input name="shippingDiscount" checked={shippingDiscount} onChange={handleChange} type="checkbox" id="shippingDiscount" className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black " />
                      <label className="text-sm tracking-tight" htmlFor="myCheckbox">Shipping discounts</label>
                    </div>
                    {shippingDiscount === true && <div className="flex-col space-y-1 ml-3 md:ml-7">
                      <h1 className="text-sm tracking-tight mt-0">No shipping discounts are set to combine. To let customers use more than one discount, set up at least one shipping discount that combines with product discounts.</h1>
                    </div>}

                  </div>

                </div>
              </CardBody>
            </Card>

            <Card className="w-full rounded-none sm:rounded-xl bg-[#ffffff] flex-col border border-gray-300">
              
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
                          <input value={startDate} name='startDate' onChange={handleChange} type="date" className="bg-white ps-10 border border-gray-500 text-gray-900 text-sm rounded-lg block w-full py-[6px] px-2 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
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
                          <select value={startTime} name='startTime' onChange={handleChange} id="time" className="bg-white ps-10 border border-gray-500 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value='8:10' selected>8:10 PM</option>
                            <option value='6:02'>6:02 PM</option>
                            <option value='6:30'>6:30 PM</option>
                            <option value='7:00'>7:00 PM</option>
                            <option value='7:30'>7:30 PM</option>
                            <option value='8:00'>8:00 PM</option>
                            <option value='8:30'>8:30 PM</option>
                            <option value='9:00'>9:00 PM</option>
                            <option value='9:30'>9:30 PM</option>
                            <option value='10:00'>10:00 PM</option>
                            <option value='10:30'>10:30 PM</option>
                            <option value='11:00'>11:00 PM</option>
                            <option value='11:30'>11:30 PM</option>
                            <option value='12:00'>12:00 PM</option>
                            <option value='12:30'>12:30 PM</option>
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
                          <input value={endDate} name='endDate' onChange={handleChange} type="date" className="bg-white ps-10 border border-gray-500 text-gray-900 text-sm rounded-lg block w-full py-[6px] px-2 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
                        </div>
                      </div>

                      <div className="w-1/2">
                        <label htmlFor="endTime" className="block text-sm font-medium leading-6 text-gray-900">
                          End time
                        </label>

                        <div className="relative">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <IoMdTime className='text-lg'/>
                          </div>
                          <select value={endTime} name='endTime' onChange={handleChange} id="time" className="bg-white ps-10 border border-gray-500 text-gray-900 text-sm rounded-lg block w-full p-2 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value='8:10' selected>8:10 PM</option>
                            <option value='6:02'>6:02 PM</option>
                            <option value='6:30'>6:30 PM</option>
                            <option value='7:00'>7:00 PM</option>
                            <option value='7:30'>7:30 PM</option>
                            <option value='8:00'>8:00 PM</option>
                            <option value='8:30'>8:30 PM</option>
                            <option value='9:00'>9:00 PM</option>
                            <option value='9:30'>9:30 PM</option>
                            <option value='10:00'>10:00 PM</option>
                            <option value='10:30'>10:30 PM</option>
                            <option value='11:00'>11:00 PM</option>
                            <option value='11:30'>11:30 PM</option>
                            <option value='12:00'>12:00 PM</option>
                            <option value='12:30'>12:30 PM</option>
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

            <Card className="w-full rounded-none sm:rounded-xl bg-[#ffffff] flex-col border border-gray-300">
              
              <CardBody className="px-4">
              
                <div className="flex-col space-y-5 tracking-tight">

                  <div className="flex-col space-y-2">
                    <h1 className="text-sm font-semibold">Summary</h1>
                    { id 
                      ? <h1 className="text-sm font-semibold">{discountCode}</h1>
                      : <h1 className="text-sm font-semibold">{discountMethod ==='discountCode' ? discountCode ? discountCode: 'No discount code yet' : discountMethod ==='automaticDiscount' ? discountTitle ? discountTitle : 'No title yet' : 'No discount code yet'}</h1>
                    }
                  </div>
                  <div className="flex-col space-y-2">
                    <h1 className="text-sm font-semibold">Type and method</h1>
                    <ul className="list-disc text-sm px-6">
                      <li>{label}</li>
                      <li>{discountMethod ==='discountCode' ? 'Code' : 'Automatic'}</li>
                    </ul>
                  </div>

                  <div className="flex-col space-y-2">
                    <h1 className="text-sm font-semibold">Details</h1>
                    {!discountCode && <ul className="list-disc text-sm px-6">
                      <li>Can’t combine with other discounts</li>
                    </ul>}
                    {discountCode && <ul className="list-disc text-sm px-6">
                      <li>For Online Store</li>

                      {discountValue > 0 && <li>{ discountType === 'Percentage' ? discountValue + '%' : discountValue + ' RS' } off {appliesTo === 'Specific Collections' ? collections.length > 0 ? collections[0].title : 'collections' : products.length > 0 ? products[0].title : 'products'} </li>}

                      {noMinimumRequirements === true && <li>No minimum purchase requirement</li>}
                      {minimumPurchasechqbox === true && minimumPurchaseAmount > 0 && <li>Minimum purchase of Rs {minimumPurchaseAmount}.00</li>}
                      {minimumQuantitychqbox === true && minimumQuantityOfAmount > 0 && <li>Minimum purchase of {minimumQuantityOfAmount} items </li>}


                      {allCustomers === true && <li>All customers</li>}
                      {specificCustomerschq === true && customers.length > 0 && <li>For {customers[0].firstName + '' + customers[0].lastName}</li>}

                      {limitTimeschq === false && limitPerCustomer === false && <li>No usage limits</li>}
                      {limitPerCustomer === true && <li>One use per customer</li>}
                      {limitTimeschq === true && limitTimes > 0 && <li>Limit of {limitTimes} uses</li>}

                      {productDiscount === false && shippingDiscount === false && <li>Can’t combine with other discounts</li>}
                      {productDiscount === true && shippingDiscount === false && <li>Combines with product discounts</li>}
                      {shippingDiscount === true && productDiscount === false && <li>Combines with shipping discounts</li>}
                      {shippingDiscount === true && productDiscount === true && <li>Combines with product and shipping discounts</li>}

                      {startDate && <li>Active From {moment(startDate).format('D MMM YYYY')} {endDate ? 'to ' + moment(endDate).format('D MMM YYYY') : ''}</li>}

                    </ul>}
                  </div>

                  <div className="flex-col space-y-2">
                    <h1 className="text-sm font-semibold">Performance</h1>
                    <h1 className="text-sm font-medium">Discount is not active yet</h1>
                  </div>

                </div>

              </CardBody>
            </Card>

            <Card className="w-full rounded-none sm:rounded-xl bg-[#ffffff] flex-col border border-gray-300">
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
          {id 
            ? <button type="button" onClick={(e)=>deleteDiscount(e)} className="py-1 px-3 text-sm font-medium text-white focus:outline-none bg-[#e51c00] hover:bg-[#b5260b] rounded-lg border border-gray-400  focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Delete Discount</button>
            : <button type="button" className="py-1 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-400 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Discard</button>
          }
          {id
            ? <button onClick={(e)=>handleSubmit(e)} type="button" className="py-1 px-3 text-sm font-medium text-white focus:outline-none bg-gray-800 rounded-lg border border-gray-400 hover:bg-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100">Save</button>
            : <button onClick={(e)=>handleSubmit(e)} type="button" className="py-1 px-3 text-sm font-medium text-white focus:outline-none bg-gray-800 rounded-lg border border-gray-400 hover:bg-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100">Save discount</button>
          }
          
        </div>


        <Transition.Root show={openCollectionModal} as={Fragment}>
          <Dialog as="div" className="relative z-20" initialFocus={cancelButtonRef} onClose={setOpenCollectionModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex items-end justify-center text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="w-full font-sans h-[31rem] mt-14 md:h-96 relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-3xl">
                    <div className="bg-white rounded-t-2xl sm:px-0 sm:pb-4">
                      <div className="sm:items-start w-full">
                        <div className="text-center mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="bg-gray-100 rounded-t-xl px-4 py-3 flex justify-between">
                            <div className="text-sm font-bold">
                              Add Collections
                            </div>
                            <div>
                              <IoCloseSharp onClick={() => setOpenCollectionModal(false)} className='text-lg cursor-pointer'/>
                            </div>
                          </Dialog.Title>
                          
                          <div className="relative w-full px-2 py-3">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                              </svg>
                            </div>
                            <input name="searchCollection" value={searchCollection} onChange={handleSearch} type="search" id="default-search" className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Search collections...' required />
                          </div>

                          <div className="h-[36rem] md:h-[15rem] px-4 overflow-y-scroll">
                            {dbCollections.map((item, index) => (
                              <div key={index} className="flex justify-between items-center border-t border-b py-2 text-sm text-gray-700">
                                <div className="flex w-full space-x-2 items-center">
                                  <input
                                    checked={selectedCollections.includes(item)}
                                    onChange={(event) => handleCheckBox(event, item, 'Collections' )}
                                    type="checkbox"
                                    id={item.title}
                                    className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black"
                                  />
                                  <label htmlFor={item.title} className="text-sm tracking-tight">
                                    <div className="flex space-x-3">
                                      <div className="border border-gray-300 rounded-md items-center my-auto p-2">
                                        <IoImageOutline className='text-xl'/>
                                      </div>
                                      <div className="flex-col text-left">
                                        <h3 className="font-semibold">{item.title.substring(0, 55)}</h3>
                                        <p>{item?.products?.length} products</p>
                                      </div>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>


                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-2xl w-full">
                      <div className="flex justify-end space-x-3 px-4 py-3 sm:px-6">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => setOpenCollectionModal(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md bg-gray-800 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-black sm:ml-3 sm:w-auto"
                          onClick={(e) => addCollection(e)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        <Transition.Root show={openProductModal} as={Fragment}>
          <Dialog as="div" className="relative z-20" initialFocus={cancelButtonRef} onClose={setOpenProductModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex items-end justify-center text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="w-full font-sans h-[31rem] mt-14 md:h-96 relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-3xl">
                    <div className="bg-white sm:px-0 rounded-t-2xl sm:pb-4">
                      <div className="sm:items-start w-full">
                        <div className="text-center mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="bg-gray-100 rounded-t-xl px-4 py-3 flex justify-between">
                            <div className="text-sm font-bold">
                              Add Product
                            </div>
                            <div>
                              <IoCloseSharp onClick={() => setOpenProductModal(false)} className='text-lg cursor-pointer'/>
                            </div>
                          </Dialog.Title>
                          
                          <div className="relative w-full px-2 py-3">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                              </svg>
                            </div>
                            <input name="searchProduct" value={searchProduct} onChange={handleSearch} type="search" id="default-search" className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Search products...' required />
                          </div>

                          <div className="h-[36rem] md:h-[15rem] px-3 overflow-y-scroll">
                            {dbProducts.map((item, index) => {
                              let variants = item.variants;
                              return <div key={index} className={`flex-col space-y-4 justify-between items-center border-t border-b py-2 text-sm text-gray-700`}>
                                <div className={` flex space-x-2 items-center`}>
                                  <input
                                    checked={selectedProducts.includes(item)}
                                    onChange={(event) => handleCheckBox(event, item, 'Products')}
                                    type="checkbox"
                                    id={item.title}
                                    className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black"
                                  />
                                  <label htmlFor={item.title} className="text-sm tracking-tight">
                                    <div className="flex space-x-3">
                                      <div className="border border-gray-300 rounded-md items-center my-auto p-2">
                                        <IoImageOutline className='text-xl'/>
                                      </div>
                                      <div className="flex-col text-left">
                                        <h3 className="font-semibold">{item.title.substring(0, 55)}</h3>
                                        <p className="">{item?.variants?.length} variants</p>
                                      </div>
                                    </div>
                                  </label>
                                </div>
                                {selectedProducts.includes(item) && <div className="mx-8">

                                  {variants.map((variant, index)=>{

                                    return <div key={index} className="flex py-3 w-full space-x-2 items-center">
                                    <input
                                      checked={(item.selectedVariants).includes(variant)}
                                      onChange={(event) => handleVariantCheckBox(event, variant, item)}
                                      type="checkbox"
                                      id={variant}
                                      className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black"
                                    />
                                    <label htmlFor={variant} className="w-full text-sm tracking-tight">


                                      <div className="flex w-full justify-between text-left">
                                        <div>
                                          <h3 className="font-medium">{variant.name}</h3>
                                        </div>
                                        <div className="flex space-x-6">
                                          <h3 className="font-medium">Available: {variant.inventoryLevels.length === 0 ? 0 : variant.inventoryLevels[0]?.available } Piece</h3>
                                          <p className="font-medium">RS: 90.00</p>
                                        </div>
                                      </div>


                                    </label>
                                  </div>
                                  })}
                                  
                                </div>}
                              </div>

                            })}
                          </div>


                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-b-2xl w-full">
                      <div className="flex justify-end space-x-3 px-4 py-3 sm:px-6">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => setOpenProductModal(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md bg-gray-800 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-black sm:ml-3 sm:w-auto"
                          onClick={(e) => addProduct(e)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        <Transition.Root show={openCustomerModal} as={Fragment}>
          <Dialog as="div" className="relative z-20" initialFocus={cancelButtonRef} onClose={setOpenCustomerModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex items-end justify-center text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="w-full font-sans h-[31rem] mt-14 md:h-96 relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-3xl">
                    <div className="bg-white sm:px-0 sm:pb-4 rounded-t-2xl">
                      <div className="sm:items-start w-full">
                        <div className="text-center mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="bg-gray-100 rounded-t-xl px-4 py-3 flex justify-between">
                            <div className="text-sm font-bold">
                              Add Customer
                            </div>
                            <div>
                              <IoCloseSharp onClick={() => setOpenCustomerModal(false)} className='text-lg cursor-pointer'/>
                            </div>
                          </Dialog.Title>
                          
                          <div className="relative w-full px-2 py-3 ">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                              </svg>
                            </div>
                            <input name="searchCustomer" value={searchCustomer} onChange={handleSearch} type="search" id="default-search" className="block w-full py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Search customers...' required />
                          </div>

                          <div className="h-[36rem] md:h-[15rem] px-3 overflow-y-scroll">
                            {dbCustomers.map((item, index) => (

                              <div key={index} className="flex justify-between items-center border-t border-b py-2 text-sm text-gray-700">
                                <div className="flex space-x-2 items-center">
                                  <input
                                    checked={selectedCustomers.includes(item)}
                                    onChange={(event) => handleCheckBox(event, item, 'Customers')}
                                    type="checkbox"
                                    id={item.email}
                                    className="rounded-full appearance-none w-[18px] h-[18px] border border-gray-300 checked:bg-white checked:border-4 checked:border-black focus:outline-none focus:border-black"
                                  />
                                  <label htmlFor={item.email} className="text-sm tracking-tight">
                                    <div className="flex space-x-3">
                                      <div className="border border-gray-300 rounded-md items-center my-auto p-2">
                                        <IoImageOutline className='text-xl'/>
                                      </div>
                                      <div className="flex-col text-left">
                                        <h3 className="font-semibold">{(item.firstName + '' + item.lastName).substring(0, 55)}</h3>
                                        <p className="">{item.email}</p>
                                       </div>
                                    </div>
                                  </label>
                                </div>
                                </div>

                            ))}
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-b-2xl w-full">
                      <div className="flex justify-end space-x-3 px-4 py-3 sm:px-6">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => setOpenCustomerModal(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md bg-gray-800 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-black sm:ml-3 sm:w-auto"
                          onClick={(e) => addCustomer(e)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>


        <Transition.Root show={openDiscountModal} as={Fragment}>
          <Dialog as="div" className="relative z-20" initialFocus={cancelButtonRef} onClose={setOpenDiscountModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed rounded-2xl inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex rounded-2xl min-h-screen items-end justify-center text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="w-full font-sans relative transform bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-xl">
                    <div className="bg-white rounded-t-2xl sm:px-0 sm:pb-4">
                      <div className="sm:items-start w-full">
                        <div className="text-center mt-0 sm:text-left">
                          <Dialog.Title as="h3" className="bg-gray-100 rounded-t-xl px-4 py-3 flex justify-between">
                            <div className="text-sm font-bold">
                              Leave page with unsaved changes?
                            </div>
                            <div>
                              <IoCloseSharp onClick={() => setOpenDiscountModal(false)} className='text-lg cursor-pointer'/>
                            </div>
                          </Dialog.Title>

                          <h1 className="text-sm py-5 ml-5 tracking-tight font-sans">Leaving this page will delete all unsaved changes.</h1>
                          
                          
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-b-3xl w-full border-t border-gray-200">
                      <div className="flex justify-end space-x-3 px-4 py-4 sm:px-6">
                        <button
                          type="button"
                          className="inline-flex font-sans justify-center rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => setOpenDiscountModal(false)}
                          ref={cancelButtonRef}
                        >
                          Stay
                        </button>
                        <Link
                          className="inline-flex font-sans justify-center rounded-md bg-red-800 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-900 sm:ml-3 sm:w-auto"
                          // onClick={router.push('/discounts')}
                          href={'/discounts'}
                        >
                          Leave Page
                        </Link>
                      </div>
                    </div>
                    
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        
      </div>
    </div>
  );
}
