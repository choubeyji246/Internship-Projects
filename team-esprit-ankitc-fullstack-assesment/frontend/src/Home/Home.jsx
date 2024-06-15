import React, { useEffect, useState } from "react";

import Navbar from "../Component/Navbar/Navbar";
import "./Home.css";
import getResponse from "../utils/GetResponse";
import Card from "../Component/Card/Card";
import image from "../Assets/image.jpg";
import Footer from "../Component/Footer/Footer";

const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        let dynamicQuery = ``;
        if (sortBy) dynamicQuery += `&sortBy=${sortBy}`;
        if (sortOrder) dynamicQuery += `&sortOrder=${sortOrder}`;
        if (filters.type) dynamicQuery += `&filters[type]=${filters.type}`;

        const response = await getResponse("get", `http://localhost:3000/products/?page=${currentPage}${dynamicQuery}`);
        setData(response.data.data.data);
      } catch (error) {
        alert("Data not found");
      }
    };
    fetchData();
  }, [currentPage, sortBy, sortOrder, filters]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, type: e.target.value });
  };

  return (
    <div>
      <Navbar />
      <div className="image">
        <img src={image} alt="img" />
      </div>

      <div className="filters-home">
        <label>
          Sort By:
          <select value={sortBy} onChange={handleSortByChange}>
            <option value="">None</option>
            <option value="price">Price</option>
            <option value="product_name">Name</option>
            <option value="rating">Rating</option>
          </select>
        </label>
        <label>
          Sort Order:
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="">None</option>
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>
        </label>
        <label>
          Filter Type:
          <select value={filters.type || ""} onChange={handleFilterChange}>
            <option value="">Select Type</option>
            <option value="Phone">Phone</option>
            <option value="Tablet">Tablet</option>
          </select>
        </label>
      </div>

      <div className="card-conatainer">
        {data.map((ele) => (
          <Card
            key={ele.product_id}
            product_name={ele.product_name}
            product_id={ele.product_id}
            product_model={ele.product_model}
            rating={ele.rating}
          />
        ))}
      </div>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button onClick={nextPage}>Next Page</button>
      </div>

      <Footer />
    </div>
  );
};
export default Home;
