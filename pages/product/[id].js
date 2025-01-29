import { useRouter } from 'next/router';
import axios from "axios"
import Button from '../ui-components/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from 'next/image';
import { addToCart } from '@/functions/basketfunctions';
import { useSession } from 'next-auth/react';
export default function ProductDetail({ product }) {
  const router = useRouter();
const {data:session}=useSession()

 

  return (
    <div className='flex flex-col gap-[20px]'>
      <div className='flex p-[10px] items-center justify-start gap-[20px] h-[40px] bg-white border-b-[2px] border-[#F6F7FA]  '>
        <ArrowBackIcon onClick={() => { router.back() }} className='text-black' />
        <h1 className='text-black font-bold'>Product detail</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className='p-[30px]'>
          <Image
            src={product.file}
            width={500}
            height={300}
            priority
          />
        </div>
        <div className='flex flex-col justify-center p-[20px] gap-[20px]'>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-4 text-lg">{product.description}</p>
          <p className="mt-2 text-xl font-semibold">{product.price} $</p>
          <Button text="Add to cart" onClick={(e)=>{addToCart(e,product._id,1,session)}} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {

    const response = await axios.get(`https://technostore-1.onrender.com/products/${id}`);
    const product = await response.data;

    if (!product) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true, 
    };
  }
}