// pages/add-category.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../ui-components/Input';
import FormContainer from '../ui-components/FormContainer';
import Button from '../ui-components/Button';
import Select from '../ui-components/Select';
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from '@/redux/slice';
import { toast } from 'react-hot-toast';
const AddCategory = () => {
  const [name, setName] = useState('');
  const [parent, setParent] = useState(null);
  const [slug,setSlug]=useState('')
  const [file,setFile]=useState(null)
  const { categories} = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
   formData.append('parent',parent || null);
   formData.append('slug',slug)
    if (file) {
      formData.append('file', file);
    }
    try {
      await axios.post('http://localhost:3001/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success("Categroy added successfuly")
      setName('');
      setParent(null);
    } catch (error) {
      console.error(error);
    toast.error("Category dont added")
    }
  };

  return (
    <FormContainer>
      <h1>Add category</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[10px] w-full">
        <Input
         type="text" 
         value={name} 
         onChange={(e) => setName(e.target.value)}
         placeholder="Category name"
        />
         <Input
         type="text" 
         value={slug} 
         onChange={(e) => setSlug(e.target.value)}
         placeholder="Slug"
        />
       
    <Select
    text="Parent category"
    items={categories}
    onClick={(categoryId)=>{setParent(categoryId)}}
    itemKey="_id"
    />
       
        <Input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="outline-none border-[1px] border-gray-500 w-[200px] p-[5px] rounded-[5px]"
        />
       <Button
       type="submit"
       text="Add category"
       />
      </form>
      </FormContainer>
  );
};

export default AddCategory;
