export default function Footer(){
    return (
        <div className="w-full flex-wrap bg-[#212121] pt-[50px] p-[30px] h-auto flex justify-start gap-[50px]">
        <div className="flex flex-col items-start gap-[5px] ">
        <h1 className="font-bold text-[#F6F7FA] underline">About us</h1>
            <a href="#" className="text-white">Contact us</a>
            <a href="#" className="text-white">About us</a>
            <a href="#" className="text-white">Careers</a>
            <a href="#" className="text-white">Press</a>
        </div>
        <div className="flex flex-col items-start gap-[5px] ">
            <h1 className="font-bold text-[#F6F7FA] underline">Help</h1>
            <a href="#" className="text-white">Payments</a>
            <a href="#" className="text-white">Shipping</a>
            <a href="#" className="text-white">Returns</a>
            <a href="#" className="text-white">Faq</a>
        </div>
        <div className="flex flex-col items-start gap-[5px] ">
        <h1 className="font-bold text-[#F6F7FA] underline">Policy</h1>
            <a href="#" className="text-white">Terms of use</a>
            <a href="#" className="text-white">Security</a>
            <a href="#" className="text-white">Privacy</a>
            <a href="#" className="text-white">Sitemap</a>
        </div>
        </div>
    )
}