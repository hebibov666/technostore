import Header from './components/Header';
import { useSelector } from "react-redux";
import Products from './components/Products';
import Category from "./components/Category"
import MyBasket from "./components/MyBasket";
import MySlider from './components/Slider';
import Footer from './components/Footer';


export default function HomePage(){
    const {sidebar,basket} = useSelector((state) => state.categories);
    return(
        <div className='bg-[#F6F7FA] min-h-[100vh] h-auto'>
<Header/>
<MySlider/>
{sidebar&& <Category/>}
{basket && <MyBasket/>}
<Products/>
<Footer/>
        </div>
    )
}