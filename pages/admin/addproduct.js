import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../redux/slice";
import axios from 'axios';
import Input from '../ui-components/Input';
import FormContainer from '../ui-components/FormContainer';
import Button from '../ui-components/Button';
import Select from '../ui-components/Select';
import { toast } from 'react-hot-toast';
export default function AddProduct(){
    const [name, setName] = useState('');
   const [description,setDescription]=useState("")
   const [price,setPrice]=useState()
   const [discountPrice,setDiscountPrice]=useState()
   const [category,setCategory]=useState()
    const [file,setFile]=useState(null)
    const { categories } = useSelector((state) => state.categories);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getCategories());
    }, [dispatch]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price',price);
        formData.append('discountPrice',discountPrice);
        formData.append('description',description);
        formData.append('category',category);
      
        if (file) {
          formData.append('file', file);
        }
        try {
          await axios.post('http://localhost:3001/addproduct', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
         toast.success("Product added")
          setName('');
        } catch (error) {
          console.error(error);
         toast.error("Product dont added")
        }
      };
    return(
    <FormContainer>
  <h1>Add product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[10px] w-full">
        <Input
         type="text" 
         value={name} 
         onChange={(e) => setName(e.target.value)}
         placeholder="Product name"
        />
         <Input
         type="number" 
         value={price} 
         onChange={(e) => setPrice(e.target.value)}
         placeholder="Price"
        />
         <Input
         type="number" 
         value={discountPrice} 
         onChange={(e) => setDiscountPrice(e.target.value)}
         placeholder="Discount"
        />
       <Input
         type="text" 
         value={description} 
         onChange={(e) => setDescription(e.target.value)}
         placeholder="Description"
        />
    <Select
    text="Category"
    items={categories.filter(category=>category.parent!=null)}
    onClick={(categoryId)=>{setCategory(categoryId)}}
    itemKey="_id"
    />
       
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="outline-none border-[1px] border-gray-500 w-[200px] p-[5px] rounded-[5px]"
        />
       <Button
       type="submit"
       text="Add product"
       />
      </form>

    </FormContainer>
    )
}
