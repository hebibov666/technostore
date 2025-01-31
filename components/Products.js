import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from '@/redux/productSlice';
import Card from '../ui-components/Card';
import CardSkeleton from '../ui-components/CardSkeleton';
import SyncProblemIcon from '@mui/icons-material/SyncProblem';
export default function Products() {
  const [skip,setSkip]=useState(10)
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
 
if(error){
  return (
    <div className="w-full h-[300px] flex items-center justify-center">
   <div className='flex items-center flex-col gap-[10px]'>
   <SyncProblemIcon fontSize='large' className='text-red-600'/>
   <p className='text-black font-bold'>Something went wrong</p>
   </div>
    </div>
)
}
if(products.length<=0){
  return(
    <div className='w-full h-full pb-[70px] flex items-center justify-center'>
    <div className='flex flex-col items-center gap-[30px]'>
    <img src='./noproduct.webp' className='w-[50%] h-auto'></img>
    <h1 className='text-black'>No product</h1>
    </div>
    </div>
  )
}

  return (
    <div className='flex flex-col items-center gap-[20px] pb-[50px]'>
    <div className="w-full  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 p-[10px] gap-[10px] place-items-center">
      {products.slice(0,skip).map((product, index) => (
        <Card key={index} product={product} />
      ))}
    </div>
    <button 
    onClick={()=>{setSkip(skip+10)}} 
    className={`${skip>products.length ? "hidden" : "flex"} 
    bg-black 
    text-white 
    w-[100px] 
    flex 
    items-center 
    justify-center
    p-[10px] 
    rounded-[3px]`}>
        Load more
      </button>
   </div>
  );
}
