import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from '@/redux/productSlice';
import Card from '../ui-components/Card';
import CardSkeleton from '../ui-components/CardSkeleton';

export default function Products() {
  const { products, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

if(loading){
    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 p-[10px] gap-[10px] place-items-center">
           {Array(10).fill().map((_, index) => (
        <CardSkeleton key={index}/>
      ))}
        </div>
    )
}
 
if(products.length<=0){
  return(
    <div className='w-full h-full flex items-center justify-center'>
    <div className='flex flex-col items-center gap-[30px]'>
    <img src='./noproduct.webp' className='w-[50%] h-auto'></img>
    <h1 className='text-black'>No product in this category</h1>
    </div>
    </div>
  )
}

  return (
    <div className="w-full  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 p-[10px] gap-[10px] place-items-center">
      {products.map((product, index) => (
        <Card key={index} product={product} />
      ))}
    </div>
   
  );
}
