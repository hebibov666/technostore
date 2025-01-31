import { toast } from "react-hot-toast"
import axios from "axios"


export const addToCart = async (e, productId, session,setAdding) => {
  e.preventDefault()
  if (session) {
    const payload = {
      userId: session.user.id,
      productId: productId,
      quantity: 1
    }
    setAdding(true)
    try {
      await axios.post("https://technostore-1.onrender.com/addtocart", payload)
      setAdding(false)
      toast.success('The product added to the cart');
    }
    catch (error) {
     setAdding(false)
      toast.error('Product not added to he cart!');
    }
  } else {
    toast.error("Sign in to add a product")
  }
}


export const removeProduct = async (id, userId, setCartsProducts) => {
  try {
    const res = await axios.delete("https://technostore-1.onrender.com/removefromcart",
      {
        data: {
          userId: userId,
          productId: id,
        },
      })
    setCartsProducts(res.data.cart.products)
    toast.success("Product remove from basket")
  }
  catch (error) {
    toast.error("Something went wrong")
  }
}


export const totalPrice = (cartsProducts, setTotal) => {
  if (cartsProducts?.length > 0) {
    const total = cartsProducts.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
    setTotal(total)
  } else {
    setTotal(0)
  }
};

export const getCartProducts = async (userId, setCartsProducts, setLoading) => {
  setLoading(true); 

  if (!userId) {
    setCartsProducts([]); 
    setLoading(false); 
    return;
  }

  try {
    const res = await axios.get(`https://technostore-1.onrender.com/cart/${userId}`);
    const products = res.data?.cart?.products || []; 
    setCartsProducts(products);
  } catch (error) {
    console.error("Something went wrong", error);
  } finally {
    setLoading(false);
  }
};
