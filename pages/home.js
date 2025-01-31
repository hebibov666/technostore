import Header from '@/components/Header';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Products from '@/components/Products';
import Category from "@/components/Category"
import MyBasket from "@/components/MyBasket";
import MySlider from '@/components/Slider';
import Footer from '@/components/Footer';
import SearchProduct from '@/components/SearchProduct';
import Profile from '@/components/profile';
export default function HomePage(){
    const {sidebar,basket} = useSelector((state) => state.categories);
    const [viewProfile,setViewProfile]=useState(false)
    return(
        <div className='bg-[#F6F7FA]'>
<Header setViewProfile={setViewProfile}/>
<SearchProduct/>
<MySlider/>
{viewProfile && <Profile setViewProfile={setViewProfile}/>}
{sidebar&& <Category/>}
{basket && <MyBasket/>}
<Products/>
<Footer/>
        </div>
    )
}