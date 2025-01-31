import Input from "../ui-components/Input";
import { useDispatch } from "react-redux";
import { searchProduct } from "@/redux/productSlice";
export default function SearchProduct(){
    const dispatch=useDispatch()
    const search=(e)=>{
        dispatch(searchProduct({value:e.target.value}))
    }
    return <div className="fixed top-[50px] left-0 z-[999] w-full  bg-white items-center pt-[10px] p-[20px]">
         <Input type="text" placeholder="Search product" onChange={(e)=>{search(e)}} />
    </div>
}