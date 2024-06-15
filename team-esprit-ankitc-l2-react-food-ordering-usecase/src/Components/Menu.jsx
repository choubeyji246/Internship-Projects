import React, { useEffect, useState } from "react";

import getResponse from "../utils/GetResponse";
import MenuItems from "./MenuItems";

const Menu = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await getResponse(
          "get",
          "http://localhost:3000/meals",
          {}
        );
        setMeals(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFoodItems();
  }, []);

  //console.log(meals);

  //fetchFoodItems();
  return (
    <>
    
    {meals.length ?
    <ul id="meals">
      {meals.map((meal) => (
        <MenuItems item={meal} />
      ))}
    </ul>:
    <div>
      <h1>No meals found</h1>
    </div>
    }
    </>

  );
};

export default Menu;
