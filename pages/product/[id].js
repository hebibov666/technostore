import { useRouter } from 'next/router';
import axios from "axios"
import Button from '@/ui-components/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { addToCart } from '@/functions/basketfunctions';
import { useSession } from 'next-auth/react';
import ModalImage from 'react-modal-image';
export default function ProductDetail({ product }) {
  const router = useRouter();
const {data:session}=useSession()

  return (
    <div className='relative flex flex-col gap-[20px]'>
      <div className='fixed top-0 left-0 w-full flex p-[10px] items-center justify-start gap-[20px] h-[40px] bg-white border-b-[2px] border-[#F6F7FA]  '>
        <ArrowBackIcon onClick={() => { router.back() }} className='text-black' />
        <h1 className='text-black font-bold'>Product detail</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-white pt-[40px]">
        <div className='p-[30px] bg-white flex justify-center items-center'>
        <ModalImage
        small={product.file}
        large={product.file} 
        alt={product.name} 
        className="cursor-pointer" 
      />
        </div>
        <div className='flex flex-col justify-center p-[20px] gap-[20px]'>
          <h1 className="text-2xl font-bold text-black">{product.name}</h1>
          <p className="mt-4 text-lg text-black">{product.description}</p>
          <p className="mt-2 text-xl font-semibold text-black">{product.price} $</p>
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