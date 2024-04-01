import { useContext, useState, useEffect } from "react";
import redHeartIcon from "../../assets/heart-red.svg";
import heartIcon from "../../assets/heart.svg";
import { FavoriteContext, WeatherContext } from "../../context";

export default function AddToFavorite() {
  const { favorites, addToFavorites, removeFromFavorites } =
    useContext(FavoriteContext);
  const { weatherData } = useContext(WeatherContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const { latitude, longitude, location } = weatherData;

  useEffect(() => {
    const favoriteFound = favorites.find(
      (fav) => fav.location === location
    );
    setIsFavorite(favoriteFound)
    
  }, [])

  function handleFavorites() {
    const favoriteFound = favorites.find(
      (fav) => fav.location === location
    );
    if (!favoriteFound) {
      addToFavorites(latitude, longitude, location);
    } else {
      removeFromFavorites(location);
    }
    setIsFavorite(!isFavorite);
  }
  return (
    <div className="md:col-span-2">
      <div className="flex items-center justify-end space-x-6">
        <button
          className="text-sm md:text-base inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#C5C5C54D]"
          onClick={handleFavorites}
        >
          <span>Add to Favorite</span>
          <img src={isFavorite ? redHeartIcon : heartIcon} alt="" />
        </button>
      </div>
    </div>
  );
}
