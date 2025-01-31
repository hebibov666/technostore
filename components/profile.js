import { useSession } from "next-auth/react"
import CloseIcon from '@mui/icons-material/Close';
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
export default function Profile({ setViewProfile }) {
    const { data: session } = useSession()
    const router=useRouter()
    if (router.pathname === "/user/profile") {
        // Belirli bir yol (URL) varsa, bileşeni render etmeyin
        return null;
      }
    return (
        <div className="
             fixed
             rounded-l-[10px]  
             shadow-md 
             shadow-[#F6F7FA]
             z-[999]
             top-0 
             right-0 
             bg-white
             p-[10px]
             pt-[50px]
             w-[200px]">
            <div className="
             flex 
             flex-col
             gap-[10px]">
                <div className="flex flex-col gap-[10px] bg-[#F6F7FA] p-[10px] rounded-[5px]">
                    <h1 className="text-black font-bold">{session?.user?.name}</h1>
                    <p className="text-black">{session?.user?.phone}</p>
                    <CloseIcon
                        onClick={() => { setViewProfile(false) }}
                        fontSize="medium"
                        className="text-black absolute top-2 right-2 bg-[#f6f7fa] w-[30px] h-[30px] p-[5px] rounded-full"
                    />
                </div>
                <ul className="flex flex-col gap-[10px]">
                    <li className="text-black hover:bg-[#F6F7FA] p-[5px] rounded-[5px]">My orders</li>
                    <li className="text-black hover:bg-[#F6F7FA] p-[5px] rounded-[5px]">Payments</li>
                    <li className="text-black hover:bg-[#F6F7FA] p-[5px] rounded-[5px]">Update profile</li>
                    <li onClick={()=>{signOut({callbackUrl:"/"})}} className="text-red-600 font-bold hover:bg-[#F6F7FA] p-[5px] rounded-[5px]">Log out</li>
                </ul>
            </div>
        </div>
    )
}