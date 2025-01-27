import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
export default function MySlider() {
  const images=[
    "./banner1.avif",
    "./banner2.avif",
    "./banner3.jpg"
  ]
  const settings={
    dots:false,
    speed:1000,
    slideToShow:1,
    slideToScroll:1,
    initialSlide:0,
    autoplay:true
  }
  return (
 <div className="pt-[60px] h-auto p-[5px] overflow-hidden max-[600px]:max-w-[100vw]">
  <Slider {...settings}>
{images.map((image,index)=>{
  return <div className="w-full aspect-[16/5] rounded-[10px]  relative">
    <img src={image} alt="" key={index} className="w-full h-full object-cover rounded-[10px]"/>
  <div className="w-full h-full absolute top-0 left-0 bg-[#0a0a0a30] "></div>
  </div>
})}
</Slider>
 </div>
  );
}
