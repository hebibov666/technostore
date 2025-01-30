import Header from './components/Header';
import { useSelector } from 'react-redux';
import Products from './components/Products';
import Category from "./components/Category"
import MyBasket from "./components/MyBasket";
import MySlider from './components/Slider';
import Footer from './components/Footer';
import SearchProduct from './components/SearchProduct';


export default function HomePage(){
    const {sidebar,basket} = useSelector((state) => state.categories);
    return(
        <div className='bg-[#F6F7FA]'>
<Header/>
<SearchProduct/>
<MySlider/>
{sidebar&& <Category/>}
{basket && <MyBasket/>}
<Products/>
<Footer/>
        </div>
    )
}