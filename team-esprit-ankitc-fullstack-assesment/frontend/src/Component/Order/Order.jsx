import React, { useEffect, useState } from "react";

import "./Order.css";
import Navbar from "../Navbar/Navbar";
import getResponse from "../../utils/GetResponse";
import Button from "../AtomComponents/Button";
import Footer from "../Footer/Footer";

const Order = () => {
  const [orderData, setOrderData] = useState([]);
  const [singleOrderData, setSingleOrderData] = useState({});
  const [active, setActive] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filters, setFilters] = useState({  });

  const fetchOrders = async () => {
    try {
      let dynamicQuery = ``;
      if (sortBy) dynamicQuery += `&sortBy=${sortBy}`;
      if (sortOrder) dynamicQuery += `&sortOrder=${sortOrder}`;
      if (filters.status) dynamicQuery += `&filters[status]=${filters.status}`;
      const response = await getResponse(
        "get",
        `http://localhost:3000/auth/orders?page=${currentPage}${dynamicQuery}`
      );
      setOrderData(response.data.data.data);
    } catch (error) {
      alert("No data");
    }
  };

  useEffect(() => {
    fetchOrders();
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
    setFilters({ ...filters, status: e.target.value });
  };

  const fetchOrderDetails = async (id) => {
    try {
      const response = await getResponse(
        "get",
        `http://localhost:3000/auth/orders/orderId/?order_id=${id}`
      );
      setSingleOrderData(response.data.data.data[0]);
      setActive(true);
    } catch (error) {
      alert("Error fetching order details");
    }
  };

  const handleClose = () => {
    setActive(false);
  };

  return (
    <div>
      <Navbar />
      <div className="filters">
        <label>
          Sort By:
          <select value={sortBy} onChange={handleSortByChange}>
          <option value="">None</option>
            <option value="total_amount">Total amount</option>
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
          <select value={filters.status} onChange={handleFilterChange}>
          <option value="">None</option>
            <option value="completed">completed</option>
            <option value="pending">pending</option>
          </select>
        </label>
      </div>
      <div className="order-history">
        <h2>Order History</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Items</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderData.length > 0 ? (
              orderData.map((order, index) => (
                <tr
                  key={order.order_id}
                  onClick={() => fetchOrderDetails(order.order_id)}
                >
                  <td>{order.order_id}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>{order.items}</td>
                  <td>{order.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No data</td>
              </tr>
            )}
          </tbody>
        </table>

        {active && (
          <div className="modal">
            <div className="modal-content">
              <div className="container">
                <h4>
                  <b>orderId: {singleOrderData.order_id}</b>
                </h4>
                <p>Date: {singleOrderData.date}</p>
                <p>
                  items:
                  {singleOrderData.items.map((item, index) => (
                    <div key={index}>
                      <p>Product Name: {item.product_name}</p>
                      <p>Price: {item.price}</p>
                    </div>
                  ))}
                </p>
                <p>Quantities: {singleOrderData.quantities}</p>
                <p>Total: {singleOrderData.total_amount}</p>
                <p>status: {singleOrderData.status}</p>
                <p>shipping address: {singleOrderData.shippingAddress}</p>
              </div>
              <Button text="close" handleEvent={handleClose} />
            </div>
          </div>
        )}
        <div>
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous Page
          </button>
          <button onClick={nextPage}>Next Page</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Order;
