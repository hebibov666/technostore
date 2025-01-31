export default function Button({text,type,onClick}){
    return(
        <button
         className="w-full bg-[#8A2BE2] text-white font-bold p-[5px] rounded-[5px] h-[40px]"
         type={type}
         onClick={onClick}
         >
{text}
         </button>
    )
}