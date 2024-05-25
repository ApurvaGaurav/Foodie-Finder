import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import WhatsOnMind from "./WhatsOnMind";
import TopRestaurantChains from "./TopRestaurantChains";
import SearchBar_Button from "./SearchBar_Button";
import { MdNoFood } from "react-icons/md";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import Shimmer from "../Shimmer UI/Shimmer";

const Body = () => {
  const data = useSelector((store) => store.sidebar.resList);
  const json = data;
  // console.log(json);

  const [resList, setResList] = useState([]);

  const [foodItemsHeader, setFoodItemsHeader] = useState([]);
  const [foodItemImages, setFoodItemImages] = useState([]);
  const [topRestaurantHeader, setTopRestaurantHeader] = useState("");
  const [topRestaurantChains, setTopRestaurantChains] = useState([]);
  const [
    onlineFoodDeliveryRestaurantHeader,
    setOnlineFoodDeliveryRestaurantHeader,
  ] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  useEffect(() => {
    setData();
  });

  const setData = async () => {
    // console.log(json);
    if (json.length === 0) {
      return "..";
    }

    setResList(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFoodItemsHeader(json?.data?.cards[0]?.card?.card?.header);
    setFoodItemImages(
      json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info
    );
    setTopRestaurantHeader(json?.data?.cards[1]?.card?.card?.header);
    setTopRestaurantChains(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setOnlineFoodDeliveryRestaurantHeader(
      json?.data?.cards[2]?.card?.card?.title
    );
  };
  if (data.length === 0) {
    return <Shimmer />;
  }
  return (
    <>
      <div className="body mt-24 h-fit scroll-smooth w-4/5  mx-auto ">
        <WhatsOnMind
          foodItemsHeader={foodItemsHeader}
          foodItemImages={foodItemImages}
        />
        <TopRestaurantChains
          topRestaurantHeader={topRestaurantHeader}
          topRestaurantChains={topRestaurantChains}
        />

        <div className="res-container flex flex-col">
          <h1 className="font-bold text-2xl ml-3 font-Poppins">
            {onlineFoodDeliveryRestaurantHeader}
          </h1>
          <SearchBar_Button
            resList={resList}
            setFilteredRestaurant={setFilteredRestaurant}
            filteredRestaurant={filteredRestaurant}
          />
          <div className=" flex flex-wrap justify-around">
            {filteredRestaurant.map((restaurant, i) => (
              <RestaurantCard resData={restaurant} key={restaurant.info.id} />
            ))}

            {filteredRestaurant.length === 0 && (
              <div className="flex items-center gap-3 font-bold font-Poppins text-2xl text-red-600">
                <span>
                  <MdNoFood />
                </span>
                <span> Sorry the item is not available :(</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Body;