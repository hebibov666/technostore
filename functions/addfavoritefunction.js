import { toast } from "react-hot-toast";

export const addFavorite = (e, id,setFavoriteProducts) => {
    e.preventDefault();
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
    if (!favorites.includes(id)) {
      favorites.push(id);
      toast.success("Product added favorites")
    } else {
      favorites = favorites.filter((fav) => fav !== id);
      toast.success("Product remove favorites")
    }
  
    localStorage.setItem("favorites", JSON.stringify(favorites));
   setFavoriteProducts(favorites)
  };