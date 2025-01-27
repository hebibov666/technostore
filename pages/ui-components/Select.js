import { useState } from "react"
export default function Select({ text, items, onClick, itemKey }) {
    const [dropdown, setDropdown] = useState(false)
    const [item, setItem] = useState("")
    return (
        <div className="w-full flex flex-col gap-[10px]">
            <div onClick={() => { setDropdown(dropdown ? false : true) }} className="outline-none border-[1px] border-gray-500 w-full p-[5px] rounded-[5px] h-[40px] focus:border-[#DC143C]">
                <h1>{item ? item : text}</h1>
            </div>
            <div className={`${dropdown ? "flex flex-col" : "hidden"} overflow-y-scroll h-[200px] w-full border-[1px] border-gray-500 p-[5px] rounded-[5px]`}>
                {items?.map((item, index) => {
                    return <span
                        key={index}
                        className={`flex items-center h-[40px] w-full hover:bg-[#F6F7FA] p-[5px]`}
                        onClick={() => {
                            setDropdown(false)
                            setItem(item.name);
                            onClick(item[itemKey]);
                        }}
                    >
                        {item.name}
                    </span>
                })}
            </div>

        </div>
    )
}
