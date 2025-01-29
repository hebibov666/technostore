import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from "react-redux";
import Card from '../ui-components/Card';
import { getProducts } from '@/redux/productSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
export default function FavoriteProducts() {
  const { products } = useSelector((state) => state.products);
  const favorites=typeof window!="undefined" ? JSON.parse(localStorage.getItem("favorites")) : []
  const dispatch = useDispatch();
  const router=useRouter()
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  
  const favoriteProducts = products.filter(product => favorites.includes(product._id));


  return (
    <div className='flex items-center flex-col w-full'>
        <div className='fixed top-0 left-0 z-[999] w-full flex p-[10px] items-center justify-start gap-[20px] h-[40px] bg-white border-b-[2px] border-[#F6F7FA]  '>
        <ArrowBackIcon onClick={() => { router.back() }} className='text-black' />
        <h1 className='text-black font-bold'>Favorites</h1>
      </div>
      {favoriteProducts.length > 0 ?   <div className="w-full pt-[40px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 p-[10px] gap-[10px] place-items-center pb-[50px]">
      {favoriteProducts.map((product, index) => (
        <Card key={index} product={product}/>
      ))}
    </div> : <div className=' w-full h-[100vh] flex flex-col justify-center items-center gap-[30px]'>
<h1 className='text-black text-center'>Favorites is empty</h1>
</div>}
    </div>
  );
}
