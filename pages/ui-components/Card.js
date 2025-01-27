import Link from "next/link";
import Button from "./Button";
import axios from "axios";
import { useSession } from 'next-auth/react';
import { toast } from "react-hot-toast";
export default function Card({ product }) {
  const { data: session } = useSession();
  const addToCart=(e,productId,quantity=1)=>{
    e.preventDefault()
   if(session){
    const payload={
      userId:session.user.id,
      productId:productId,
      quantity:quantity
    }
    try{
const res=axios.post("http://localhost:3001/addtocart",payload)
console.log(res.data)
toast.success('The product added to the cart');
    }
    catch(error){
      console.log(error)
      toast.error('Product not added to he cart!');
    }
   }else{
    toast.error("Sign in to add a product")
   }
  }
    return (
        <Link href={`/product/${product?._id}`} className="w-full flex  flex-col gap-[10px] h-[320px] bg-white rounded-[7px]">
        <div className="w-full h-[50%] flex justify-center items-center pt-[10px]">
          <img
            src={product?.file}
            alt={product?.name}
            className="w-full h-full  rounded-[5px]"
          />
        </div>
        <div className="flex flex-col gap-[10px] p-[10px]">
          <h1 className="text-lg font-semibold truncate text-black">{product?.name}</h1>
        
         <span className="text-md font-medium text-black font-bold">{product?.price} $</span>
      
         
          <Button text="Add to cart" onClick={(e)=>{addToCart(e,product?._id)}}/>
        </div>
      </Link>

    );
  }