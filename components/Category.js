import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getCategories, openSidebar } from "@/redux/slice";
import CloseIcon from '@mui/icons-material/Close';
import { getProducts } from "@/redux/productSlice";
import CircularProgress from '@mui/material/CircularProgress';
import { motion } from "framer-motion";
export default function Category() {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const dispatch = useDispatch();
  const { categories, loading, error, sidebar } = useSelector((state) => state.categories);


  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);


  const filterProductsByCategory = (categoryId) => {
    dispatch(getProducts(categoryId))
    dispatch(openSidebar())
  }

  const closeCategory = (e) => {
    e.stopPropagation()
    setActiveCategoryId(null)
  }


  const parentCategories = categories.filter((category) => category.parent === null);


  return (
    <motion.div
    initial={{ x: -300, opacity: 0 }}
      animate={{ x: sidebar ? 0 : -300, opacity: sidebar ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    className={`
          fixed 
          z-[9999] 
          top-0 
          left-0 
          bg-white 
          h-[100vh] 
          flex flex-col items-start justify-start 
          overflow-hidden
          gap-[5px]  
          w-full 
          lg:w-[30%]`}>
      <div className="
          absolute
          top-0 
          left-0
          w-full 
          flex 
          justify-between 
          items-center 
          p-[10px] 
          h-[50px] 
          bg-white 
          border-b-[2px] 
          border-[#F6F7FA]">
        <h2 className="
          text-[#8A2BE2] 
          font-bold 
          text-[18px]">
          Category
        </h2>
        <span className="
          flex 
          items-center 
          justify-center 
          w-[30px] 
          h-[30px] 
          bg-[#8A2BE2] 
          rounded-full ">
          <CloseIcon onClick={() => { dispatch(openSidebar()) }} 
          className="text-white" />
        </span>
      </div>
      <div className="overflow-scroll w-full pt-[50px]">
      {loading &&
        <div className="flex w-full pt-[50px] items-center justify-center">
          <CircularProgress />
        </div>}
      {parentCategories.map((category) => {
        return (
          <div
            className="
             flex 
             flex-col
             w-full
             p-[10px]"
            key={category._id}
          >
            <div
              onClick={() => { setActiveCategoryId(category._id) }}
              className={`
              flex 
              items-center
              justify-between
              w-full 
              gap-[10px] 
              ${activeCategoryId === category._id ? "bg-[#F6F7FA]" : "bg-white"} 
              p-[10px] rounded-[5px]`}>
              <p className="
              text-[1em]
              text-center
              truncate 
              text-black">
                {category.name}
              </p>
              {activeCategoryId === category._id
                ?
                <CloseIcon onClick={(e) => { closeCategory(e) }} className="text-black" />
                :
                <ArrowDropDownIcon className="text-black" />}
            </div>
            {activeCategoryId === category._id &&
              categories.filter(subCat => subCat.parent === category._id).map(subcat => {
                return <div
                  onClick={() => { filterProductsByCategory(subcat._id) }}
                  className="flex flex-col w-full"
                  key={subcat._id}>
                  <div className="
                    flex 
                    items-center
                    justify-start 
                    w-full 
                    gap-[10px] 
                    p-[10px]">
                    <p className="
                    text-[1em] 
                    text-black 
                    text-center 
                    truncate 
                    hover:font-bold">{subcat.name}</p>
                  </div>
                </div>
              })
            }
          </div>
        );
      })}
</div>
    </motion.div>
  );
}
