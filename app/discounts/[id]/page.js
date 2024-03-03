"use client"
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'

const Page = () => {

  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const type = searchParams.get('type');
  console.log(id);
  console.log(type);

  

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

  return (
    <div>
      <div>{id}</div>
    </div>
  )
}

export default Page