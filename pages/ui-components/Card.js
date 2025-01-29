import Link from "next/link";
import Button from "./Button";
import { useSession } from 'next-auth/react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from "react";
import { addToCart } from "@/functions/basketfunctions";
import { addFavorite } from "@/functions/addfavoritefunction";
export default function Card({ product }) {
  const { data: session } = useSession();
  const [favoriteProducts, setFavoriteProducts] = useState(typeof window != 'undefined' ? JSON.parse(localStorage.getItem("favorites")) : [])


  return (
    <Link href={`/product/${product?._id}`}
      className="relative w-full flex  flex-col gap-[10px] h-[320px] bg-white rounded-[7px]">
      <FavoriteIcon
        onClick={(e) => { addFavorite(e, product._id, setFavoriteProducts) }}
        className={`
        absolute 
        top-1 
        right-1 
        bg-white
        rounded-full
        w-[30px]
        h-[30px] 
        p-1 ${favoriteProducts.includes(product._id) ? "text-red-600" : ""} `
        } />
      <div className="
        w-full
        h-[50%] 
        flex 
        justify-center 
        items-center
        pt-[10px]">
        <img
          src={product?.file}
          alt={product?.name}
          className="w-full h-full  rounded-[5px]"
        />
      </div>
      <div className="flex flex-col gap-[10px] p-[10px]">
        <h1 className="text-lg font-semibold truncate text-black">
          {product?.name}
        </h1>

        <span className="text-md font-medium text-black font-bold">{product?.price} $</span>
        <Button
          text="Add to cart"
          onClick={(e) => { addToCart(e, product?._id, session) }}
        />
      </div>
    </Link>

  );
}