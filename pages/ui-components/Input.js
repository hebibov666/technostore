export default function Input({type,placeholder,value,onChange}){
    return(
        <input 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        className="outline-none border-[1px] border-gray-500 w-full p-[5px] rounded-[5px] h-[40px] focus:border-[#DC143C]"
    />
    )
}