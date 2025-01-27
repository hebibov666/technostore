import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { useDispatch} from 'react-redux';
import { openSidebar,openBasket } from '@/redux/slice';
import { useSession } from 'next-auth/react';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
export default function Header(){
    const { data: session } = useSession();
    const dispatch=useDispatch()
    return(
        <div className="fixed top-0 left-0 z-[999] bg-white w-full h-[50px] p-[10px] flex justify-between items-center">
           <div className='flex gap-[20px] items-center'>
           <WidgetsIcon onClick={()=>{dispatch(openSidebar())}} className='text-black'/>
            <h1 className='text-[#8A2BE2] text-[25px] font-bold'>TechnoStore</h1>
           </div>
        <div className='flex gap-[10px] items-center'>
          <ShoppingBasketIcon onClick={()=>{dispatch(openBasket())}} fontSize='medium' className='text-[#808080]'/>
       {session?.user? 
       <Link href="./user/profile">
        <img src='./user.png' className='w-[50px] h-[50px]'></img>
       </Link>
       :
       <Link href="./user/login">
       <AccountCircleIcon fontSize='medium' className='text-[#808080]'/>
       </Link>
    }
        </div>
        </div>
    )
}